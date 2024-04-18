---
sidebar_position: 1
---

# How Does Lit Protocol Work

## Introduction

Lit Protocol combines cutting-edge cryptography, sealed confidential hardware, and peer-to-peer networking to provide builders in web3 with the ability to use cryptographic keys and private compute, as a service. With Lit, developers can: 

1. Securely generate and manage non-custodial keys
    1. User wallets and signers: onboard users into your application without relying on a centralized custodian or dealing with the complexities of key management.
        1. Example implementations: [PatchWallet](https://app.patchwallet.com/), [Silk](https://www.silk.sc/), [Collab.Land](https://www.collab.land/), [Tria](https://www.tria.so/), [Index Network](https://index.network/)
    2. Privacy applications: perform data encryption and manage access behind flexible access control rules and policies. 
        1. Example implementations: [Fox](https://docs.verifymedia.com/publishing/access-control/methods/lit-protocol), [Terminal3](https://www.terminal3.io/), [Streamr](https://streamr.network/), [Cheqd](https://cheqd.io/), [Lens Protocol](https://www.lens.xyz/), [Gitcoin](https://publicgoods.network/)
        
2. Write and execute private and immutable functions and compute jobs to power:
    1. Cross-chain messaging and automation: build protocols that have the ability to read and write data across blockchains and web3 protocols.
        1.  Example implementations: [Event Listener](https://developer.litprotocol.com/v3/tools/event-listener), [Yacht Labs SDK](https://github.com/Yacht-Labs/yacht-lit-sdk)
    2. Off-chain oracles: fetch verifiable off-chain data for use on-chain.
        1. Example implementations: coming soon.
    3. Private and verifiable LLMs and AI agents
        1. Example implementations: coming soon.
    4. And more…
    

To learn more about possible ways you can use Lit and to view additional implementation examples, check out the [use cases](../intro/usecases.md) section or follow the links below:

[Whitepaper](https://github.com/LIT-Protocol/whitepaper).   [Open Source Node Code](https://github.com/LIT-Protocol/Node).   [Audit reports](https://drive.google.com/drive/folders/1Rrht88iUkzpofwl1CvP9gEjqY60BKyFn?ref=spark.litprotocol.com).

Below, we will dive into how Lit works under the hood, starting with the following four core primitives:

## 1. Threshold Signatures

Nodes perform a [distributed key generation](https://docs.google.com/document/d/1eaSk6822d4B-bJtMiiGp4n9N4qZPnwWaEZOy-Xs8AK0/edit#heading=h.2q2y8wxw6nj8) (DKG) to create new public/private key pairs where no one party ever holds the entire key. Instead, each node holds a **key share** which they use to sign and decrypt data with.

- **Network Consensus:** All operations (signing or decryption) are performed in parallel and require participation from two-thirds of network nodes to be executed.
- **Key Distribution:** No one node (or client) ever gains access to private keys in their entirety. Decryption and signing operations do not expose the underlying key.
- **Curve Flexibility:** The protocol supports multiple cryptographic curves and signature schemes, with the ability to add new ones to enable interoperability with a wide variety of protocols and standards.

## 2. Sealed and Confidential Hardware

All Lit node operators run a bare metal install of [AMD’s SEV-SNP](https://www.amd.com/content/dam/amd/en/documents/epyc-business-docs/solution-briefs/amd-secure-encrypted-virtualization-solution-brief.pdf), ensuring they never have access to any key shares directly, nor the computation processed inside of each node.

- **Trusted Execution Environment (TEE)**: SEV-SNP is an example of a TEE, which provides advanced hardware-level isolation for all network operations.
- **Code Immutability and Confidentiality:** Deployed programs within the TEE are immutable and private, preventing unauthorized changes and maintaining consistent operational integrity.

## 4. Programmability

As mentioned, each Lit node is a confidential compute environment. This enables developers to write [programs](https://developer.litprotocol.com/v3/sdk/serverless-signing/quick-start) that govern the signing and encryption. 

## 4. Crypto-Economic Security and Incentives

The Lit network is supported by a decentralized network of node operators who must stake tokens in order to participate in the “active” node operator set. Current node operators include integration partners, project investors, and professional node operators. If you’re interested in becoming a node operator, please [reach out](https://docs.google.com/forms/d/e/1FAIpQLScBVsg-NhdMIC1H1mozh2zaVX0V4WtmEPSPrtmqVtnj_3qqNw/viewform).

- **Node Operators:** The current node operators active on the Habanero Mainnet Beta include:
    - Lit Protocol (our node)
    - [Collab.Land](https://www.collab.land/?ref=spark.litprotocol.com)
    - [Terminal3](https://www.terminal3.io/?ref=spark.litprotocol.com)
    - [Bware Labs](https://bwarelabs.com/?ref=spark.litprotocol.com)
    - [Streamr](https://streamr.network/?ref=spark.litprotocol.com)
    - [1kx](https://1kx.network/?ref=spark.litprotocol.com)
    - [Molecule](https://www.molecule.xyz/?ref=spark.litprotocol.com)
    - [Imperator](https://www.imperator.co/?ref=spark.litprotocol.com)
    - [01node](https://01node.com/?ref=spark.litprotocol.com)
    - [CMT Digital](https://cmt.digital/?ref=spark.litprotocol.com)
- The Lit Protocol Token (LPX): The LPX token will be used by node operator to meet their staking requirement, as well as to reward them for their service.  Developers using Lit will also use the token to pay for transacting on the network.
    
    The LPX token is NOT live, and currently a test token (testLPX) is being used in its place. The LPX token will be released when the v1 network is released later this year. 
    

## Learn More

Learn more about how Lit Protocol works by checking out the resources below:

- About [user wallets](../concepts/pkps-as-wallet.md).
- About [encryption and access control](../concepts/access-control-concept.md).
- About [decentralized compute](../concepts/programmable-signing-concept.md).

Did you find this guide helpful? If not, please [reach out](https://docs.google.com/forms/d/e/1FAIpQLScBVsg-NhdMIC1H1mozh2zaVX0V4WtmEPSPrtmqVtnj_3qqNw/viewform?usp=send_form).