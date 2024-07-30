import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mainnets

Main networks are designed for late-stage application deployment. If you are implementing storing assets with real world value, it should be done on the main networks and not the test networks. While main networks may be deprecated in the future, assets will be transferable onto new networks.


Here is an overview of the Lit mainnets:

| Name       | Lit Blockchain                                                   | Description                                                                                                                                                                         | Minimum Lit SDK Version | Lit SDK Network Identifier | Requires Payment |
|------------|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|----------------------------|------------------|
| Datil-prod | [Chronicle Yellowstone](./lit-blockchains/chronicle-yellowstone) | Centralized mainnet designed for production deployment. Guaranteed real world asset transferability onto new mainnets. Payment is enforced.                                                                        | `^6.4.0`                | `datil-prod`               | ✅                |
|
## Datil-prod

The Lit network, Datil-prod, utilizes the Lit blockchain: Chronicle Yellowstone. It's a centralized mainnet designed for production deployment, and is superseding the Habanero mainnet. Like Habanero, usage of the network **does** require payment using [Capacity Credits](../sdk/capacity-credits).

If you are currently on one of the Lit networks that utilize the Chronicle blockchain (i.e. Cayenne, Manzano, and/or Habanero), please refer to [this guide](./migrating-to-datil) to learn how to migrate to Chronicle Yellowstone.

The minimum version of the Lit SDK that supports `datil-prod` is `6.4.0`, and the latest SDK version will be installed from NPM by default:

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

There were no breaking changes to the API for `v6` of the Lit SDK, so the code you were using for Habanero should work without issue on Datil-prod. If you do run into issues after migrating to Datil-prod, please reach out to us on our [Telegram](https://t.me/+aa73FAF9Vp82ZjJh) for support.

To connect to Datil-test, please follow the [Connecting to a Lit Network](./connecting) guide using `datil-prod` for the `litNetwork` property when instantiating an instance of the `LitNodeClient`.
