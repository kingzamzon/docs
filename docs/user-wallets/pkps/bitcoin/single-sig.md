# Single Signature

This guide is the simplest example of PKP signing a P2SH transaction, demonstrating a PKP signing a Bitcoin transaction with a single signature.

## Prerequisites

This section defines the necessary code prerequisites for the example in this guide. Before using this example, please **ensure the P2SH Bitcoin address derived from your PKP public key(s) has at least one UTXO**. This example will take the first UTXO of your PKP and send it to the provided destination address. The example will not run if you do not, because the PKP will not have any UTXOs to spend.

### Lit-Specific
- [LitNodeClient](link tb)
- [Session Signatures](../../../sdk/authentication/session-sigs/intro.md)
- Ownership of a [PKP](../../overview.md)
    - The PKP must be owned by the Ethereum wallet used to generate the Session Signatures 

### Custom Functions for This Example
- [`convertSignature`](./overview.md#formatting-the-signature): Converts the signature from the standard ECDSA format to a Bitcoin DER format
- [`broadcastTransaction`](./overview.md#broadcasting-the-transaction): Broadcasts the transaction to the Bitcoin blockchain
- [`litActionCode`](./overview.md#signing-within-a-lit-action): The Lit Action code that will be executed to sign the transaction

## Signing with the PKP

After setting up the prerequisites, the `singleSig` function can be used to sign a Bitcoin transaction.

For an understanding of the steps involved in this example, visit the [Overview Diagram](./overview.md#high-level-overview)

```tsx
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import mempoolJS from "@mempool/mempool.js";
import { LitNodeClient } from "@lit-protocol/lit-node-client";

async function singleSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey: string, destinationAddress: string) {
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