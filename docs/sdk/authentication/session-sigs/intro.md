---
sidebar_position: 1
---

import FeedbackComponent from "@site/src/pages/feedback.md";

# Session Signatures

Session Signatures are used to authenticate with the Lit nodes and create a secure connection to the Lit network. 

Generating a Session Signature is required whenever you want to request a specific [Lit Ability](https://v6-api-doc-lit-js-sdk.vercel.app/enums/types_src.LitAbility.html) (e.g. signing a transaction) for a particular Lit Resource (e.g. a PKP).

Session Signatures are created using session keys, which are generated for you when you initiate a connection with the Lit network via the Lit SDK. These session keys are unique [`ed25519`](https://ed25519.cr.yp.to/) keypairs generated locally by the Lit SDK. They are used to sign all requests to the Lit network during the current session.

While session keys and their signatures facilitate ongoing communication during a session, an `AuthSig` (Authentication Signature) is used to verify your identity and authorization to the Lit nodes.

An `AuthSig` is an [ERC-5573](https://eips.ethereum.org/EIPS/eip-5573) Sign-In with Ethereum Capabilities message. It specifies the authorized Lit Resources and Lit Abilities of the session.

The `AuthSig` allows Lit nodes to verify your authorization to perform actions like decrypting data, signing transactions with a PKP, or executing Lit Actions. When you make a request, each Lit node checks your `AuthSig` to confirm that your request aligns with the capabilities you previously defined. This ensures that only authorized users can perform specific actions within the Lit network. This authentication system maintains the security and integrity of the Lit network.

For detailed explanations of this setup, please refer to our [Security Considerations](../security.md) page.

## SessionSigs Generation Diagram
![Session Signatures Diagram](../../../../static/img//SessionSigs.png)

### Paying for Usage of the Lit Network

You can facilitate payment for usage the Lit network within Session Signatures. You can read more about paying for usage [here](../../../paying-for-lit/overview.md), and paying using Session Signatures [here](../../../paying-for-lit/using-delegated-auth-sig.md).

## Storing `SessionSigs`

### Running in a Browser

Session data is automatically stored in the browser's local storage, and no additional configuration is needed.

### Running in a Node.js (or Similar) Environment

A `storageProvider` needs to specified when creating an instance of the `LitNodeClient`. You decide how this implemented, but the following is an example of using `LocalStorage` from the `node-localstorage` package:

```javascript
import { LocalStorage } from "node-localstorage";

litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.DatilDev,
    // This storageProvider object can be omitted if executing in a browser
    storageProvider: {
        provider: new LocalStorage("./lit_storage.db"),
    },
});
```

If an instance of `LocalStorage` is not provided as the `storageProvider`, a new session keypair will be generated each time the code runs instead of reusing previously generated signatures and keys.

#### Manually Generating Session Keys

In addition to the automatic generation of session key pairs, you can manually generate a session key pair using the `generateSessionKeyPair()` function. This provides greater control over session management, especially in environments where custom handling of keys is necessary, such as server-side applications.

When a session keypair is manually generated, it includes both a public key and a private key (using the [Ed25519](https://ed25519.cr.yp.to/) algorithm). These key pairs are tied to the user’s device, ensuring that the session remains secure and unique to that environment.

Note:

- In a browser environment, the session key is automatically stored in local storage (lit-session-key) for later use, allowing persistent sessions without needing to regenerate the key each time.

- In a Node.js or similar environment, you need to specify a custom `storageProvider` to store and retrieve the session keys. Without this, a new keypair will be generated each time the session is initialised.

If no session key is provided, the SDK will automatically generate a new one. However, manually generating and managing session keys provides more control, especially if you want to cache or persist them securely across different environments.

### Resources you can Request

You can pass an array of `resourceAbilityRequests` to any of the functions that generate Session Signatures. These requests define the scope of actions the session key can perform. 

The requested resources and abilities must be either equal to or a subset of the capabilities specified in the session capability object within the `AuthSig`. A session key cannot have more privileges than those originally granted by the authentication signature.

When session capability objects are omitted from functions generating Session Signatures, the SDK defaults to creating a session capability object with maximum permissions (i.e. can use any Lit Resource with any Lit Ability that the signer of the AuthSig owns). This should only be done when debugging, as allowing unspecified access control conditions is a security vulnerability.

Read more [here](capability-objects) about how to create custom session capability objects.

<FeedbackComponent/>
