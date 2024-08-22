import FeedbackComponent from "@site/src/pages/feedback.md";

# Decentralized Compute with Lit Actions

## Introduction

Blockchains like Ethereum have smart contracts that let developers encode logic to change state. With Lit, you have the ability to encode logic that governs the signing and encryption operations that take place on the Lit network. This logic is encoded within a Lit Action: an immutable program written in JavaScript that can be assigned to a key generated on Lit and used to dictate how it is used. 

A simple example would be a Lit Action that checks whether or not a given value is prime number. If the number is prime, the Lit Action should return a signature. If the number is not prime, the Lit Action should do nothing. When an input is received, the program would be executed by every Lit node independently, in parallel. If the conditions were met (in this case, if the input was prime), each node would provision their key share down to the requesting client. When more than two-thirds of these shares have been collected, the complete signature can be formed.

By default, key shares will be combined client-side. However, you also have the ability to combine them *directly within* a Lit Action itself. This allows you to perform signing and decryption from within the confines of each Lit nodes [TEE](../../resources/how-it-works#sealed-and-confidential-hardware.md). Learn more about [signing within a Lit Action](../serverless-signing/combining-signatures.md) and [decrypting within a Lit Action](../serverless-signing/combining-decryption-shares.md) by following the docs. 

## Features and Examples

### Features

- **[Blockchain Agnostic](../../resources/supported-chains.md)**: Lit Actions can be used to read and write data to and between different blockchains using [Programmable Key Pairs](../../user-wallets/pkps/overview.md).
- **Immutable**: Like smart contracts, once a Lit Action has been published, it cannot be modified. The [Mint/Grant/Burn](https://github.com/LIT-Protocol/js-sdk/blob/70a041a97b56ba1a75724ba2cd56952b622e8a7f/packages/contracts-sdk/src/abis/PKPNFT.ts#L376) function allows you to atomically link a PKP to an authorized set of Lit Actions, guaranteeing that a particular PKP can only ever be used to sign data from within the approved set.
- **Off-Chain Compatibility**: You can make arbitrary HTTP requests from a Lit Action, meaning you can pull in data from off-chain sources natively, without needing to use of a third party oracle.

### Starter Examples

- [Conditional signing](../serverless-signing/conditional-signing.md): Return a signature when your pre-defined conditions are met.
- [Using fetch](../serverless-signing/fetch.md): Fetch data from other chains or off-chain sources in your Lit Action.
- [Access control](../access-control/lit-action-conditions.md): Create Lit Action Conditions to permit decryption using off-chain data. 
- [Importing dependencies](../serverless-signing/dependencies.md): Use external packages in your Lit Action.

### Advanced Examples

- [Combining signatures within a Lit Action](../serverless-signing/combining-signatures.md): Sign a message or transaction from within a Lit Action.
- [Decrypting within a Lit Action](../serverless-signing/combining-decryption-shares.md): Decrypt data for processing within a Lit Action.
- [Executing a Lit Action on a single node](../serverless-signing/run-once.md): Execute a Lit Action on a single node instead of across the entire network.
- [Broadcast and collect](../serverless-signing/broadcast-and-collect.md): Execute a Lit Action on each Lit node and aggregate their responses. Useful for performing operations over the return values, such as calaculating an average or median. 

## Getting Started

You can create your first Lit Action by following this [quick start](../serverless-signing/quick-start.md) guide. Below, you'll find some additional resources and example implementations:

1. [Lit Actions API docs](https://actions-docs.litprotocol.com/): An overview of all available functionality offered by Lit Actions.
2. [GetLit CLI](../../tools/getlit-cli.md): The GetLitCLI simplifies the Lit Action development process.
3. [Event Listener](../../tools/event-listener.md): Use the Lit Event Listener to create event-based triggers for Lit Actions.
4. [Developer Guides](https://github.com/LIT-Protocol/developer-guides-code/tree/master): Quick examples to get you started. 

<FeedbackComponent/>
