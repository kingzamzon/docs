import FeedbackComponent from "@site/src/pages/feedback.md";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

## Start Here

This guide will walk you through the process of creating and executing your first Lit Action. The steps include connecting to the Lit network, writing and deploying your Lit Action code, and finally executing the Lit Action. You can use the provided code snippets to execute this on your own machine.

If you're instead looking to learn more about how Lit Actions work, check out the [Overview](./overview) page.

This guide uses Lit's [Datil-dev Network](../../connecting-to-a-lit-network/testnets#datil-dev) which is designed for application developers aiming to get familiar with the Lit SDK. Payment is not required on this network, and therefore the code is less complex. For those aiming to build production-ready applications, the [Datil-test Network](../../connecting-to-a-lit-network/testnets#datil-test) is recommended. Once ready, these applications can then be deployed on [Datil](../../connecting-to-a-lit-network/mainnets#datil), the Lit production network. To see the available Lit networks, check out [this page](../../connecting-to-a-lit-network/connecting).

For developers looking to explore beyond the basics, check out the [Advanced Topics](https://developer.litprotocol.com/category/advanced-topics-1) for more developed uses of Lit Actions.

## Installing the Lit SDK

To get started with Lit Actions and the Lit SDK, you'll need to install these packages:

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

If you're just getting started with Lit or development in general, we recommend taking a look at our [Starter Guides](https://github.com/LIT-Protocol/developer-guides-code/tree/master/starter-guides). These guides provide an environment for getting started with the Lit SDK.

:::info
You should use **at least Node v19.9.0** for 
- **crypto** support.
- **webcrypto** library support if targeting `web`.
:::

## Walkthrough

### Connecting to the Lit Network

Running a Lit Action requires an active connection to the Lit network. This can be done by initializing a [LitNodeClient](https://v6-api-doc-lit-js-sdk.vercel.app/classes/lit_node_client_src.LitNodeClient.html) instance, which will establish a connection to the Lit nodes.

We will also be initializing an Ethereum wallet using the `ETHEREUM_PRIVATE_KEY` environment variable, which is required for generating session signatures in this example.

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

Session signatures are used to authenticate and maintain an active connection to the nodes in the Lit network. They are required when executing a Lit Action or any other functionality (i.e. signing) with Lit. There is more than one way to generate session signatures, and that those methods can be found on their dedicated pages in the [Session Signatures](../authentication/session-sigs/intro) section.

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

## Storing the Lit Action

There are two ways to store a Lit Action. You can either write the code inline, or you can use IPFS to store the code. In this example, we'll use the inline method.

<details>
<summary>Click here to see how this is done</summary>
<p>

```jsx
const _litActionCode = async () => {
  if (magicNumber >= 42) {
      LitActions.setResponse({ response:"The number is greater than or equal to 42!" });
  } else {
      LitActions.setResponse({ response: "The number is less than 42!" });
  }
}

const litActionCode = `(${_litActionCode.toString()})();`;
```

</p>
</details>

## Executing the Lit Action

To execute the Lit Action, we use the `executeJs` function. You'll need to pass in the `sessionSigs` and `code` parameters. The `jsParams` parameter is optional, and can be used to pass in parameters to the Lit Action. 

If you'd like to use the IPFS method mentioned previously, you would instead use `ipfsId` instead of `code: litActionCode`, and the `ipfsId` would be the IPFS CID of the Lit Action code.

More details on the `executeJs` method can be found [here](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/types_src.JsonExecutionSdkParams.html).

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

By now you should have successfully written and executed a Lit Action. If you’d like to learn more about what’s possible with Lit Actions, check out the [Advanced Topics](https://developer.litprotocol.com/category/advanced-topics-1) section.

<FeedbackComponent/>
