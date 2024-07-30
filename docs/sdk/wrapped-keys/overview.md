import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

Wrapped Keys are private keys that are encrypted and stored using Lit's Wrapped Keys backend service. They can be initialized by [importing](./importing-key.md) or [storing](./storing-wrapped-key-metadata.md) an existing private key, or can be [generated](./generating-wrapped-key.md) within a Lit node's trusted execution environment (TEE), meaning the clear text private key never exists outside of the TEE.

Regardless of how the Wrapped Key is initialized, each Wrapped Key is associated with an existing [Programmable Keypair (PKP)](../../sdk/wallets/minting.md) and given a unique ID by Lit.

Using the unique ID and [Session Signatures](../authentication/session-sigs/intro.md) from the PKP the Wrapped Key is associated with, you can leverage the Lit network to generate signatures for arbitrary data and transactions (optionally sending the signed transaction to a network) using your encrypted private key.

## Getting Started

### Installing the SDK

:::info
The minimum version of the Lit SDK that supports Wrapped Keys is `6.3.0`, which will be installed from NPM by default.
:::

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'yarn', value: 'yarn'},
]}>
<TabItem value="npm">

```bash
npm i @lit-protocol/wrapped-keys
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @lit-protocol/wrapped-keys
```

</TabItem>
</Tabs>

## How it Works

The current functionality offered by the Wrapped Keys SDK includes:

- [Generating a Wrapped Key](./generating-wrapped-key.md)
- [Importing a private key as a Wrapped Key](./importing-key.md)
- [Exporting a Wrapped Key](./exporting-wrapped-key.md)
- [Getting Wrapped Key Metadata](./getting-wrapped-key-metadata.md)
- [Storing Wrapped Key Metadata](./storing-wrapped-key-metadata.md)
- [Listing all Wrapped Keys associated with a PKP](./listing-wrapped-keys.md)
- [Signing an arbitrary message/data with a Wrapped Key](./sign-message.md)
  - Useful for non transactional data such as:
    - Creating a digital signature of data to verify it hasn't been tampered with
    - Proving ownership (authenticating) of a specific blockchain address
    - Creating and verifying credentials or attestations in decentralized identity systems
- [Signing a blockchain transaction with a Wrapped Key](./sign-transaction.md)
  - Currently Ethereum and Solana transactions are supported out-of-the-box using the Wrapped Keys SDK, however, you can implement your own custom Wrapped Keys Lit Action to support other transaction types and/or signature schemes. For more information on how to do this, please refer to [this guide](./custom-wrapped-keys.md).

Below are high-level overviews of how each SDK method works.

:::info
The Wrapped Keys SDK methods for:

- Exporting a Wrapped Key
- Getting Wrapped Key Metadata
- Signing an arbitrary message with a Wrapped Key
- Signing an Ethereum or Solana transaction with a Wrapped Key

expect a Wrapped Key ID as part of their parameters. This ID is generated for each Wrapped Key by the backend service, and is returned by the SDK methods for:

- Generating a Wrapped Key
- Importing a private key as a Wrapped Key
- Storing Wrapped Key Metadata

You can also obtain the IDs for all the Wrapped Keys associated with a specific PKP by using the SDK's [listEncryptedKeyMetadata](./listing-wrapped-keys.md) method.
:::

### Generating a Wrapped Key

1. The Wrapped Keys SDK will derive the PKP's Ethereum address from the provided PKP Session Signatures
2. The SDK then generates the encryption Access Control Conditions using the derived Ethereum address
   - See the [Encrypting the Private Key](#encrypting-the-private-key) section for more info on this process
3. Using the PKP Session Signatures, the SDK will make a request to the Lit network to execute the Generate Private Key Lit Action
   - Depending on the provided `network`, one of the following Lit Actions will be executed:
     - If `network` is `ethereum`, then the [generateEncryptedEthereumPrivateKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/ethereum/src/generateEncryptedEthereumPrivateKey.js) Lit Action is executed
     - If `network` is `solana`, then the [generateEncryptedSolanaPrivateKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/solana/src/generateEncryptedSolanaPrivateKey.js) Lit Action is executed
4. The Lit Action uses a third-party library (either [ethers.js](https://docs.ethers.org/v5/) or [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)) to generate a private key withing a single Lit node's TEE
5. The generated private key is then encrypted using the previously generated Access Control Conditions
6. The encryption metadata is returned from the Lit Action
7. The Wrapped Keys SDK then stores the private key encryption metadata to the Wrapped Keys backend service, associating it with the PKP's Ethereum address
8. The SDK returns a [GeneratePrivateKeyResult](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/wrapped_keys_src.GeneratePrivateKeyResult.html) object containing the generated Wrapped Key ID, the PKP Ethereum address the Wrapped Key is associated with, and the public key of the generated private key

### Importing a Wrapped Key

1. The Wrapped Keys SDK will derive the PKP's Ethereum address from the provided PKP Session Signatures
2. The SDK then generates the encryption Access Control Conditions using the derived Ethereum address
   - See the [Encrypting the Private Key](#encrypting-the-private-key) section for more info on this process
3. Using the generated Access Control Conditions, the SDK will encrypt the provided private key using the [encryptString](https://v6-api-doc-lit-js-sdk.vercel.app/functions/encryption_src.encryptString.html) Lit SDK method
   - This encrypts your provided plaintext private key using the Lit network's public BLS key
4. The SDK then stores the private key encryption metadata to the Wrapped Keys backend service, associating it with the PKP's Ethereum address
5. The SDK returns a [ImportPrivateKeyResult](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/wrapped_keys_src.ImportPrivateKeyResult.html) object containing the generated Wrapped Key ID, and the PKP Ethereum address the Wrapped Key is associated with

### Exporting a Wrapped Key
  
1. The Wrapped Keys SDK will use the provided Wrapped Key ID and PKP Session Signatures to fetch the encryption metadata for a specific Wrapped Key
2. Using the PKP Session Signatures, the SDK will make a request to the Lit network to execute the [exportPrivateKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/common/src/exportPrivateKey.js) Lit Action
3. The Lit Action will check the Access Control Conditions used to encrypt the plaintext private key to verify whether the PKP is authorized to decrypt the private key
4. If authorized, the unencrypted plaintext private key will be returned. If not authorized, an error will be returned

### Getting Wrapped Key Metadata

1. The Wrapped Keys SDK will use the provided Wrapped Key ID and PKP Session Signatures to fetch the stored metadata for a specific Wrapped Key from the Wrapped Keys backend service
2. The stored metadata is returned as a [StoredKeyData](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/wrapped_keys_src.StoredKeyData.html) object

### Storing Wrapped Key Metadata

:::note
The [StoreEncryptedKeyParams](https://v6-api-doc-lit-js-sdk.vercel.app/types/wrapped_keys_src.StoreEncryptedKeyParams.html) required for this method include the encryption metadata of the private key that will be turned into a Wrapped Key. For more information on how to obtain the encryption metadata, please refer to this guide on [encrypting data using the Lit SDK](../../sdk/wrapped-keys/custom-wrapped-keys#generating-and-encrypting-a-private-key), and this guide on [Custom Wrapped Keys](http://localhost:3000/sdk/wrapped-keys/custom-wrapped-keys#generating-and-encrypting-a-private-key).
:::

1. The Wrapped Keys SDK will derive the PKP's Ethereum address from the provided PKP Session Signatures
2. The SDK stores the provided [StoreEncryptedKeyParams](https://v6-api-doc-lit-js-sdk.vercel.app/types/wrapped_keys_src.StoreEncryptedKeyParams.html) using the Wrapped Keys backend service, associating the resulting Wrapped Key with the PKP's Ethereum address
3. The SDK returns a [StoreEncryptedKeyResult](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/wrapped_keys_src.StoreEncryptedKeyResult.html) object containing the generated Wrapped Key ID, and the PKP Ethereum address the Wrapped Key is associated with

### Listing Wrapped Keys for a PKP   
   
1.  The Wrapped Keys SDK will derive the PKP Ethereum address from the provided PKP Session Signatures
2.  The SDK will submit the Ethereum address to the Wrapped Keys backend service to fetch and return all the associated Wrapped Keys

### Signing an Arbitrary Message

1. The Wrapped Keys SDK will use the provided Wrapped Key ID and PKP Session Signatures to fetch the encryption metadata for a specific Wrapped Key
2. Using the PKP Session Signatures, the SDK will make a request to the Lit network to execute the Sign Message Lit Action
   - Depending on the provided `network`, one of the following Lit Actions will be executed:
     - If `network` is `ethereum`, then the [signMessageWithEthereumEncryptedKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/ethereum/src/signMessageWithEthereumEncryptedKey.js) Lit Action is executed
     - If `network` is `solana`, then the [signMessageWithSolanaEncryptedKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/solana/src/signMessageWithSolanaEncryptedKey.js) Lit Action is executed
3. The Lit Action will check the Access Control Conditions the plaintext private key was encrypted with to verify the PKP is authorized to decrypt the private key
4. If authorized, the Wrapped Key will be decrypted within a Lit node's TEE. If not authorized, an error will be returned
5. The Lit Action will use the decrypted Wrapped Key and the provided [SignMessageWithEncryptedKeyParams](https://v6-api-doc-lit-js-sdk.vercel.app/types/wrapped_keys_src.SignMessageWithEncryptedKeyParams.html) to sign the arbitrary message, returning the signed message

### Signing a Transaction

1. The Wrapped Keys SDK will use the provided Wrapped Key ID and PKP Session Signatures to fetch the encryption metadata for a specific Wrapped Key
2. Using the PKP Session Signatures, the SDK will make a request to the Lit network to execute the Sign Transaction Lit Action
   - Depending on the provided `network`, one of the following Lit Actions will be executed:
     - If `network` is `ethereum`, then the [signTransactionWithEthereumEncryptedKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/ethereum/src/signTransactionWithEthereumEncryptedKey.js) Lit Action is executed
     - If `network` is `solana`, then the [signTransactionWithSolanaEncryptedKey](https://github.com/LIT-Protocol/js-sdk/blob/master/packages/wrapped-keys/src/lib/litActions/solana/src/signTransactionWithSolanaEncryptedKey.js) Lit Action is executed
3. The Lit Action will verify the required transaction parameters were provided in order to sign the transaction
4. The Lit Action will check the Access Control Conditions the plaintext private key was encrypted with to verify the PKP is authorized to decrypt the private key
5. If authorized, the Wrapped Key will be decrypted within a Lit node's TEE. If not authorized, an error will be returned
6. The Lit Action will use the decrypted Wrapped Key and the provided [SignTransactionWithEncryptedKeyParams](https://v6-api-doc-lit-js-sdk.vercel.app/types/wrapped_keys_src.SignTransactionWithEncryptedKeyParams.html) to sign the transaction
7. If the `broadcast` parameter was set to `true`, the Lit Action will then broadcast the signed transaction to the specified `network`, returning the transaction hash. Otherwise, the signed transaction will be returned

## How En/Decrypting the Wrapped Key Works

### Encrypting the Private Key

Whether you're importing, storing, or generating a new private key, the clear text private key is encrypted using the [encryptString](https://v6-api-doc-lit-js-sdk.vercel.app/functions/encryption_src.encryptString.html) method.

When encrypting data using the Lit network, [Access Control Conditions](../../sdk/access-control/evm/basic-examples) are specified to restrict who is authorized to decrypt the data. For more information on how encryption and decryption works using the Lit network, please go [here](../../sdk/access-control/intro).

The Access Control Conditions used to encrypt the private key are:

```ts
[
    {
        contractAddress: '',
        standardContractType: '',
        chain: CHAIN_ETHEREUM,
        method: '',
        parameters: [':userAddress'],
        returnValueTest: {
        comparator: '=',
        value: pkpAddress,
        },
    },
];
```

where `pkpAddress` is the Ethereum address that's derived from the PKP that was authenticated by the Lit network when the request to import, store, or generate a new Wrapped Key was made. With this condition, the only entity authorized to decrypt a Wrapped Key's underlying private key, is the PKP.

### Decrypting the Private Key

When you submit a request to the Wrapped Keys backend service via one of the SDK methods, you must provide PKP Session Signatures. From these Session Signatures, an Ethereum address corresponding to the PKP can be derived. It's this address that the Lit Action submits as part of its request to the Lit network to decrypt the Wrapped Key.

If the derived Ethereum address from the PKP Session Signatures matches the address used to encrypt the Wrapped Key, then decryption is authorized and the Lit Action is able to collect and combine the decryption shares from the Lit nodes and obtain the plaintext private key.

The plaintext private key only exists within the TEE of a single Lit node that is executing the Lit Action. This is enforced using the [decryptToSingleNode](https://actions-docs.litprotocol.com/#decrypttosinglenode) Lit Action method. This single Lit node executing the Lit Action is then able to use the plaintext private to perform signing operations. After the Lit Action is finished executing, the TEE memory is wiped and the plaintext private key ceases to exist.
