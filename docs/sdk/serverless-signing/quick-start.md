import FeedbackComponent from "@site/src/pages/feedback.md";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

## Start Here

Blockchains like Ethereum have smart contracts that let developers encode logic to change that state. As a key management network, Lit provides a method that allows developers to encode logic that dictates signing.

Lit Actions are JavaScript functions that can be used read and write data across blockchains, web2 platforms, and the rest of the web3 world. You can use Lit Actions to generate signatures when your specified on or off-chain conditions are met, fetch data from off-chain platforms, and manage permissions for PKPs.

In the following guide, we will write a simple Lit Action that requests a signature from the Lit nodes and signs the message "Hello World".

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

```ts
const response = await litNodeClient.executeJs({
  sessionSigs: sessionSignatures,
  code: litActionCode,
  jsParams: {
    magicNumber: 43,
  }
});
```

# Learn More

By now you should have successfully written a Lit Action, minted a PKP, and used it to sign a message with a Lit Action. If you’d like to learn more about what’s possible with Lit Actions, please follow the links below:

1. [Conditional Signatures](../serverless-signing/conditional-signing.md).
2. [Fetching Off-Chain Data](../serverless-signing/fetch.md).
3. [Using Dependencies](../serverless-signing/dependencies.md).
4. [Creating Blockchain Transactions](../serverless-signing/processing-validation.md).

<FeedbackComponent/>
