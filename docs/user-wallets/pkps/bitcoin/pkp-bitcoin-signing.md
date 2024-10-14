import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Signing Bitcoin P2SH Transactions using a PKP

Signing Bitcoin transactions using a PKP works slightly differently than when using Lit to sign transactions on EVM chains.

The Lit nodes support PKP signing using the [ECDSA](link TBD) algorithm with it's private key share, which means PKPs can be used to sign transactions on the Bitcoin blockchain.

Due to the unique nature of PKPs and that we are unable to compile the private key in it's entirety, we must prepare the Bitcoin transaction to only require the PKP signature before signing it. Additionally, after obtaining the PKP signature, we will need to convert the standard ECDSA formatting to Bitcoin's [DER] format before finalizing and broadcasting the transaction.


## Prerequisites

Before continuing with this guide, make sure you have the following:

- An understanding of [Lit Actions](../../../sdk/serverless-signing/overview.md) and how they work
- A basic understanding of Bitcoin transactions, specifically [PSBTs](https://en.bitcoin.it/wiki/BIP_0174) and [scripts](https://en.bitcoin.it/wiki/Script)

## High Level Overview

Through specific preparation of the Bitcoin transaction, we can use a PKP to sign a Bitcoin transaction. 

diagram here

### Formatting the Signature

<details>
<summary>Click here to see how to format the signature</summary>
<p>

```tsx
function convertSignature(litSignature: any) {
    let r = Buffer.from(litSignature.r, "hex");
    let s = Buffer.from(litSignature.s, "hex");
    let rBN = new BN(r);
    let sBN = new BN(s);

    const secp256k1 = new EC("secp256k1");
    const n = secp256k1.curve.n;

    if (sBN.cmp(n.divn(2)) === 1) {
    sBN = n.sub(sBN);
    }

    r = rBN.toArrayLike(Buffer, "be", 32);
    s = sBN.toArrayLike(Buffer, "be", 32);

    function ensurePositive(buffer: any) {
    if (buffer[0] & 0x80) {
        const newBuffer = Buffer.alloc(buffer.length + 1);
        newBuffer[0] = 0x00;
        buffer.copy(newBuffer, 1);
        return newBuffer;
    }
    return buffer;
    }

    r = ensurePositive(r);
    s = ensurePositive(s);

    let derSignature;
    try {
    derSignature = bip66.encode(r, s);
    } catch (error) {
    console.error("Error during DER encoding:", error);
    throw error;
    }

    const signatureWithHashType = Buffer.concat([
    derSignature,
    Buffer.from([bitcoin.Transaction.SIGHASH_ALL]),
    ]);

    return signatureWithHashType;
}
```
</p>
</details>

### Broadcasting the Transaction


<details>
<summary>Click here to see how to broadcast the transaction</summary>
<p>

```tsx
const broadcastTransaction = async (txHex: string) => {
    try {
    const response = await fetch(BROADCAST_URL, {
        method: "POST",
        headers: {
        "Content-Type": "text/plain",
        },
        body: txHex,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error broadcasting transaction: ${errorText}`);
    }

    const txid = await response.text();
    console.log(`Transaction broadcasted successfully. TXID: ${txid}`);
    return txid;
    } catch (error: any) {
    console.error(error.message);
    }
};
```
</p>
</details>

## Preparing the Bitcoin Transaction

<Tabs
defaultValue="SingleSignature"
values={[
{label: "Single Signature", value: "SingleSignature"},
{label: 'Multi Signature', value: 'MultiSignature'},
{label: '1-of-1 Multi Signature', value: '1of1MultiSignature'},
{label: 'Collaborative', value: 'collaborative'},
]}>
<TabItem value="SingleSignature">

```tsx
import * as bitcoin from "bitcoinjs-lib";
import elliptic from "elliptic";
import mempoolJS from "@mempool/mempool.js";

async function singleSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey: string, destinationAddress: string) {
    const EC = elliptic.ec;
    bitcoin.initEccLib(ecc);

    const network = bitcoin.networks.bitcoin;
    const pubKeyBuffer = Buffer.from(pkpPublicKey, "hex");

    const redeemScript = bitcoin.script.compile([
        pubKeyBuffer,
        bitcoin.opcodes.OP_CHECKSIG,
    ]);

    const p2shPayment = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
        network: network,
    });

    const { bitcoin: { addresses, transactions } } = mempoolJS({
        hostname: "mempool.space",
        network: "mainnet",
    });

    const addressUtxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment.address!,
    });

    if (addressUtxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment.address);
        return;
    }

    const utxo = addressUtxos[0];

    const psbt = new bitcoin.Psbt({ network });

    const utxoRawTx = await transactions.getTxHex({ txid: utxo.txid });

    psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(utxoRawTx, "hex"),
        redeemScript: redeemScript,
    });

    const fee = 1000;
    const amountToSend = utxo.value - fee;

    psbt.addOutput({
        address: destinationAddress,
        value: BigInt(amountToSend),
    });

    //@ts-ignore
    const tx = psbt.__CACHE.__TX.clone();
    const sighash = tx.hashForSignature(
        0,
        redeemScript,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const litActionResponse = await litNodeClient.executeJs({
        code: litActionCode,
        sessionSigs,
        jsParams: {
        publicKey: pkpPublicKey,
        toSign: Buffer.from(sighash, "hex"),
        },
    });

    const signatureWithHashType = convertSignature(
        litActionResponse.signatures.btcSignature
    );

    psbt.updateInput(0, {
        finalScriptSig: bitcoin.script.compile([
        signatureWithHashType,
        redeemScript,
        ]),
    });

    const txHex = psbt.extractTransaction().toHex();
    return await broadcastTransaction(txHex);
}
```

</TabItem>

<TabItem value="MultiSignature">

```tsx
import * as bitcoin from "bitcoinjs-lib";
import elliptic from "elliptic";
import mempoolJS from "@mempool/mempool.js";

async function multiSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey1: string, pkpPublicKey2: string, destinationAddress: string) {
    const EC = elliptic.ec;
    bitcoin.initEccLib(ecc);

    const network = bitcoin.networks.bitcoin;
    const pubKeyBuffer_1 = Buffer.from(pkpPublicKey1, "hex");
    const pubKeyBuffer_2 = Buffer.from(pkpPublicKey2, "hex");

    const redeemScript = bitcoin.script.compile([
        bitcoin.opcodes.OP_2,
        pubKeyBuffer_1,
        pubKeyBuffer_2,
        bitcoin.opcodes.OP_2,
        bitcoin.opcodes.OP_CHECKMULTISIG,
    ]);

    const p2shPayment = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
        network: network,
    });

    const { bitcoin: { addresses, transactions } } = mempoolJS({
        hostname: "mempool.space",
        network: "mainnet",
    });

    const addressUtxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment.address!,
    });

    if (addressUtxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment.address);
        return;
    }

    const utxo = addressUtxos[0];

    const psbt = new bitcoin.Psbt({ network });

    const utxoRawTx = await transactions.getTxHex({ txid: utxo.txid });

    psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(utxoRawTx, "hex"),
        redeemScript: redeemScript,
    });

    const fee = 1000;
    const amountToSend = utxo.value - fee;

    psbt.addOutput({
        address: destinationAddress,
        value: BigInt(amountToSend),
    });

    //@ts-ignore
    const tx = psbt.__CACHE.__TX.clone();
    const sighash = tx.hashForSignature(
        0,
        redeemScript,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const litActionResponse1 = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs,
    jsParams: {
        publicKey: pkpPublicKey1,
        toSign: Buffer.from(sighash, "hex"),
    },
    });

    const litActionResponse2 = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs,
    jsParams: {
        publicKey: pkpPublicKey2,
        toSign: Buffer.from(sighash, "hex"),
    },
    });

    const signatureWithHashType1 = convertSignature(
        litActionResponse1.signatures.btcSignature
    );

    const signatureWithHashType2 = convertSignature(
        litActionResponse2.signatures.btcSignature
    );

    psbt.updateInput(0, {
        finalScriptSig: bitcoin.script.compile([
        bitcoin.opcodes.OP_0,
        signatureWithHashType1,
        signatureWithHashType2,
        redeemScript,
        ]),
    });

    const txHex = psbt.extractTransaction().toHex();
    return await broadcastTransaction(txHex);
}
```

</TabItem>

<TabItem value="1of1MultiSignature">

```tsx
import * as bitcoin from "bitcoinjs-lib";
import elliptic from "elliptic";
import mempoolJS from "@mempool/mempool.js";

async function 1of1MultiSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey1: string, pkpPublicKey2: string, destinationAddress: string) {
    const EC = elliptic.ec;
    bitcoin.initEccLib(ecc);

    const network = bitcoin.networks.bitcoin;
    const pubKeyBuffer_1 = Buffer.from(pkpPublicKey1, "hex");
    const pubKeyBuffer_2 = Buffer.from(pkpPublicKey2, "hex");

    const redeemScript = bitcoin.script.compile([
        bitcoin.opcodes.OP_1,
        pubKeyBuffer_1,
        pubKeyBuffer_2,
        bitcoin.opcodes.OP_2,
        bitcoin.opcodes.OP_CHECKMULTISIG,
    ]);

    const p2shPayment = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
        network: network,
    });

    const { bitcoin: { addresses, transactions } } = mempoolJS({
        hostname: "mempool.space",
        network: "mainnet",
    });

    const addressUtxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment.address!,
    });

    if (addressUtxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment.address);
        return;
    }

    const utxo = addressUtxos[0];

    const psbt = new bitcoin.Psbt({ network });

    const utxoRawTx = await transactions.getTxHex({ txid: utxo.txid });

    psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(utxoRawTx, "hex"),
        redeemScript: redeemScript,
    });

    const fee = 1000;
    const amountToSend = utxo.value - fee;

    psbt.addOutput({
        address: destinationAddress,
        value: BigInt(amountToSend),
    });

    //@ts-ignore
    const tx = psbt.__CACHE.__TX.clone();
    const sighash = tx.hashForSignature(
        0,
        redeemScript,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const litActionResponse = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs,
    jsParams: {
        publicKey: pkpPublicKey1,
        toSign: Buffer.from(sighash, "hex"),
    },
    });

    const signatureWithHashType = convertSignature(
        litActionResponse1.signatures.btcSignature
    );

    psbt.updateInput(0, {
        finalScriptSig: bitcoin.script.compile([
        bitcoin.opcodes.OP_0,
        signatureWithHashType,
        redeemScript,
        ]),
    });

    const txHex = psbt.extractTransaction().toHex();
    return await broadcastTransaction(txHex);
}
```
</TabItem>

<TabItem value='collaborative'>

```tsx
import * as bitcoin from "bitcoinjs-lib";
import elliptic from "elliptic";
import mempoolJS from "@mempool/mempool.js";

async function collaborativeMultiSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey1: string, pkpPublicKey2: string, destinationAddress: string) {
    const EC = elliptic.ec;
    bitcoin.initEccLib(ecc);

    const network = bitcoin.networks.bitcoin;
    const pubKeyBuffer_1 = Buffer.from(pkpPublicKey1, "hex");
    const pubKeyBuffer_2 = Buffer.from(pkpPublicKey2, "hex");

    const redeemScript1 = bitcoin.script.compile([
        pubKeyBuffer_1,
        bitcoin.opcodes.OP_CHECKSIG,
    ]);

    const redeemScript2 = bitcoin.script.compile([
        pubKeyBuffer_2,
        bitcoin.opcodes.OP_CHECKSIG,
    ]);

    const p2shPayment1 = bitcoin.payments.p2sh({
        redeem: { output: redeemScript1 },
        network: network,
    });

    const p2shPayment2 = bitcoin.payments.p2sh({
        redeem: { output: redeemScript2 },
        network: network,
    });

    const {
        bitcoin: { addresses, transactions },
    } = mempoolJS({
        hostname: "mempool.space",
        network: "mainnet",
    });

    const address1Utxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment1.address!,
    });

    if (address1Utxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment1.address);
        return;
    }

    const utxo1 = address1Utxos[0];

    const address2Utxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment2.address!,
    });

    if (address2Utxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment2.address);
        return;
    }

    const utxo2 = address2Utxos[0];

    const fee = 1000; // Adjust the fee as needed

    const utxoValue1 = utxo1.value;
    const utxoValue2 = utxo2.value;
    const totalInputValue = utxoValue1 + utxoValue2;
    const amountToSend = totalInputValue - fee;

    const psbt = new bitcoin.Psbt({ network });

    const utxo1RawTx = await transactions.getTxHex({ txid: utxo1.txid });
    const utxo2RawTx = await transactions.getTxHex({ txid: utxo2.txid });

    psbt.addInput({
        hash: utxo1.txid,
        index: utxo1.vout,
        nonWitnessUtxo: Buffer.from(utxo1RawTx, "hex"),
        redeemScript: redeemScript1,
    });

    psbt.addInput({
        hash: utxo2.txid,
        index: utxo2.vout,
        nonWitnessUtxo: Buffer.from(utxo2RawTx, "hex"),
        redeemScript: redeemScript2,
    });

    psbt.addOutput({
        address: destinationAddress,
        value: BigInt(amountToSend),
    });

    //@ts-ignore
    const tx = psbt.__CACHE.__TX.clone();
    const sighash1 = tx.hashForSignature(
        0,
        redeemScript1,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const sighash2 = tx.hashForSignature(
        1,
        redeemScript2,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const litActionResponse1 = await litNodeClient.executeJs({
        code: litActionCode,
        sessionSigs,
        jsParams: {
        publicKey: pkpPublicKey1,
        toSign: Buffer.from(sighash1, "hex"),
        },
    });

    const litActionResponse2 = await litNodeClient.executeJs({
        code: litActionCode,
        sessionSigs,
        jsParams: {
        publicKey: pkpPublicKey2,
        toSign: Buffer.from(sighash2, "hex"),
        },
    });

    const signatureWithHashType1 = convertSignature(
        litActionResponse1.signatures.btcSignature
    );

    const signatureWithHashType2 = convertSignature(
        litActionResponse2.signatures.btcSignature
    );

    psbt.updateInput(0, {
        finalScriptSig: bitcoin.script.compile([
        signatureWithHashType1,
        redeemScript1,
        ]),
    });

    psbt.updateInput(1, {
        finalScriptSig: bitcoin.script.compile([
        signatureWithHashType2,
        redeemScript2,
        ]),
    });

    const txHex = psbt.extractTransaction().toHex();
    return await broadcastTransaction(txHex);
}

```

</TabItem>

</Tabs>

