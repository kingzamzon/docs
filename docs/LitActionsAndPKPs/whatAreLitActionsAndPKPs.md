---
sidebar_position: 2
---

# What are Lit Actions and PKPs?

**Heads Up** Lit Actions and PKPs are still heavily in development and things may change.

Smart contracts are powerful but generally isolated to the blockchain ecosystem on which they reside. Things like oracles and bridges help but must be set up on a case-by-case basis and are unwieldy to use. But what if a smart contract could have it's own public and private keypair, just like any other wallet? And what if that smart contract had the ability to make arbitrary HTTP requests and use the data in it's computation? Imagine smart contracts that can read and write from any HTTP endpoint, blockchain, state machine, or decentralized storage system. We're building this at Lit: The smart contracts are Lit Actions and the keypairs they can use are PKPs.

## What are PKPs?

PKP stands for Programmable Key Pair. Each PKP is generated collectively by the Lit Nodes through a process called Distributed Key Generation (aka DKG). This process permits the Lit Nodes to generate a new public/private keypair where nobody knows the whole private key. Instead, each node has a private key share, and they can do everything with it that they could do with a traditional private key, like sign and decrypt data. The difference is that signing with a private key share produces a signature share. These signature shares must be combined above the threshold (current 2/3 of the nodes) to produce the final signature.

## What are Lit Actions?

Lit Actions are Javascript functions that can utilize the threshold cryptography that powers the Lit Protocol. You can write some JS code, upload it to IPFS, and ask the Lit Nodes to execute that code and return the result. We provide JS functions you can use for threshold signing and decryption, so that you can ask the Lit Nodes to sign or decrypt some data for you with their private key share. You can collect these signature or decryption shares on the client side, and combine them to get a signature or decryption key. In the case of a signature, you can then use that signature for authentication, for example to write to a Ceramic Data stream, or to send an ETH transaction.

Lit Actions are stored on IPFS and are immutable, like smart contracts. You can think of them as Javascript smart contracts that have network access and can make HTTP requests.

## How do Lit Actions and PKPs work together?

A user may generate a new PKP, and may grant a Lit Action the right to sign using it. This means that Lit actions are kind of like smart contracts with a secret key they can use to sign or decrypt things.

## How do I create a PKP?

You can mint an NFT from our PKP contract on Celo here: https://lit-explorer.vercel.app/mint-pkp. This is an ERC721 NFT and the owner of it is the root owner of the PKP. The NFT owner can grant the ability to use the PKP to sign and decrypt data to both other users (via their wallet address) and also to Lit Actions.

## What can I use PKPs for?

Since a PKP is a valid ECDSA wallet, you could send a mix of BTC and ETH NFTs to it, and then sell it as a bundle by selling the NFT that controls it on OpenSea. The buyer gets the ability to sign and decrypt data with the PKP, since they own the controlling NFT. The buyer could then withdraw the BTC and NFTs if desired.

This functionality is essentially securely trading a private key, which has been impossible until now. This also breaks soulbound NFTs, because now you can securely trade the underlying private key that owns the soulbound tokens.

## What can I use Lit Actions for?

Lit Actions are essentially decentralized serverless functions. You can use Lit Actions to sign and decrypt data with PKPs.

## Why is any of this useful?

Because Lit Actions + PKPs + web3 storage can be a replacement for a traditional web2 backend. Imagine a web3 Twitter clone that stores the data on Ceramic. You could create a PKP that owns a Ceramic stream, and then grant access to sign with that PKP to a group of Lit Actions for things like `createPost()` and `likePost()`. Your Lit Actions can work just like a web2 backend, with business logic to ensure that only correct data is written to your Ceramic Stream. For example, the `likePost()` function could check that a user has not already liked a post, and only write the like to the stream if they have not already liked it.

In web2, your backend has "god mode" access to the DB. Using Lit and web3 storage like Ceramic, you can create Lit Actions that have "god mode" over a Ceramic stream, because the Lit Action has been granted the ability to sign with a PKP that owns the Ceramic stream. However, the Lit Action will only write to the stream according to the logic of the code inside it. This makes moving from a centralized web2 paradigm to a decentralized web3 paradigm much easier.

## How does network consensus work?

Because our nodes each hold a private key share, and we require 2/3 of them to sign or decrypt with their private key share, any signature or decryption key generated by the Lit Network must have been approved by at least 2/3 of the nodes. Lit Protocol doesn't have a traditional consensus mechanism like most blockchains do. This 2/3 threshold is mathematically enforced by the threshold cryptography algorithms Lit uses.

## State of the network today - Serrano Testnet

The Lit Actions and PKP network is in a testnet state. In this state, we have only implemented the ability to generate a new PKP for ECDSA signatures. A single BLS PKP is shared by all Serrano Testnet users. The data on the Serrano Testnet is not persistent and may be erased at any time. Therefore, we do not recommend storing anything of value on the Serrano Testnet.
