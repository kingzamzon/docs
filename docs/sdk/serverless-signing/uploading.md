# Uploading Your Lit Action

Lit Actions are powerful JavaScript programs that run on a Lit network. This guide covers the two processes for providing your Lit Action to the Lit network. For more info on what a Lit Action is, go [here](./overview.md.). For a guide on getting started with Lit Actions, go [here](./quick-start.md).

In order for the Lit nodes to be able to run your Lit Action, they need access to it's code. There are two methods of providing your code to the Lit network for execution:

1. Providing a Code String
2. Uploading to IPFS

## Choosing a Method

##### Providing a Code String

Generally, providing your Lit Action code as a code string is the recommended method for several reasons:

- **Direct Supply**: Your code is supplied directly to each Lit node, eliminating any potential network latency or availability issues caused by fetching your code from the IPFS network.
  - In our testing, the IPFS network *can* be slow to respond, and it does take time for files uploaded to the IPFS network to propagate and become available globally when requested.
  - We have seen instances where a new Lit Action was uploaded to IPFS, but the Lit nodes were unable to retrieve the file from the IPFS network when executing the Lit Action - this is a result of the sometimes slow IPFS propagation time.
- **Reliability**: It removes the dependency on the IPFS network, ensuring your Lit Action is always available for execution.

##### Uploading to IPFS

While not generally recommended for most use cases, uploading your Lit Action to IPFS can be beneficial in certain scenarios:

- **Large Code Base**: If your Lit Action is particularly large or complex, storing it on IPFS can help manage the size of your requests to the Lit network.
- **Code Reusability**: If you have a Lit Action that's used across multiple projects or applications, storing it on IPFS allows you to reference it by its Content Identifier (CID) without duplicating the code.
- **Version Control**: IPFS inherently provides a form of version control. Each change to your Lit Action results in a new CID, allowing you to maintain different versions easily.
- **Decentralized Storage**: If your application prioritizes complete decentralization, storing your Lit Action on IPFS aligns with this philosophy.

## Providing a Code String

This method is the more straightforward of the two, as we're simply providing our Lit Action code as a string when using one of the Lit SDK methods such as [executeJs](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/types_src.ILitNodeClient.html#executeJs).

:::note
Most of the code in the full implementation is boilerplate code used to connect to a Lit network and generate Session Signatures. If you don't understand all of the code, or want to learn more about it, you can go [here](../../connecting-to-a-lit-network/connecting.md) to learn about connecting to a network, and [here](../authentication/session-sigs/intro.md) to learn more about generating Session Signatures.
:::

<details>
<summary>Click here for full code implementation</summary>
<p>

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitAbility,
  LitActionResource,
} from "@lit-protocol/auth-helpers";

const ethersSigner = new ethers.Wallet(
    process.env.ETHEREUM_PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.DatilDev,
    debug: false,
});
await litNodeClient.connect();

const sessionSigs = await litNodeClient.getSessionSigs({
    chain: "ethereum",
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
    resourceAbilityRequests: [
        {
            resource: new LitActionResource("*"),
            ability: LitAbility.LitActionExecution,
        },
    ],
    authNeededCallback: async ({
        resourceAbilityRequests,
        expiration,
        uri,
    }) => {
        const toSign = await createSiweMessageWithRecaps({
            uri: uri!,
            expiration: expiration!,
            resources: resourceAbilityRequests!,
            walletAddress: ethersSigner.address,
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient,
        });

        return await generateAuthSig({
            signer: ethersSigner,
            toSign,
        });
    },
});

const litActionCode = `
(async () => {
  console.log("This is my Lit Action!");
})();
`;

await litNodeClient.executeJs({
    sessionSigs,
    code: litActionCode,
});
```

</p>
</details>

For this guide we'll focus on the very last couple of lines from the above full implementation:

```ts
const litActionCode = `
(async () => {
  console.log("This is my Lit Action!");
})();
`;

await litNodeClient.executeJs({
    sessionSigs,
    code: litActionCode,
});
```

First we're declaring our Lit Action as a [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), i.e. a function that executes itself. This Lit Action is simple logging a string to the console, so you'd replace the `console.log` with your custom code.

Next we're calling the `executeJs` method to create a request to the Lit network to execute our Lit Action. We provide our `litActionCode` string as the `code` parameter, and when the Lit network receives our request, our `string` will be parsed and executed on each Lit node.

## Uploading to IPFS
