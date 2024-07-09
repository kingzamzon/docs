import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating To Datil From Earlier Networks

Previously Lit networks were powered by a pre-Bedrock Optimism L2 rollup called [Chronicle](../chronicle). In our effort to deliver a more performant and stable backend for Lit's infrastructure, we're launching a new blockchain network, [Chronicle Vesuvius](../chronicle-vesuvius), powered by [Arbitrum Orbit](https://arbitrum.io/orbit).

Chronicle Vesuvius will support three new Lit networks, and depending on the existing Lit network you are using, you should migrate to it's corresponding Datil network:

| Currently Available | Requires Payment | Minimum Lit Package Version | Your Current Network | Network to Migrate to | Description                                                  |
|---------------------|------------------|-----------------------------|----------------------|-----------------------|--------------------------------------------------------------|
| ❌                   | ✅                | n/a                         | `habanero`           | `datil`               | Decentralized mainnet designed for production use cases      |
| ❌                   | ✅                | n/a                         | `manzano`            | `datil-test`          | Decentralized testnet designed for pre-production deployment |
| ✅                   | ❌                | `6.1.0`                     | `cayenne`            | `datil-dev`           | Centralized testnet designed for early-stage development     |

Like their counterparts, `datil` and `datil-test` require developers to pay for usage of the Lit network via [Capacity Credits](../capacity-credits); however, `datil-dev` does not.

## Breaking Changes and Important Updates

Chronicle Vesuvius' chain facts are available [here](../chronicle-vesuvius#connecting-to-chronicle-vesuvius).

### New Network, New PKPs

PKPs minted on the existing Lit networks: `cayenne`, `manzano`, and `habanero` exist on the Chronicle blockchain. Because of this, when migrating to the new Datil networks: `datil-dev`, `datil-test`, and `datil`, your PKPs will need to be re-minted on the Chronicle Vesuvius blockchain. This also means transferring ownership of assets owned by PKPs minted on Chronicle, to the newly minted ones on Chronicle Vesuvius.

To reduce the friction of re-minting PKPs on Chronicle Vesuvius, we've written a [migration script](https://github.com/LIT-Protocol/developer-guides-code/tree/wyatt/pkp-migration-script/pkp-migration/nodejs) that will take a list of PKP public keys, fetch their configured Auth Methods and Scopes, and mint new PKPs on a target Lit Network, setting the same Auth Methods and Scopes for each PKP.

:::caution
The migration script **will not** handle migration of any assets the existing PKPs own such as tokens. Assets held by existing PKPs will need to be manually transferred to a new PKP's Ethereum address (or some another address of your choosing) using a blockchain transaction.

Additionally, the newly minted PKPs on the target Lit network will have new Ethereum addresses, so anything that uses the existing PKP's Ethereum address for things like permissions, will need to be manually updated to us the new PKP's Ethereum address.
:::

### Encrypted Data

Because each Lit network undergoes it's own Distributed Key Generation (DKG), and therefore has it's own BLS root key, any encrypted data on one Lit network is **not** able to be decrypted using a different Lit network. For example, data encrypted using `cayenne`'s public BLS key, will **not** be able to be decrypted using the `datil-dev` network.

As a result, to migrate existing encrypted data, you must first decrypt it using the Lit network it was encrypted on, then re-encrypt that data using the Datil network you're migrating to.

There were no API changes made to the SDK for encrypting and decrypting, so you're existing code should work with Datil. See [here](../../sdk/access-control/quick-start#performing-encryption) for a guide on encrypting data, and [here](../../sdk/access-control/quick-start#performing-decryption) for decrypting.

## How to Connect to a Datil Network

:::note
Currently only the `datil-dev` network is live and available to connect to. [This page](../../connecting) will be updated when the other Datil networks come online.
:::

The only code changes required to make use of the new Datil networks are as follows:

- Upgrade the Lit packages to the latest version that supports Datil
  - `6.1.0` is the minimum version of the packages that supports `datil-dev`
- Specify the Datil network when instantiating Lit node clients from the SDK
  - This is done by specifying the `litNetwork` property when [connecting a Lit client](../../connecting) to one of the following Datil networks:
    - `datil`
    - `datil-test`
    - `datil-dev`

Making these changes shouldn't cause your existing implementations to break, assuming you've handled migration of PKPs and encrypted data as mentioned above.

If you do run into issues after migrating from an existing network to a Datil network, please reach out to us on our [Telegram](https://t.me/+aa73FAF9Vp82ZjJh) for support.
