---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Working with Lit Actions

To create a Lit Action, you need to write some Javascript code that will accomplish your goals. The Lit Protocol provides JS function bindings to do things like request a signature or a decryption.

You'll also need some client side JS to collect the responses from the Lit Nodes and combine them above the threshold into a signature or decrypted data.

## Hello World

First, install the Lit JS SDK `serrano` tag:

```
yarn add lit-js-sdk@serrano
```

Then, write some Javascript code that will request a signature from the Lit Nodes. This Lit Action will sign the string "Hello World" with the shared testnet ECDSA key and return the signature.

The JS below will be run by every node in the network in parallel.

```js
const go = async () => {
  // this is the string "Hello World" for testing
  const toSign = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await LitActions.signEcdsa({
    toSign,
    keyId: 1,
    sigName: "sig1",
  });
};

go();
```

You also need some client side JS to send the above JS to the nodes, collect the signature shares, combine them, and print the signature. In the following code, we store the above code into a variable called `litActionCode`. We execute it, obtain the signature, and print it:

<Tabs
defaultValue="browser"
values={[
{label: 'Browser', value: 'browser'},
{label: 'NodeJS', value: 'nodejs'},
]}>
<TabItem value="browser">

```js
import LitJsSdk from "lit-js-sdk";

// this code will be run on the node
const litActionCode = `
const go = async () => {
  // this is the string "Hello World" for testing
  const toSign = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await LitActions.signEcdsa({ toSign, keyId: 1, sigName: "sig1" });
};

go();
`;

const go = async () => {
  // you need an AuthSig to auth with the nodes
  // this will get it from metamask or any browser wallet
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });

  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();
  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
  });
  console.log("signatures: ", signatures);
};

go();
```

</TabItem>
<TabItem value="nodejs">

```js
import LitJsSdk from "lit-js-sdk/build/index.node.js";

// this code will be run on the node
const litActionCode = `
const go = async () => {
  // this is the string "Hello World" for testing
  const toSign = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await LitActions.signEcdsa({ toSign, keyId: 1, sigName: "sig1" });
};

go();
`;

// you need an AuthSig to auth with the nodes
// normally you would obtain an AuthSig by calling LitJsSdk.checkAndSignAuthMessage({chain})
const authSig = {
  sig: "0x2bdede6164f56a601fc17a8a78327d28b54e87cf3fa20373fca1d73b804566736d76efe2dd79a4627870a50e66e1a9050ca333b6f98d9415d8bca424980611ca1c",
  derivedVia: "web3.eth.personal.sign",
  signedMessage:
    "localhost wants you to sign in with your Ethereum account:\n0x9D1a5EC58232A894eBFcB5e466E3075b23101B89\n\nThis is a key for Partiful\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: 1LF00rraLO4f7ZSIt\nIssued At: 2022-06-03T05:59:09.959Z",
  address: "0x9D1a5EC58232A894eBFcB5e466E3075b23101B89",
};

const go = async () => {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();
  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
  });
  console.log("signatures: ", signatures);
};

go();
```

</TabItem>
</Tabs>
