---
sidebar_position: 1
---

# Overview

:::note
**STATE OF THE NETWORK**

PKPs are still heavily in development and should NOT BE USED to transact live assets that hold monetary value. DO NOT store assets you are not prepared to lose. During this period, we're grateful for feedback on how to improve the docs and examples.

**SDK DOCUMENTATION**
For the most up to date SDK documentation, check out the [Serrano branch SDK docs](https://serrano-sdk-docs.litprotocol.com/#welcome). For references to the Lit Actions functions which can be accessed inside a Lit Action via the `Lit.Actions` object, check out the [Lit Actions](http://actions-docs.litprotocol.com/) API docs.

If you need some Polygon Mumbai Tokens to [mint](https://explorer.litprotocol.com/mint-pkp) a PKP, fill out this [form](https://forms.gle/hcvh7VbS83DokBSE9).

:::

## MPC as a Key Management Solution

Applied generally, multi-party computation (MPC) allows multiple parties to collectively compute a function over a set of private inputs without ever revealing the inputs themselves. In the context of key management, MPC can be used to generate distributed shares of a public/private key pair (which can be utilized for encryption and signing), without ever exposing the private key in its entirety. This means no one party ever has full control over the underlying key pair, eliminating single points of failure that exist in "centralized" key management ecosystems. An in-depth look at the current state of the MPC wallet space is explored in [this article](https://medium.com/1kxnetwork/wallets-91c7c3457578) published by 1kx.

## PKPs as Distrbuted Custody Wallets

Lit’s [Programmable Key Pairs (PKPs)](/coreConcepts/LitActionsAndPKPs/PKPs) product can be utilized by app developers to build a white-label MPC wallet solution that delivers a more flexible and seamless onboarding experience to their end users. 

Each PKP is an ECDSA key pair generated collectively by the Lit nodes through a process called [Distributed Key Generation](https://developer.litprotocol.com/Introduction/howItWorks#threshold-cryptography) (DKG). Operating as a decentralized network, this allows Lit to generate a new key pair where the private key never exists in its entirety. Instead, each node only holds a share of the key. These signature shares must be combined above the threshold (two-thirds of the nodes) to produce the complete signature signed by the PKP. This signature can then be used for instances such as posting a transaction to a blockchain network. Each PKP is represented by an ERC-721 token minted on [Polygon](https://explorer.litprotocol.com/pkps).

The two-thirds threshold design provides a level of censorship resistance and fault tolerance that “typical” 2-of-2 MPC designs (e.g. Fireblocks) do not. In addition to any 2-of-2 provider being able to deny the user access to their funds or censor transactions, most of these systems also require the end user to custody a key share. This means the goal of a seamless, “web2” style onboarding UX is not possible (onboarding without seed phrases or private key management), instead delivering the UX of self-custody with additional steps.

In Lit’s model, the entire key lives in the network, and *any* arbitrary rules for [authentication](https://developer.litprotocol.com/coreConcepts/LitActionsAndPKPs/actions/authHelpers) can be assigned to that key pair through the use of [Lit Actions](https://developer.litprotocol.com/coreConcepts/LitActionsAndPKPs/actions/litActions). Authentication refers to the *****method***** that “owns” or controls the underlying key, denoting who has the power to combine the shares. This means that the provider or end user have full control over designing how these interactions should be managed. For example, allowing a user to create a wallet with nothing but their Gmail account, or requiring multi-factor authentication (MFA) when attempting to spend more than X amount of assets, as well as enabling flexible social recovery. Today, PKPs support the following auth methods:

- WebAuthn from [FIDO Alliance](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/) (AKA Apple Passkey, [demo](http://getlit.dev/demo))
- Web3 ownership (holding the “controller” [PKP NFT](https://explorer.litprotocol.com/mint-pkp))
- oAuth (Google, Discord)
- Self-custody key (such as a Ledger hardware wallet)

The current methods are a work in progress:

- Email
- SMS

You can read more about how authentication works with PKPs in [this section](https://developer.litprotocol.com/coreConcepts/LitActionsAndPKPs/actions/authHelpers) of the docs.

The end goal of this system is to facilitate a simple onboarding experience that helps bridge the next billion users into Web3.

![authOverview](/img/authOverview.png)

## Supported Chains

Today, PKP wallets are inherently compatible with any blockchain or cryptographic system that utilizes [ECDSA](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/) for digital signatures. This includes Ethereum and most EVM chains, Bitcoin, Cosmos-based chains, and storage networks like IPFS. This means that PKPs can be used to read and write data across these networks, bringing interoperability to previously disconnected ecosystems. You can view the complete list of supported chains [here](https://developer.litprotocol.com/Support/supportedChains#programmable-key-pairs).

## Using oAuth for "Seed-Phraseless" Onboarding

The ability to authenticate a Web3 account through oAuth will revolutionize the way we interact with blockchain applications and services, making it easier than ever for users to access the decentralized Web.

The following [codebase](https://github.com/LIT-Protocol/oauth-pkp-signup-example) walks through an example of using oAuth to generate a Lit-powered MPC wallet, all without a single seed phrase in sight. This flow is supported by the Lit Relay Server, which takes care of the PKP minting request and the linking of the distributed key pair to the Google account, all in a gasless manner for the end user. This relay server is currently set to private by default, but if you would like to use it in your own application, [get in touch](https://airtable.com/shr2NWJbH1Y6Y3kOU).

The complete walkthrough of this example project can be found on our [blog](https://spark.litprotocol.com/wallet-abstraction-with-google-oauth/).

## Lit x WalletConnect: Connecting your PKP to the dWeb

Native support for WalletConnect has been added to PKPs. This means that you can easily connect your PKP cloud wallet to any one of the hundreds of decentralized applications that have enabled support for WalletConnect. To connect a PKP to your dApp, all you need to do is:

### Create a Lit PKP Wallet Object

[LitPKP](https://github.com/LIT-Protocol/lit-pkp-sdk/blob/main/lit-pkp.js?ref=spark-by-lit-protocol) is a wrapper of [PKPWallet](https://github.com/LIT-Protocol/pkp-ethers.js/tree/main/packages/wallet?ref=spark-by-lit-protocol), a Wallet class that extends `ether.js Signer` and provides convenient methods to sign transactions and messages using [Lit Actions](https://developer.litprotocol.com/SDK/Explanation/litActions?ref=spark-by-lit-protocol).

`LitPKP` includes added functionality to handle Ethereum JSON RPC signing requests, which will be used to respond to requests facilitated through WalletConnect.

### Initialize WalletConnect

To initialize a WalletConnect V2 client (NOTE: WalletConnect V1 has been [deprecated](https://docs.walletconnect.com/2.0/advanced/migrating-from-v1.0)), you must first sign up for a project ID through this [link](https://cloud.walletconnect.com/sign-in). This ID is used to link the WalletConnect modal to your specific application.

### Subscribe and Respond to Events

Once the client is initialized, the dApp will request to connect to your PKP. To respond to requests from the dApp, you'll need to subscribe to WalletConnect events. When the subscribed event fires, the connector will respond by invoking the callback function you passed to the event listener. 

We recommend subscribing to at least these three event types:

- `session_request`: when a dApp requests to connect to your PKP
- `call_request`: when a dApp wants your PKP to sign messages or send transactions
- `disconnect`: when a dApp disconnects from your PKP

You can read the full guide and explore additional examples on our [blog](https://spark.litprotocol.com/connecting-lit-pkps-with-dapps/).