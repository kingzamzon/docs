import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating to Datil

Previously Lit networks were powered by a pre-Bedrock Optimism L2 rollup called [Chronicle](../../network/rollup.mdx). In our effort to deliver a more performant and stable backend for Lit's infrastructure, we're launching a new network, Vesuvius, powered by [Arbitrum Orbit](https://arbitrum.io/orbit).

Depending on the existing Lit network you are using, you should migrate to it's corresponding Datil network:

| Currently Available | Requires Payment | Your Current Network | Network to Migrate to | Description                                                 |
| --------------------| ---------------- | -------------------- | -------------------- | ------------------------------------------------------------ |
|          ❌         |          ✅      | `habanero`           | `datil`               | Decentralized mainnet designed for production use cases      |
|          ❌         |          ✅      | `manzano`            | `datil-test`          | Decentralized testnet designed for pre-production deployment |
|          ✅         |          ❌      | `cayenne`            | `datil-dev`           | Centralized testnet designed for early-stage development     |

Like their counterparts, `datil` and `datil-test` require payment for usage of the Lit network via [Capacity Credits](../capacity-credits.md); however, `datil-dev` does not.

## Breaking Changes and Important Updates

### New Network, New PKPs

Because existing PKPs were minted on the old Chronicle chain, migration from `cayenne` to `datil-dev` requires re-minting of all PKPs. This also means transferring ownership of assets owned by PKPs minted on Chronicle, to the newly minted ones on Chronicle Vesuvius.

### Encrypted Data

Because Vesuvius is a new Lit network, a new round of Distributed Key Generation (DKG) has been done, resulting in new BLS root keys for the network. This means all previously encrypted data using `cayenne`'s public BLS key, will **not** be able to be decrypted using the `datil-dev` network.

Each Lit network has it's own BLS root key that's used for encrypting data. To migrate existing encrypted data, you will need to decrypt it using the Lit network it was encrypted with. Then re-encrypt it using one of the new Datil networks.

There were no API changes made to the SDK for encrypting and decrypting, so you're existing code should work with Datil. See [here](../../sdk/access-control/quick-start#performing-encryption) for a guide on encrypting data, and [here](../../sdk/access-control/quick-start#performing-decryption) for decrypting.

## How to Connect to a Datil Network

:::note
Currently only the `datil-dev` network is live and available to connect to. This guide will be updated when the other Datil networks come online.
:::

The only code changes required to make use of the new Datil networks are as follows:

- Upgrade the Lit packages to the latest version that supports Datil
- Specify the Datil network when instantiating Lit node clients from the SDK

Making these changes shouldn't cause your existing implementations to break, assuming you've handled migration of PKPs and encrypted data as mentioned above.

If you do run into issues after migrating from an existing network to a Datil network, please reach out to us on our [Telegram](https://t.me/+aa73FAF9Vp82ZjJh) for support.

### Upgrading the Lit Packages

:::note
The version of the Lit SDK that supports `datil-dev` is still in beta. Once the package version is fully released, the `datil-dev` NPM tag will no longer be required, as it will be installed from NPM by default.
:::

The `datil-dev` NPM tag can be used to install any of the Lit packages like so:

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'yarn', value: 'yarn'},
]}>
<TabItem value="npm">

```bash
npm install @lit-protocol/lit-node-client@datil-dev
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @lit-protocol/lit-node-client@datil-dev
```

</TabItem>
</Tabs>

### Connecting a Lit Client to a Datil Network

<Tabs
defaultValue="datil-dev"
values={[
{label: 'Connecting to datil-dev', value: 'datil-dev'},
{label: 'Connecting to datil-test', value: 'datil-test'},
{label: 'Connecting to datil', value: 'datil'},
]}>
<TabItem value="datil-dev">

Connecting a `LitNodeClient` to `datil-dev`:

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litNodeClient = new LitNodeClient({
    litNetwork: 'datil-dev', // <-- Change this from 'cayenne'
});
await litNodeClient.connect();
```

Connecting a contracts client to `datil-dev`:

```ts
import { LitContracts } from "@lit-protocol/contracts-sdk";

const litContractsClient = new LitContracts({
    litNetwork: 'datil-dev', // <-- Change this from 'cayenne'
});
await litContractsClient.connect();
```

</TabItem>

<TabItem value="datil-test">

Connecting a `LitNodeClient` to `datil-test`:

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litNodeClient = new LitNodeClient({
    litNetwork: 'datil-test', // <-- Change this from 'manzano'
});
await litNodeClient.connect();
```

Connecting a contracts client to `datil-test`:

```ts
import { LitContracts } from "@lit-protocol/contracts-sdk";

const litContractsClient = new LitContracts({
    litNetwork: 'datil-test', // <-- Change this from 'manzano'
});
await litContractsClient.connect();
```

</TabItem>

<TabItem value="datil">

Connecting a `LitNodeClient` to `datil`:

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litNodeClient = new LitNodeClient({
    litNetwork: 'datil', // <-- Change this from 'habanero'
});
await litNodeClient.connect();
```

Connecting a contracts client to `datil`:

```ts
import { LitContracts } from "@lit-protocol/contracts-sdk";

const litContractsClient = new LitContracts({
    litNetwork: 'datil', // <-- Change this from 'habanero'
});
await litContractsClient.connect();
```

</TabItem>
</Tabs>
