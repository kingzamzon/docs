---
sidebar_position: 1
---

# Introduction

:::note
PKPs are still heavily in development and things may change. We're grateful for [feedback](https://forms.gle/4UJNRcQspZyvsTHt8) on how to improve the docs and examples!

Need some `LIT` test tokens to mint a PKP on Chronicle? Use the faucet: https://faucet.litprotocol.com/

**PKP Developer Preview is Live!**
Get a PKP on the [PKP Explorer](https://explorer.litprotocol.com/mint-pkp)

:::

## What are Programmable Key Pairs (PKPs)?

A PKP is an ECDSA key-pair that is held in distributed custody by the Lit network. PKPs can be programmed to automatically sign based on application logic, which is specified in a JavaScript program called a Lit Action.

Each PKP is an ECDSA key-pair generated collectively by the Lit nodes through a process called Distributed Key Generation (DKG). As a network, this allows Lit to generate a new keypair where nobody knows the whole private key. Instead, each node only holds a share of the key. These signature shares must be combined above the threshold ( 2/3 of the nodes) to produce the complete signature signed by the PKP.

It’s important to note: only those with authorized access have the ability to request a signature or allow some signing logic to be run. Authorized access refers to the particular "authentication method" used to generate the PKP in the first place, such as a wallet signature or oAuth token. More on this below.

## How do I create a PKP?

You can mint an NFT from our PKP contract on Chronicle, Lit's custom EVM rollup testnet, [here](https://explorer.litprotocol.com/mint-pkp). This NFT represents the root ownership of the PKP. The NFT owner can grant other users (via a wallet address) or grant Lit Actions the ability to use the PKP to sign and decrypt data. They also have the ability to assign additional authentication methods, described at the bottom of the page.

You can also use our handy auth helper contract on Chronicle [here](https://github.com/LIT-Protocol/LitNodeContracts/blob/main/contracts/PKPHelper.sol) and you can find the contract addresses [here](https://explorer.litprotocol.com/contracts)

## What blockchains can PKPs write to?​

Any blockchain or cryptographic system that utilizes [ECDSA](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/) for digital signatures. This includes Ethereum and most EVM chains, Bitcoin, and Cosmos. View all supported chains [here.](/resources/supportedChains#programmable-key-pairs)

## What can I use PKPs for?

Each PKP is a valid ECDSA wallet, custodied collectively by the Lit nodes (AKA an [MPC wallet](https://medium.com/1kxnetwork/wallets-91c7c3457578)). This means you can use your PKP as a wallet when interacting with a [host of web3 applications](https://spark.litprotocol.com/connecting-lit-pkps-with-dapps/), using it to read and write data across Lit's supported blockchains.

You can also use a PKP as an asset "vault", sending a mix of BTC and ETH NFTs to it, and then selling them as a bundle by selling the NFT that controls the PKP on OpenSea. The buyer of that NFT would then have full permission to sign and decrypt data with the PKP, since they are now the owner of the controlling NFT. This means that the buyer could also withdraw the BTC and NFTs stored within, if desired.

This functionality is essentially securely trading a private key (a PKP), which has been impossible until now. This also breaks soulbound NFTs, because now you can securely trade the underlying private key that owns the soulbound tokens.

## Do I need a wallet in order to use a PKP?

Not necessarily! In order to sign with a PKP, you must present some form of authentication to the Lit nodes. We refer to this as an authentication method in the docs. This may be a user's wallet address, Google OAuth, Discord login, and more.

By continuing to work to support additional methods of authentication for PKPs (such as SMS and Apple Passkey, among others), we hope to facilitate a more frictionless onboarding experience for non-crypto-natives and enable intuitive methods for social recovery and wallet abstraction.

Check out this [proof of concept](https://spark.litprotocol.com/wallet-abstraction-with-google-oauth/) on how to mint a Programmable Key Pair and execute an on-chain transaction with nothing but a Google account, no private keys or seed phrases in sight!