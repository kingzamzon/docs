---
sidebar_position: 3
---

# Session Keys and Signatures

With Lit Protocol, the user needs to prove ownership of their wallet, and this is typically done via a wallet signature. However, to protect against replay attacks, and to let users scope their wallet signatures to specific resources, we've implemented a system of session keys.

It works by generating a new random ed25519 keypair in the browser, and storing it in local storage. Then, the user signs a SIWE message with their wallet which contains the session public key. This signature is stored in local storage as well. The session keypair is used to sign all requests to the Lit Protocol API, and the user's wallet signature is sent along with the request, attached as a "capability" to the session signature. Each node in the Lit Network receives a unique signature for each request, and can verify that the user owns the wallet address that signed the capability.

## Obtaining session signatures for a request

A prerequestive is that you must have a connected LitNodeClient and pass that into the getSessionSigs function.

### For a signing request

```
let resourceId = {
  baseUrl: "my-dynamic-content-server.com",
  path: "/this-is-a-path",
  orgId: "",
  role: "",
  extraData: "",
};

let hashedResourceId = await LitJsSdk.hashResourceIdForSigning(
  resourceId
);

var sessionSigs = await LitJsSdk.getSessionSigs({
  chain: "ethereum",
  litNodeClient,
  resources: [`litSigningCondition://${hashedResourceId}`],
});

var unifiedAccessControlConditions = [
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "10000000000000",
    },
  },
];

// Saving signing condition
await litNodeClient.saveSigningCondition({
  unifiedAccessControlConditions,
  sessionSigs,
  resourceId,
  chain: "litSessionSign",
});

// Retrieving a signature
let jwt = await litNodeClient.getSignedToken({
  unifiedAccessControlConditions,
  sessionSigs,
  resourceId,
});
```

### For an encryption request

```
var sessionSigs = await LitJsSdk.getSessionSigs({
  chain: "ethereum",
  litNodeClient,
  resources: [`litEncryptionCondition://*`],
});

var unifiedAccessControlConditions = [
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "10000000000000",
    },
  },
];

// encrypt
const { encryptedZip, symmetricKey } =
  await LitJsSdk.zipAndEncryptString("this is a secret message");

// store the decryption conditions
const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
  unifiedAccessControlConditions,
  symmetricKey,
  sessionSigs,
});
```

## Clearing the stored session key and signature

If you want to clear the session key stored in the browser local storage, you can use the `disconnectWeb3()` function:

```js
LitJsSdk.disconnectWeb3();
```
