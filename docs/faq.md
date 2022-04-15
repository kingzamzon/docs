---
sidebar_position: 14
---

# FAQ

## Does the SDK work with Typescript?

Yes, although types are not yet available, you can still import the SDK for your project. If the error ‘Cannot find module 'lit-js-sdk' or its corresponding type declarations’ appears on your IDE, create a .d.ts file that has ‘declare module 'lit-js-sdk’’ in it. If you'd like to see an example of a typescript project that imports the lit-js-sdk, check out the [Ceramic Integration](https://github.com/LIT-Protocol/CeramicIntegration).

## Why do I need to call saveSigningCondition() before getSignedToken()? Shouldn’t the former just return a JWT?

The reason behind this separation is that saveSigningCondition() is a function that an admin/developer of a website will most likely call only once to set up the token-gating mechanism. The function getSignedToken() can then be called for every website visitor. You can view this as a 1-to-many relationship.

## Can I deploy my signing condition without including it in my codebase?

Yes, by accessing the dev console on https://litgateway.com/ (right click, choose “inspect”, go to console tab), you can access the globally exposed LitJsSdk and paste your saveSigningCondition() code. This will automatically publish your resourceId to Lit nodes.

## If I call saveSigningCondition() twice with the exact same conditions, do two copies get created and stored by nodes?

If the resourceId is exactly the same, the nodes will not hold a second copy. However, to deploy iterations of the resourceID, the “extraData” field is available to provide versioning (e.g., "extraData": "v2”). Any change in the resourceId object will create a new unique resourceId for the nodes to store.

## If I already have a connect/sign mechanism in place, can I just create my own authSig object and pass it to saveSigningCondition() instead of using checkAndSignAuthMessage()?

Yes, you most certainly can. The following link provides an example of how this can be done: https://github.com/LIT-Protocol/hotwallet-signing-example/blob/main/sign.js. You MUST use an EIP 4361 compliant signature (aka Sign in with Ethereum)

## Can more than one condition be added for access control?

Yes! See https://developer.litprotocol.com/docs/AccessControlConditions/booleanLogic for examples.

## Can I delete or edit a published resourceId?

No, you cannot. If the condition was saved with `"permanent": false` then you can edit the condition associated with the resourceId, but you cannot ever edit the resourceId itself. If you wanted to edit a resourceId, you could create a new one with the same conditions, and as long as the old condition was stored with `"permanent": false` then you could remove all the conditions and make that old resourceId impossible to use.

## I have a question that isn't answered here. Where can I get help?

Join our discord: https://litgateway.com/discord
