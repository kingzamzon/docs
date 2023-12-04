---
sidebar_position: 2
---

# Serverless Signing

## Overview

The Lit Network can be used for programmable signing and condition-based transaction automation. Functionally, this feature gives developers the ability to use distributed serverless functions to build apps that can sign data with their own private key. These keys are:

1. [Blockchain Agnostic](../resources/supported-chains#programmable-key-pairs): Lit keys can be used to sign transactions on any blockchains or state machines using [ECDSA](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/) for digital signatures. Currently, the [SDK](https://github.com/LIT-Protocol/js-sdk/tree/master/packages/pkp-client) provides easy-to-use methods for creating wallets on EVM and Cosmos based chains.
2. Programmable: Lit keys can be programmed to sign based on pre-defined conditions, referred to as [conditional signatures](../sdk/serverless-signing/conditional-signing.md) in the docs. This is useful for defining [signing automations](https://spark.litprotocol.com/automated-portfolio-rebalancing-uniswap/), handling [authentication](../sdk/wallets/auth-methods), or generating [proofs](https://spark.litprotocol.com/authenticity-matters/) over off-chain data.
3. Fault-tolerant: Each key is generated collectively by the Lit nodes through a process called [Distributed Key Generation](https://en.wikipedia.org/wiki/Distributed_key_generation) (DKG). As a network, this allows Lit to generate a new key pair where no one node ever holds the key in its entirety.

To get started building with these tools right away, check out the Lit [SDK install guide](../sdk/serverless-signing/overview.md). Otherwise, keep reading to get a better understanding of how digital signatures work, why the technology is important, and potential ways this tooling can be implemented in the real world!

## Introduction to Digital Signatures

Made possible by [public key cryptography](https://en.wikipedia.org/wiki/Public_key_infrastructure), digital signatures provide a tamper-resistant means of verifying the authenticity and integrity of data on the Web. Data “signed” by an individual private key can be mathematically verified against the associated public key. It is this nature of mathematical verifiability that makes digital signatures so powerful. You can trust, with high confidence, that a particular signature is in fact authentic and hasn’t been forged or tampered with.

Digital signatures are a core component of the account and transaction logic used by blockchains and other distributed systems. Every time you send some tokens on Ethereum or post a message on Orbis, a message is created and signed by your private key (AKA your wallet). 

## Programmable Signatures with Lit

Use serverless signing for:

1. **Event listening and condition-based transaction execution**: Automate your interactions with blockchain ecosystems using condition-based execution, enabling use cases such as on-chain limit orders or recurring payments that don’t require manual input (i.e. signing off on the transaction) from the end user.
2. **Native cross-chain messaging and swaps**: Seamlessly transfer assets and data across blockchain networks without relying on a trusted intermediary or centralized asset bridge.
3. **Automated verifiable credential issuance**: Verifiable credentials are digital certifications attesting to particular user attributes or qualifications. Using condition-based signing, automate the issuance of these credentials and eliminate the possibility of fraud or human error.
4. **Enterprise “signed data” applications**: There are numerous use cases for cryptographically-verifiable “signed data” in institutional and enterprise environments, such as using digital signatures to authenticate and track goods in physical supply chains.
5. **Generating signed proofs over arbitrary Web data**: Using digital signatures to verify the provenance and integrity of data sourced from various locations on the open Web.
6. **Trustless vault applications**: Each PKP is represented by an ERC-721 token on the blockchain (explored in more detail in subsequent sections). This means that any assets sent to the PKP can be traded or sold in a single transaction by selling the NFT that controls the underlying key pair. This facilitates potential trustless “vault” applications where an array of assets may be managed together according to the rules associated with the PKP itself.
7. **Authentication for AI generated content**: A registry of identities and associated keys (which do the signing) in order to verify who made a given claim is neither ideal for privacy nor in line with the way that people use the Web. Threshold signing offers a unique solution to the data integrity problem, distributing trust among a set of parties to act as a “signer of last resort”.

## Getting Started and Further Reading

Some links to help you get started building with serverless signing:

- Overview of [serverless signing](../sdk/serverless-signing/overview.md)
- Getting started with the [Lit SDK](../sdk/installation)
- The [Lit Learning Lab](/learningLab/intro-to-lit/prog-signing)
- [Projects building with Lit](https://github.com/LIT-Protocol/awesome/tree/main#projects-and-integrations)
