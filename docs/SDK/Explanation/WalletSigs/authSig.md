---
sidebar_position: 1
---

# Wallet Signatures

## AuthSigs

To use Lit Protocol, you must present a wallet signature obtained from the user. This is refered to an as `AuthSig` in the documentation. You can use any EIP 4361 compliant signature (Sign in with Ethereum) for the authSig, but you must put the signature into the AuthSig data structure format (documented here https://lit-protocol.github.io/lit-js-sdk/api_docs_html/#authsig). You do not need to use the Lit JS SDK to obtain the signature as long as it's EIP 4361 compliant and in the AuthSig data structure format.

## Format of AuthSig

The AuthSig should match this format: https://lit-protocol.github.io/lit-js-sdk/api_docs_html/#authsig

An example AuthSig:

```js
{
	"sig": "0x18720b54cf0d29d618a90793d5e76f4838f04b559b02f1f01568d8e81c26ae9536e11bb90ad311b79a5bc56149b14103038e5e03fee83931a146d93d150eb0f61c",
	"derivedVia": "web3.eth.personal.sign",
	"signedMessage": "localhost wants you to sign in with your Ethereum account:\n0x1cD4147AF045AdCADe6eAC4883b9310FD286d95a\n\nThis is a test statement.  You can put anything you want here.\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: gzdlw7mR57zMcGFzz\nIssued At: 2022-04-15T22:58:44.754Z",
	"address": "0x1cD4147AF045AdCADe6eAC4883b9310FD286d95a"
}
```

## Obtaining the AuthSig

You can use the built in `checkAndSignAuthMessage()` function to obtain the authSig. For example:

```js
var authSig = await LitJsSdk.checkAndSignAuthMessage({
  chain: "ethereum",
});
```

This will trigger a wallet selection popup on the user's browser. The user will be asked to sign a message proving they own their crypto address. The message will be signed with their crypto address. The signature will be returned to you as the `authSig` variable. You will need to pass this to the Lit Protocol API.

This function will save the AuthSig to local storage so that the user does not need to sign the message again. However, the user may be asked to sign it again if the signature has expired or is too old.

This function will also check the currently selected chain in the user's wallet, and if their wallet supports it, sends a request to their wallet to change to the chain passed into the `checkAndSignAuthMessage()` function. This is to ensure that the user is using the correct chain.

## Clearing the stored AuthSig

If you want to clear the authSig stored in the browser local storage, you can use the `disconnectWeb3()` function:

```js
LitJsSdk.disconnectWeb3();
```
