import FeedbackComponent from "@site/src/pages/feedback.md";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

## Start Here

Blockchains like Ethereum have smart contracts that let developers encode logic to change that state. As a key management network, Lit provides a method that allows developers to encode logic that dictates signing.

Lit Actions are JavaScript functions that can be used read and write data across blockchains, web2 platforms, and the rest of the web3 world. You can use Lit Actions to generate signatures when your specified on or off-chain conditions are met, fetch data from off-chain platforms, and manage permissions for PKPs.

This guide will walk you through setting up a connection to the Lit network, defining a Lit Action, and executing the Lit Action. The code snippets can be complied and run to successfully execute the Lit Action, as long as an Ethereum wallet is initialized using the `ETHEREUM_PRIVATE_KEY` environment variable.

This guide uses Lit's [Datil-dev Network](../../connecting-to-a-lit-network/testnets#datil-dev) which is designed for application developers aiming to get familiar with the Lit SDK. Payment is not required on this network, and therefore the code is less complex. For those wanting to develop using Lit for production-ready applications, the [Datil-test](../../connecting-to-a-lit-network/testnets#datil-test) Network is recommended. More on Lit networks can be found [here](../../network/networks/testnet.md).

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
@lit-protocol/constants \
@lit-protocol/auth-helpers \
ethers@v5
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @lit-protocol/lit-node-client \
@lit-protocol/constants \
@lit-protocol/auth-helpers \
ethers@v5
```

</TabItem>
</Tabs>

## Running Lit Actions

Below will introduce a very basic setup of how to go from an empty file, to an implementation of a Lit Action that can be run on the Lit network.

### Connecting to the Lit Network

Running a Lit Action requires you to connect to the Lit network. This can be done by creating a [LitNodeClient](https://v6-api-doc-lit-js-sdk.vercel.app/classes/lit_node_client_src.LitNodeClient.html) instance, which will connect to the Lit network and allow you to interact with the network. We will also be initializing an Ethereum wallet using the `ETHEREUM_PRIVATE_KEY` environment variable. This is needed in generating session signatures.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitNetwork, LIT_RPC } from "@lit-protocol/constants";
import * as ethers from "ethers";

const litNodeClient = new LitNodeClient({
  litNetwork: LitNetwork.DatilDev,
  debug: false
});
await litNodeClient.connect();

const ethersWallet = new ethers.Wallet(
  process.env.ETHEREUM_PRIVATE_KEY, // Replace with your private key
  new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);
```

</p>
</details>

### Generating Session Signatures

Session signatures are vital to authentication on the Lit network. They also are required for giving your session the ability to execute Lit Actions. Please note that there is more than one way to generate session signatures, and that those methods can be found on their dedicated pages in the [Session Signatures](../authentication/session-sigs/intro) section.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
import {
  LitAbility,
  LitActionResource,
  createSiweMessage,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";

const sessionSignatures = await litNodeClient.getSessionSigs({
  chain: "ethereum",
  expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
  resourceAbilityRequests: [
    {
      resource: new LitActionResource("*"),
      ability: LitAbility.LitActionExecution,
    },
  ],
  authNeededCallback: async ({
    uri,
    expiration,
    resourceAbilityRequests,
  }) => {
    const toSign = await createSiweMessage({
      uri,
      expiration,
      resources: resourceAbilityRequests,
      walletAddress: await ethersWallet.getAddress(),
      nonce: await litNodeClient.getLatestBlockhash(),
      litNodeClient,
    });

    return await generateAuthSig({
      signer: ethersWallet,
      toSign,
    });
  },
});
```

</p>
</details>

## Defining the Lit Action

There are two ways to define a Lit Action. You can either define the code inline, or you can use IPFS to store the code. In this example, we'll use the inline method. If you'd like to use the IPFS method, you would instead use `ipfsId` instead of `litActionCode`, and the `ipfsId` would be the IPFS CID of the Lit Action code.

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
const litActionCode = `(() => {
  if (magicNumber >= 42) {
      LitActions.setResponse({ response:"The number is greater than or equal to 42!" });
  } else {
      LitActions.setResponse({ response: "The number is less than 42!" });
  }
})();`;
```

</p>
</details>

## Executing the Lit Action

To execute the Lit Action, you'll need to pass in the `sessionSigs` and `code` parameters. The `jsParams` parameter is optional, and can be used to pass in parameters to the Lit Action. 

<details>
<summary>Click here to see how this is done</summary>
<p>

```ts
const response = await litNodeClient.executeJs({
  sessionSigs: sessionSignatures,
  code: litActionCode,
  jsParams: {
    magicNumber: 43,
  }
});
```

</p>
</details>

# Learn More

By now you should have successfully written a and executed a Lit Action. If you’d like to learn more about what’s possible with Lit Actions, check out the [Advanced Topics](https://developer.litprotocol.com/category/advanced-topics-1) section.

<FeedbackComponent/>
