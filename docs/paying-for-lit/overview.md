# Paying for Usage of Lit

The Lit networks, like other decentralized networks, manage their computational resources to ensure optimal performance and synchronization across their nodes. To maintain a responsive and balanced network, Lit implements a metering system for resource utilization.

When using the Lit networks, whether it's the decentralized testnet ([Datil-test](../connecting-to-a-lit-network/testnets#datil-test)) or the production-ready mainnet beta ([Datil](../connecting-to-a-lit-network/mainnets#datil)) - you'll need to pay for and reserve your usage. This is accomplished using [Lit test tokens](#lit-test-token) and [Capacity Credits](#capacity-credits).

To streamline the payment process and facilitate integration into your apps, Lit offers two tools: [the Lit Relayer](#lit-relayer) and [the Payment Delegation Database](#payment-delegation-database). These tools allow you to seamlessly incorporate Lit functionality without burdening your users with the need to acquire Lit test tokens or mint Capacity Credits on their own.

## Overview of What Requires Payment

### General Lit Network Usage

| Request Type                                | Requires Payment | Can Be Paid for Using the Lit Relayer | Payment Type     |
|---------------------------------------------|------------------|---------------------------------------|------------------|
| Connecting to a Lit Network                 | ❌                | n/a                                   | n/a              |
| Generating Session Signatures               | ❌                | n/a                                   | n/a              |
| Reading Data from Lit Contracts             | ❌                | n/a                                   | n/a              |
| Lit Action Execution                        | ✅                | ❌                                     | Capacity Credits |
| Setting Up a Payment Delegation Payer       | ✅                | ✅                                     | Lit Test Tokens  |
| Adding / Removing Payment Delegation Payees | ✅                | ✅                                     | Lit Test Tokens  |

### Capacity Credits

| Request Type        | Requires Payment | Can Be Paid for Using the Lit Relayer | Payment Type    |
|---------------------|------------------|---------------------------------------|-----------------|
| Minting a Credit    | ✅                | ❌                                     | Lit Test Tokens |
| Delegating a Credit | ❌                | n/a                                   | n/a             |

### PKP Usage

| Request Type                       | Requires Payment | Can Be Paid for Using the Lit Relayer | Payment Type     |
|------------------------------------|------------------|---------------------------------------|------------------|
| Minting a PKP                      | ✅                | ✅                                     | Lit Test Tokens  |
| Adding / Removing PKP Auth Methods | ✅                | ❌                                     | Lit Test Tokens  |
| Signing with a PKP                 | ✅                | ❌                                     | Capacity Credits |

### Encrypting Data

| Request Type    | Requires Payment | Can Be Paid for Using the Lit Relayer | Payment Type     |
|-----------------|------------------|---------------------------------------|------------------|
| Encrypting Data | ❌                | n/a                                   | n/a              |
| Decrypting Data | ✅                | ❌                                     | Capacity Credits |

### Wrapped Keys Usage

| Request Type                           | Requires Payment | Can Be Paid for Using the Lit Relayer | Payment Type                         |
|----------------------------------------|------------------|---------------------------------------|--------------------------------------|
| Generating a Wrapped Key               | ✅                | ❌                                     | Lit Test Tokens                      |
| Importing Wrapped Key                  | ❌                | n/a                                   | n/a                                  |
| Exporting Wrapped Key                  | ✅                | ❌                                     | Capacity Credits                     |
| Getting Wrapped Key Metadata           | ✅                | ❌                                     | Capacity Credits                     |
| Storing Wrapped Key Metadata           | ❌                | n/a                                   | n/a                                  |
| Listing Wrapped Keys for a PKP         | ❌                | n/a                                   | n/a                                  |
| Signing a Message with Wrapped Key     | ✅                | ❌                                     | Capacity Credits                     |
| Signing a transaction with Wrapped Key | ✅                | ❌                                     | Capacity Credits                     |
| Custom Wrapped Keys                    | ✅                | ❌                                     | Lit Test Tokens and Capacity Credits |


## Overview of Payment Methods

### Lit Test Token

Currently the [`testLPX` test token](../connecting-to-a-lit-network/lit-blockchains/chronicle-yellowstone.md#tstlpx-test-token) is the native currency for the Lit [Chronicle Yellowstone](../connecting-to-a-lit-network/lit-blockchains/chronicle-yellowstone.md) rollup blockchain. It's currently used to pay for the gas of on-chain transactions, as well as for minting PKPs and Capacity Credits.

To obtain the `tstLPX` test token, please use [the faucet](https://chronicle-yellowstone-faucet.getlit.dev/). The `tstLPX` test token will be sent to your wallet address, allowing you to perform transactions on the rollup.

### Capacity Credits

Capacity Credits are NFT tokens that represent reserved computational capacity on the Lit network. When minting a credit, you specify and pay to reserve a specific amount of requests per second over a period of time. You'll then use these credits when making requests to the Lit network to perform actions such as decryption, executing Lit Actions, and signing transactions using PKPs and Wrapped Keys.

For a deep dive into Capacity Credits, including minting and usage details, checkout the in-depth [documentation](./capacity-credit-intro.md).

### Lit Relayer

The Lit Relayer is an [open-source service](https://github.com/LIT-Protocol/relay-server) currently hosted by Lit to facilitate onboarding into the Lit ecosystem. It helps reduce initial costs by covering or subsidizing certain interactions with the Lit network, such as minting PKPs.

While the Relayer eases the onboarding process, it's important to note that its availability is not guaranteed. Users may experience rate limiting and/or congestion due to its shared nature.

As your application moves into production, we recommend implementing this functionality directly into your own application instead of using the Lit Relayer. This will ensure that you can use the Lit network with minimal friction and disruptions in service, as your direct implementation will be much more reliable and scalable.

For a deep dive into the Relayer, including its usage and offered services, checkout the in-depth [documentation](./lit-relayer.md).

### Payment Delegation Database

The Payment Delegation Database is a service provided by the Lit Relayer that streamlines payment management for your users. This service offers an alternative to relying on the Lit Relayer's payment subsidies or minting individual Capacity Credits for each of your users. With the Payment Delegation Database, you can establish a Payer Wallet and designate your users as Payees.

The Payer Wallet acts as a central account that manages payment for Lit network usage on behalf of your users (Payees). Payees inherit the reserved capacity of the Payer Wallet, which automatically receives a minted capacity credit when registered with the service.

For a deep dive into the Payment Delegation Database, including how to register a Payer Wallet and add users as Payees, checkout the in-depth [documentation](./payment-delegation-db.md).

### Choosing the Right Payment Method

The Lit network offers various ways to implement payment for usage of the network, suiting various use cases and application scales. Consider the following guidelines when selecting the most appropriate option for your needs:

- Capacity Credits: Ideal for individual users or small-scale applications requiring direct control over their network resource allocation. This option is ideal when you don't have to manage payments for a large user base.
- Lit Relayer: Best for initial testing and prototyping. It reduces onboarding friction by subsidizing some network interactions, but is subject to availability and potential rate limiting.
- Payment Delegation Database: Suitable for larger applications or those with a large user base. It simplifies and centralizes the minting and delegation of Capacity Credits to your users, eliminating the need to manage individual Capacity Credits for each user.

For optimal results:

- New developers may start with the Lit Relayer managing Capacity Credit on their behalf for easier onboarding.
- As your application grows, transition to managing Capacity Credits yourself for more reliable resource allocation.
- Large-scale applications should consider the Payment Delegation Database for managing payment on behalf of many users.

## Getting Started

To begin using the paid Lit networks:

1. Assess your needs: Consider your expected usage, scale of operations, and whether you'll be managing payments for multiple users.
2. Choose a payment method:
    - For testing and prototyping, start with the Lit Relayer managing Capacity Credits.
    - For individual or small-scale use, consider managing Capacity Credits yourself.
    - For applications with many users, look into the Payment Delegation Database.
3. Set up your chosen method:
    - For the Lit Relayer, go [here](./lit-relayer.md) to begin integrating it into your application.
    - For Capacity Credits, go [here](./capacity-credit-intro.md) to learn how to mint and use them.
    - For the Payment Delegation Database, go [here](./payment-delegation-db.md) to learn how to register a Payer Wallet and add your users as Payees.
4. Monitor your usage and adjust as needed.
