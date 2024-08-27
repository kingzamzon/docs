import FeedbackComponent from "@site/src/pages/feedback.md";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Signing within a Lit Action

## Overview

When [signing a transaction](../serverless-signing/quick-start#sign-a-transaction.md) with Lit, signature shares are typically combined client-side. However, the `signAndCombineEcdsa` function allows you to combine signature shares directly within a Lit Action, which is useful for when you want to make use of the signed data within your Lit Action e.g. submitting a signed transaction. The signature shares will remain within the confines of each Lit node's [Trusted Execution Environment (TEE)](../../resources/how-it-works#1-lit-nodes.md) without ever being exposed to the outside world. 

When you call the `signAndCombineEcdsa` function, signature shares are collected from each Lit node before being combined on a *single* node. The following code example will show how you can use this functionality for signing a blockchain transaction using ethers.js.

## Prerequisites

- Knowlege of [SessionSigs](../authentication/session-sigs/intro)
- Basic understanding of [Lit Actions](../serverless-signing/quick-start)

## Complete Code Example

The complete code example is available in the [Lit Developer Guides Code Repository](https://github.com/LIT-Protocol/developer-guides-code/tree/master/sign-and-combine-ecdsa/nodejs). There you can find a Node.js implementation of the code.

### Example Lit Action

The following Lit Action uses `signAndCombineEcdsa` to combine the signatures created by each share signing the `toSign` variable, which is the provided hash of a serialized transaction. We then serialize the transaction and sign it using `ethers.js`.

```jsx
const litActionCode = `
(async () => {
  const signature = await Lit.Actions.signAndCombineEcdsa({
    toSign,
    publicKey,
    sigName,
  });

  const jsonSignature = JSON.parse(signature);
  jsonSignature.r = "0x" + jsonSignature.r.substring(2);
  jsonSignature.s = "0x" + jsonSignature.s;
  const hexSignature = ethers.utils.joinSignature(jsonSignature);

  const signedTx = ethers.utils.serializeTransaction(
    unsignedTransaction,
    hexSignature
  );

  const recoveredAddress = ethers.utils.recoverAddress(toSign, hexSignature);
  console.log("Recovered Address:", recoveredAddress);

  const response = await Lit.Actions.runOnce(
    { waitForResponse: true, name: "txnSender" },
    async () => {
      try {
        const rpcUrl = await Lit.Actions.getRpcUrl({ chain });
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const transactionReceipt = await provider.sendTransaction(signedTx);

        return `Transaction Sent Successfully. Transaction Hash: ${transactionReceipt.hash}`;
      } catch (error) {
        return `Error: When sending transaction: ${error.message}`;
      }
    }
  );

  Lit.Actions.setResponse({ response });
})();
`
```

## Summary
This guide demonstrates how to combine PKP signature shares, and how to used the combined shares to sign a message or transaction within a Lit Action.

If you'd like to learn more about Lit Actions, check out the [Lit Actions SDK](https://actions-docs.litprotocol.com/), or our [Advanced Topics](https://developer.litprotocol.com/category/advanced-topics-1) section on Lit Actions.

<FeedbackComponent/>
