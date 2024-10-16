import FeedbackComponent from "@site/src/pages/feedback.md";

import AddRollupButton from "@site/src/components/AddRollupButton";

# Chronicle

:::warning
With the release of [Chronicle Yellowstone](./chronicle-yellowstone), Chronicle is going to be deprecated, and **should no longer be used.**

Please check out the [Migrating From Chronicle to Chronicle Yellowstone](../migrating-to-datil) guide if you need to migrate you application to Chronicle Yellowstone.
:::

Chronicle is Lit Protocol's custom EVM rollup testnet, which enhances the performance and scalability of our programmable decentralized threshold cryptography system.

<AddRollupButton />

## About Chronicle

Chronicle is a custom EVM rollup testnet based on the OP Stack, designed specifically for Lit Protocol. Anchored in the Polygon network, this rollup is the primary platform for coordination, minting PKPs (programmable key pairs), and managing PKP Permissions. Note that PKPs minted on Chronicle can still sign transactions on any chain supported by Lit, including EVM, Cosmos, and Bitcoin.

## `tstLIT` Test Token

The `tstLIT` test token serves as the gas for transactions on Chronicle. Please note that this is a test token with no real-world value. Its purpose is exclusively for testing and development on the Lit Protocol platform.

To obtain the `tstLIT` test token, please use the faucet at this [link](https://chronicle-yellowstone-faucet.getlit.dev/). The `tstLIT` test token will be sent to your wallet address, allowing you to perform transactions on the rollup.

Keep in mind that the official Lit Protocol token is scheduled to launch sometime in the future. This will be the actual token with real-world utility within the ecosystem.

## Connecting to Chronicle

To connect to Chronicle, you can click <AddRollupButton /> or manually add the network parameters below

| Parameter Name     | Value                                          |
| ------------------ | ---------------------------------------------- |
| Chain ID           | 175177                                         |
| Name               | Chronicle - Lit Protocol Testnet               |
| RPC URL            | https://chain-rpc.litprotocol.com/replica-http |
| Block Explorer URL | https://chain.litprotocol.com/                 |
| Currency Symbol    | tstLIT                                         |
| Currency Decimals  | 18                                             |

**Note** You must have the `tstLIT` test token in your wallet when minting a pkp, as it is used to pay the gas cost.

## Block Explorer

A block explorer is available for Chronicle, providing valuable insights into the network. You can access it at https://chain.litprotocol.com/. The explorer allows you to track transactions, addresses, and other essential data on the rollup.

## Special Features

Chronicle includes BLS 12-381 precompiles, which means you can verify BLS signatures on-chain. This feature is not part of Ethereum yet and is only available on Chronicle.

## Future Plans

Soon, each Lit Node operator will also run a Chronicle node. This will provide instant, secure Chronicle data to the Lit Nodes.

We are also working on a decentralized sequencer for the rollup, such that all Chronicle node operators are able to submit transactions to the rollup. This will allow for a more decentralized and secure rollup.

## Next Steps

Now that you've learned about Chronicle, you can write your first Lit Action that uses a PKP to sign! Learn how to do that [here](../../sdk/serverless-signing/conditional-signing).

<FeedbackComponent/>
