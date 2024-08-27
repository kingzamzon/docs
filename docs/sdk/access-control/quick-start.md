import FeedbackComponent from "@site/src/pages/feedback.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

## Start Here

You can use the Lit network to encrypt your data and store it privately on the open web. Lit has the potential to encrypt messages, create Access Control Conditions (ACCs), and permit decryption by users who meet the condition you set.

Lit can only be used to generate and store encryption keys, so you will need to store the ciphertext and metadata yourself using your storage provider of choice (such as IPFS, Arweave, or even a centralized storage solution). Once your data has been encrypted, the Lit network will enforce who is allowed to decrypt it.

This guide uses Lit's [Datil Network](../../network/networks/mainnet.md), the Mainnet Beta, which is designed for application developers aiming to build **production-ready** applications. For those developing in a test environment, the Datil-test Network is recommended. More on Lit networks [here](../../network/networks/testnet.md).

For developers looking to explore beyond the basics, check out the [Advanced Topics](https://developer.litprotocol.com/category/advanced-topics-1) for more developed uses of Lit Actions.

## Install and Import the Lit SDK

To get started with Lit Actions and the Lit SDK, you'll need to have the following:

1. Operating System: Linux, Mac OS, or Windows.
2. Development Environment: You'll need an Integrated Development Environment (IDE) installed. We recommend Visual Studio Code.
3. Languages: The Lit SDK supports JavaScript. Make sure you have the appropriate language environment set up.
4. Internet Connection: A stable internet connection is required for installation, updates, and interacting with the Lit nodes.

You should use **at least Node v19.9.0** for 
- **crypto** support.
- **webcrypto** library support if targeting `web`.

If you're just getting started with Lit, we recommend taking a look at our [Starter Guides](https://github.com/LIT-Protocol/developer-guides-code/tree/master/starter-guides). These guides provide an envionment containing the necessary packages to get started with Lit.

For Lit Actions specifically, you'll also be needing these packages:

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'yarn', value: 'yarn'},
]}>
<TabItem value="npm">

```bash
npm install @lit-protocol/lit-node-client \
`@lit-protocol/constants` \
`@lit-protocol/auth-helpers` \
`@lit-protocol/contracts-sdk`
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @lit-protocol/lit-node-client \
`@lit-protocol/constants` \
`@lit-protocol/auth-helpers` \
`@lit-protocol/contracts-sdk`
```

</TabItem>
</Tabs>

## Running Lit Actions

Below will introduce a very basic setup of how to go from an empty file, to an implementation of a Lit Action that can be run on the Lit network.

### Connecting to the Lit Network

Running a Lit Action requires you to connect to the Lit network. This can be done by creating a [LitNodeClient](https://v6-api-doc-lit-js-sdk.vercel.app/classes/lit_node_client_src.LitNodeClient.html) instance, which will connect to the Lit network and allow you to interact with the network.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litNodeClient = new LitNodeClient({
  litNetwork: LitNetwork.DatilTest,
  debug: false,
});
await litNodeClient.connect();
```

</p>
</details>

### Lit Contracts and PKPs

Many of the Lit Actions you'll be running will require you to interact with Programmable Key Pairs ([PKPs])(../../user-wallets/pkps/overview). PKPs can be creating using [LitContracts](https://v6-api-doc-lit-js-sdk.vercel.app/classes/contracts_sdk_src.LitContracts.html).

LitContracts is a class that allows you to interact with the Lit contracts on the Lit network you're connected to. Some Lit networks require payment, a list of those which do and do not can be found [here](../../connecting-to-a-lit-network/connecting). This example will be using `datil-dev` which does not require payment.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LitNetwork, LIT_RPC } from "@lit-protocol/constants";
import * as ethers from "ethers";

const ethersWallet = new ethers.Wallet(
  process.env.ETHEREUM_PRIVATE_KEY, // Replace with your private key
  new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

const litContracts = new LitContracts({
  signer: ethersWallet,
  network: LitNetwork.DatilDev,
  debug: false,
});

const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
```

</p>
</details>

### Generating Session Signatures

[Session Signatures](../authentication/session-sigs/intro) are vital to authentication on the Lit network. They also are required for executing Lit Actions.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LitNetwork, LIT_RPC } from "@lit-protocol/constants";
import * as ethers from "ethers";

const ethersWallet = new ethers.Wallet(
  process.env.ETHEREUM_PRIVATE_KEY, // Replace with your private key
  new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

const litContracts = new LitContracts({
  signer: ethersWallet,
  network: LitNetwork.DatilDev,
  debug: false,
});

const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
```

</p>
</details>

# Learn More

By now you should have successfully created an Access Control Condition and performed encryption and decryption. To learn more about using decentralized access control, please check out the links below:

1. [JWT-based Access Control](../access-control/jwt-auth.md).
2. [Basic Conditions](../access-control/evm/basic-examples.md).
3. [Off-Chain Conditions](../access-control/lit-action-conditions.md).
4. [Custom Contract Calls](../access-control/evm/custom-contract-calls.md).

<FeedbackComponent/>
