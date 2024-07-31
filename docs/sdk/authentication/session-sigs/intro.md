---
sidebar_position: 1
---

import FeedbackComponent from "@site/src/pages/feedback.md";

# Session Signatures

:::note

`SessionSigs` are only available on Ethereum and are heavily in development, so things may change. Be sure to use the latest version of the Lit JS SDK.

:::

To communicate with a Lit network, you must first authenticate yourself using session signatures.

Session signatures are created with session keys, which are generated when you initiate a session through a request to a Lit network using the Lit SDK. These session keys are unique `ed25519` keypairs generated locally by the Lit SDK and are used to sign all requests to the Lit Network during the current session. Think of them as a temporary ID badge for signing all your requests to Lit during the session.

While session signatures facilitate ongoing communication, more secure access requires an `AuthSig` (Authentication Signature) to verify your identity and authorization to the Lit Nodes.
An `AuthSig` is an [ERC-5573](https://eips.ethereum.org/EIPS/eip-5573) Sign-In with Ethereum Capabilities message that specifies:
- The Lit resources you're requesting access to (e.g., PKPs, Lit Actions).
- The specific [Lit Abilities](https://v6-api-doc-lit-js-sdk.vercel.app/enums/types_src.LitAbility.html) you're requesting for the session keys (e.g., signing transactions with a particular PKP, executing a specified Lit Action).

The `AuthSig` allows Lit Nodes to verify your authorization for requested actions, such as decrypting data, signing transactions with a PKP, or transferring PKP ownership. This ensures that only authorized users can perform specific actions within the Lit Network.
When you make a request, each Lit Node checks your `AuthSig` to confirm that your request aligns with the capabilities you previously defined. 

This authentication system ensures that the Lit Network remains secure, verifying that you are genuinely making the request and that you have the necessary authorization.

## Paying for Usage of the Lit Network

The correct code implementation will depend on whether you're using the free-to-use `datil-dev` network, or one of the "paid" networks: `datil` or `datil-test`.

Usage of the `datil` and `datil-test` networks require the use of [Lit Capacity Credits](../../../sdk/capacity-credits.md). Currently, Capacity Credits are paid for using the `tstLPX` token and don't require any real-world money. However, in the future you will need to pay real-world money for usage of Lit networks, and `datil` and `datil-test` are the Lit networks where this functionality is being tested and refined.

## Storing `SessionSigs`

When running code to generate session signatures, storing them can be done by using the `LocalStorage` imported from the `node-localstorage` package. 

```javascript
import { LocalStorage } from "node-localstorage";
```

When running code within a browser, this import is not needed, as the session keys will be stored within the browser's local storage. However, when running this code in an environment such as Node.js where browser local storage is not available, the `LocalStorage` module is used to provide file-based storage for our generated session keys and metadata. 

```javascript
litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.DatilDev,
    // This storageProvider object can be omitted if executing in a browser
    storageProvider: {
        provider: new LocalStorage("./lit_storage.db"),
    },
});
```
All functions for generating session signatures will try to create a session key for you and store it in the local storage. The session keypair can also be generated with the `generateSessionKeyPair()` function. Doing this enables you to pass the generated session key as the optional `sessionKey` parameter when generating session signatures.

If you do not provide an instance of `LocalStorage` as the `provider`, then new session keys will be generated every time you run this code instead of one set of keys being reused.

## Format of `SessionSigs`

Given the following example `AuthSig`:

```json
{
    "sig": "0xef8f88fb285f006594637257034226923e3bbf7c6c69f8863be213e50a1c1d7f18124eefdc595b4f50a0e242e8e132c5078dc3c52bda55376ba314e08da862e21a",
    "derivedVia": "web3.eth.personal.sign",
    "signedMessage": "localhost:3000 wants you to sign in with your Ethereum account:
        0x5259E44670053491E7b4FE4A120C70be1eAD646b


        URI: lit:session:6a1f1e8a00b61867b85eaf329d6fdf855220ac3e32f44ec13e4db0dd303dea6a
        Version: 1
        Chain ID: 1
        Nonce: 0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553
        Issued At: 2022-10-30T08:25:33.371Z
        Expiration Time: 2022-11-06T08:25:33.348Z
        Resources:
        - urn:recap:eyJkZWYiOlsibGl0U2lnbmluZ0NvbmRpdGlvbiJdLCJ0YXIiOnsicmVzb3VyY2VJZCI6WyJsaXRFbmNyeXB0aW9uQ29uZGl0aW9uIl19fQ==",
    "address":"0x5259E44670053491E7b4FE4A120C70be1eAD646b"
}
```

<br/>

Here is an example `SessionSig` that uses a session keypair to sign the `AuthSig` above:

```json
{
    "sig": "0196a7e5b8271e287fc376af3ae35955cac1009149b9b9eab4c5f8c845ca20658f937a42b7c03a8884573b801de1c36f9fa8a6d2f3ba432dc4326443c114c40c",
    "derivedVia": "litSessionSignViaNacl",
    "signedMessage": '{
        "sessionKey": "6a1f1e8a00b61867b85eaf329d6fdf855220ac3e32f44ec13e4db0dd303dea6a",
        "resourceAbilityRequest": [
            {
                "resource": "lit-accesscontrolcondition://524a697a410a417fb95a9f52d57cba5fa7c87b3acd3b408cf14560fa52691251",
                "ability": "access-control-condition-decryption"
            }
        ],
        "capabilities": [{
            "sig": "0xef8f88fb285c0065946f7257034226923e3bbf7c6c69f8863be213e50a1c1d7f18124eefdc595b4f50a0e242e8e132c5078dc3c52bda55376ba314e08da862e21a",
            "derivedVia": "web3.eth.personal.sign",
            "signedMessage": "localhost:3000 wants you to sign in with your Ethereum account:
                0x5259E44670053491E7b4FE4A120C70be1eAD646b


                URI: lit:session:6a1f1e8a00b61867b85eaf329d6fdf855220ac3e32f44ec13e4db0dd303dea6a
                Version: 1
                Chain ID: 1
                Nonce: 0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553
                Issued At: 2022-10-30T08:25:33.371Z
                Expiration Time: 2022-11-06T08:25:33.348Z
                Resources:
                - urn:recap:eyJhdHQiOnsibGl0LWFjY2Vzc2NvbnRyb2xjb25kaXRpb246Ly81MjRhNjk3YTQxMGE0MTdmYjk1YTlmNTJkNTdjYmE1ZmE3Yzg3YjNhY2QzYjQwOGNmMTQ1NjBmYTUyNjkxMjUxIjp7IiovKiI6W3t9XX19LCJwcmYiOltdfQo=",
            "address":"0x5259E44670053491E7b4FE4A120C70be1eAD646b"
        }],
        "issuedAt": "2022-10-30T08:27:01.667Z",
        "expiration": "2022-10-30T08:32:01.667Z",
        "nodeAddress": "https://node2.litgateway.com:7370"
    }',
    "address": "6a1f1e8a00b61867b85eaf329d6fdf855220ac3e32f44ec13e4db0dd303dea6a",
    "algo": "ed25519"
}
```

<br/>

Here is what each field means:

- `sig` is the signature produced by the ed25519 keypair signing the `signedMessage` payload
- `derivedVia` should be `litSessionSignViaNacl` and specifies that the SessionSig object was created via the `NaCl` library.
- `signedMessage` is the payload that was signed by the session keypair.
- `address` is the session keypair public key.
- `algo` is the signing algorithm used to generate the session signature.

### Signed Message

Here is what each field in `signedMessage` means:

- `sessionKey` is the session keypair public key.
- `resourceAbilityRequests` is a lit of abilities that the session key is requesting to perform against the specified Lit resources during authentication. Read more [here](resources-and-abilities) about Lit Resources and Abilities.
- `capabilities` is an array of one or more AuthSigs.
- `issuedAt` is the time the SessionSig was issued.
- `expiration` is the time the SessionSig becomes invalid.
- `nodeAddress` is the specific URL the SessionSig is meant for.

### Resources you can Request

You can pass an array of `resourceAbilityRequests` to the above functions, which will be presented to the user in the SIWE message - read more [here](resources-and-abilities) about Lit resources and abilities. The resources and abilities requested by the session key must be narrower or equal to the capabilities granted to it per the session capability object specified in the inner `AuthSig`. 

When session capability objects are omitted from functions generating session signatures, the SDK will generate a session capability object with **wildcard permissions against all of the resources in that category by default**, i.e. ability to perform operations against all access control conditions. This should only be done when debugging, as allowing unspecified access control conditions is a security vulnerability. Read more [here](capability-objects) about how to create custom session capability objects.

#### Node Address

The `nodeAddress` will be different for each node, which means that, for a 30-node network, the SDK will generate 30 different `sig` and `signedMessage` parameters.

<FeedbackComponent/>
