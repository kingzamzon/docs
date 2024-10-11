import SupportedChainCard from '@site/src/components/SupportedChainCard';

# Supported Blockchains

Lit extends its functionality across many blockchains, enabling the signing of data/transactions and setting up precise access control conditions using on-chain state.

## Signing Data

Lit's [Programmable Key Pairs (PKPs)](../user-wallets/pkps/overview) support signing data/transactions with the ECDSA secp256k1 curve, commonly used in EVM based blockchains. For a shortlist of which blockchains use ECDSA, please visit [here](http://ethanfast.com/top-crypto.html).

Additionally, we accommodate the Solana ecosystem by supporting the Ed25519 curve with our [Wrapped Keys SDK](../user-wallets/wrapped-keys/overview). For those working with other cryptographic curves, Lit provides the flexibility to integrate custom signing functions using [Custom Wrapped Keys](../user-wallets/wrapped-keys/custom-wrapped-keys).

If you require support beyond our existing implementations, please [contact us](https://forms.gle/YQV5R7WoRyPk32xc7); we are continually expanding our capabilities to meet developer needs.

## Access Control Conditions

Lit's [Access Control Conditions](../sdk/access-control/intro) allow you to specify fine-grained access control policies using on-chain state. Currently Lit supports reading state from most EVM based chains, the Cosmos ecosystem, and Solana. Below is an overview of the EVM based chains currently supported:

:::info
Is your preferred blockchain not yet supported? Submit a request for its addition using [this form](https://forms.gle/YQV5R7WoRyPk32xc7).
:::

<SupportedChainCard
  title="EVM Based Chains"
  className="supported-chains"
/>
