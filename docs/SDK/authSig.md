---
sidebar_position: 6
---

# Wallet Signatures

To use Lit Protocol, you must present a wallet signature obtained from the user. This is refered to an as `AuthSig` in the documentation.

## Obtaining the authSig

You can use the built in `checkAndSignAuthMessage()` function to obtain the authSig. For example:

```
var authSig = await LitJsSdk.checkAndSignAuthMessage({
  chain: "ethereum",
});
```

This will trigger a wallet selection popup on the user's browser. The user will be asked to sign a message proving they own their crypto address. The message will be signed with their crypto address. The signature will be returned to you as the `authSig` variable. You will need to pass this to the Lit Protocol API.

This function will save the AuthSig to local storage so that the user does not need to sign the message again. However, the user may be asked to sign it again if the signature has expired or is too old.

This function will also check the currently selected chain in the user's wallet, and if their wallet supports it, sends a request to their wallet to change to the chain passed into the `checkAndSignAuthMessage()` function. This is to ensure that the user is using the correct chain.

## Clearing the stored authSig

If you want to clear the authSig stored in the browser local storage, you can use the `disconnectWeb3()` function:

```
LitJsSdk.disconnectWeb3()
```

## EIP 4361

We currently don't use EIP 4361 but are going to replace our signature system with one based on EIP4361 soon.
