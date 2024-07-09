import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Testnets

Test networks are designed for early-stage application development. Storing assets with real world value on these networks is **highly discouraged** and minted PKPs may be deleted. All test networks may be deprecated in the future.

Here is an overview of the Lit testnets:

| Name      | Lit Blockchain                                             | Minimum Lit SDK Version | Lit SDK Network Identifier | Requires Payment |
|-----------|------------------------------------------------------------|-------------------------|----------------------------|------------------|
| Datil-dev | [Chronicle Vesuvius](./lit-blockchains/chronicle-vesuvius) | `^6.1.0`                | `datil-dev`                | ❌                |
| Cayenne   | [Chronicle](./lit-blockchains/chronicle)                   | `^4.0.0`                | `cayenne`                  | ❌                |
| Manzano   | [Chronicle](./lit-blockchains/chronicle)                   | `^4.0.0`                | `manzano`                  | ✅                |

## Datil-dev

The Lit network, Datil-dev, utilizes the Lit blockchain: Chronicle Vesuvius. It's a centralized testnet designed for early-stage development, and is superseding the Cayenne testnet. Like Cayenne, usage of the network does **not** require payment using [Capacity Credits](../sdk/capacity-credits).

If you are currently on one of the Lit networks that utilize the Chronicle blockchain (i.e. Cayenne, Manzano, and/or Habanero), please refer to [this guide](./lit-blockchains/migrations/migrating-to-vesuvius) to learn how to migrate to Chronicle Vesuvius.

The minimum version of the Lit SDK that supports `datil-dev` is `6.1.0`, and it will be installed from NPM by default:

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'yarn', value: 'yarn'},
]}>
<TabItem value="npm">

```bash
npm install @lit-protocol/lit-node-client
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @lit-protocol/lit-node-client
```

</TabItem>
</Tabs>

There were no breaking changes to the API for `v6` of the Lit SDK, so the code you were using for Cayenne should work without issue on Datil-dev. If you do run into issues after migrating to Datil-dev, please reach out to us on our [Telegram](https://t.me/+aa73FAF9Vp82ZjJh) for support.

To connect to Datil-Dev, please follow the [Connecting to a Lit Network](./connecting) guide using `datil-dev` for the `litNetwork` property when instantiating an instance of the `LitNodeClient`.
