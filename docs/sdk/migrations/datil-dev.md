import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating from Cayenne to Datil-dev

Previously Lit networks were powered by a pre-Bedrock Optimism L2 rollup called [Chronicle](../../network/rollup.mdx). In our effort to deliver a more performant and stable backend for Lit's infrastructure, we're launching a new network, Vesuvius, powered by [Arbitrum Orbit](https://arbitrum.io/orbit).

Like `cayenne`, `datil-dev` is a centralized DevNet intended to be used for application prototyping/getting familiar with Lit. Unlike the existing chains `manzano` and `habanero`, payment is not required for usage of the Lit network.

## Breaking Changes and Important Updates

### New Network, New PKPs

Because existing PKPs were minted on the old Chronicle chain, migration from `cayenne` to `datil-dev` requires re-minting of all PKPs. This also means transferring ownership of assets owned by PKPs minted on Chronicle, to the newly minted ones on Chronicle Vesuvius.

### Encrypted Data

Because Vesuvius is a new Lit network, a new round of Distributed Key Generation (DKG) has been done, resulting in new BLS root keys for the network. This means all previously encrypted data using `cayenne`'s public BLS key, will **not** be able to be decrypted using the `datil-dev` network.

To migrate existing encrypted data, you will need to decrypt it using `cayenne`, then re-encrypt the data using the `datil-dev` network.

## How to Connect to `datil-dev`

The only code changes required to make use of the new `datil-dev` network are as follows:

- Upgrade the Lit packages to the latest version that supports `datil-dev`
- Specify the Lit network `datil-dev` when instantiating Lit node clients from the SDK

Making these changes shouldn't cause your existing implementations to break, assuming you've handled migration of PKPs and encrypted data as mentioned above.

If you do run into issues after migrating from `cayenne` to `datil-dev`, please reach out to us on our [Telegram](https://t.me/+aa73FAF9Vp82ZjJh) for support.

### Upgrading the Lit Packages

```note
The version of the Lit SDK that supports `datil-dev` is still in beta. Once the package version is fully release, the `datil-dev` NPM tag will no longer be required, as it will be installed from NPM by default.
```

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

### Connecting a Lit Client to `datil-dev`

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
