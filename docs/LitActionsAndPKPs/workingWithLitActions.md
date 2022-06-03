---
sidebar_position: 3
---

# Working with Lit Actions

To create a Lit Action, you need to write some Javascript code that will accomplish your goals. The Lit Protocol provides JS function bindings to do things like request a signature or a decryption.

You'll also need some client side JS to collect the responses from the Lit Nodes and combine them above the threshold into a signature or decrypted data.

## Hello World

This Lit Action will sign the string "Hello World" with the shared testnet ECDSA key and return the signature.

The JS below will be run by every node in the network.

```js
const go = async () => {
  // this is the string "Hello World" for testing
  const arr = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await Deno.core.opAsync("op_sign_ecdsa", arr);
};

go();
```

You also need some client side JS to send the above JS to the nodes, collect the signature shares, combine them, and print the signature. In the following code, we store the above code into a variable called `litActionCode`. We execute it, obtain the signature, and print it:

```js
import LitJsSdk from "lit-js-sdk";

const litActionCode = `
const go = async () => {
  // this is the string "Hello World" for testing
  const arr = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await Deno.core.opAsync("op_sign_ecdsa", arr);
};

go();
`;

const signature = LitJsSdk.executeJs({ code: litActionCode, sigType: "ecdsa" });
console.log("signature: ", signature);
```
