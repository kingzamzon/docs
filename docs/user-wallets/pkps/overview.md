import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

Programmable Key Pairs (PKPs) are ECDSA public/private key pairs created by the Lit network using Distributed Key Generation (DKG). Each Lit node holds a share of the private key, and more than two-thirds of these shares must be collected to execute a given action (i.e. signing a transaction).

PKPs can be programmed with custom logic to automate on-chain actions and implement sophisticated access control. They can be used to create non-custodial wallets, automate transactions, and build complex decentralized applications.

Please refer to the [Quick Start Guide](./quick-start.md) for how to get started with PKPs.

## How it Works

<!-- When a PKP is created, the Lit network uses Distributed Key Generation (DKG) to generate the key pair. This process ensures that no single node has access to the entire private key. Instead, each node holds a share of the key.

To use a PKP for signing transactions or executing programmed logic:

1. **Request Initiation**: A Lit node client sends a request to the Lit network to use a specific PKP.

2. **Share Collection**: The network collects shares from more than two-thirds of the nodes.

3. **Threshold Signing**: Using threshold cryptography, the network combines these shares to perform the requested action (e.g., signing a transaction) without ever reconstructing the full private key.

4. **Programmed Logic Execution**: If the PKP has associated programmed logic (a Lit Action), this logic is executed within the network's secure environment. -->

### Key Generation and Storage

PKPs are created using Distributed Key Generation (DKG) across the Lit network. This process ensures that the private key is never assembled in one place, and is instead split into shares with each node in the Lit network holding a share. Consequently, no single entity, including Lit Protocol itself, has access to the full private key. The public key, however, is publicly available and can be used to derive the corresponding blockchain address.

### Signing Process

When a signing operation is requested, a Lit node client sends the request to the Lit network where nodes holding key shares participate in a threshold signing process. Each Lit node is then tasked with providing their signature share of the data using their respective PKP key share. Once more than two-thirds of the Lit nodes respond, the signature shares are combined resulting in a complete signature of the data you requested be signed by the PKP.

This threshold signing process ensures that the full private key is never reconstructed at any point, maintaining security while producing a signature with the PKP.

### Programmability and Access Control

A key feature of PKPs is their programmability. Each PKP can be authorized to execute specific [Lit Actions](../../sdk/serverless-signing/overview.md), which are JavaScript scripts that define the conditions and logic for key usage. This programmability allows for things like access control, where the use of a PKP can be gated by various on-chain conditions like token ownership, or off-chain conditions such as OAuth verification. Additionally, because a Lit Action is just a JavaScript script, you have a lot of flexibility on what your Lit Action does and how it makes use of the PKP.

### Interoperability and Upgradability

PKPs are designed with interoperability in mind, capable of interacting with various blockchains and Web3 protocols. This makes them suitable for cross-chain operations and interoperability solutions. Furthermore, the logic associated with PKPs (in the form of Lit Actions) can be updated without changing the key pair itself, allowing for evolving functionality while maintaining a consistent blockchain identity.

By leveraging these features, PKPs enable developers to create sophisticated, secure, and user-friendly blockchain applications with programmable, non-custodial key management. This approach opens up new possibilities for decentralized applications, automated transactions, and complex on-chain logic execution.

## Key Features

- **Distributed Security**: No single point of failure in key management.
- **Programmable Logic**: Automate on-chain actions with custom logic.
- **Flexible Access Control**: Implement sophisticated access rules for key usage.
- **Non-Custodial**: Users maintain control over their assets without managing private keys directly.

## Use Cases

- Building non-custodial wallets with improved user experience
- Automating recurring transactions or complex DeFi strategies
- Implementing multi-factor authentication for blockchain applications
- Creating decentralized identity solutions

For more detailed information on creating and using PKPs, please refer to the [Quick Start Guide](./quick-start.md).
