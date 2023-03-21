---
sidebar_position: 1
---

# Wallet Signatures

## AuthSigs

To use Lit Protocol, you must present a wallet signature obtained from the user. This is refered to an as `AuthSig` in the documentation. You can use any EIP 4361 compliant signature (Sign in with Ethereum) for the authSig, but you must put the signature into the AuthSig data structure format (documented [here](https://js-sdk.litprotocol.com/interfaces/types_src.JsonAuthSig.html)). You do not need to use the Lit JS SDK V2 to obtain the signature as long as it's EIP 4361 compliant and in the AuthSig data structure format.

## Format of AuthSig

The AuthSig should match [this format](https://js-sdk.litprotocol.com/interfaces/types_src.JsonAuthSig.html).

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

## Account Abstraction EIP1271 signatures

:::note

Currently works only on the `serrano` litNetwork. Coming soon on the `jalapeno` litNetwork.

:::


Currently, Externally-owned accounts (EOA) can interface with Lit via an [**authSig**](/SDK/Explanation/WalletSigs/authSig). With this paradigm, a private key is needed to sign an authSig. Smart contracts generally can not produce an authSig since they don't have a private key. However, this tutorial will show you how to generate an authSig for smart contracts using [EIP1271](https://eips.ethereum.org/EIPS/eip-1271). EIP-1271 is a standard to verify a signature when the account is a smart contract.


### How to structure the AuthSig

The format of the authSig remains the same as noted in the [API docs](https://js-sdk.litprotocol.com/interfaces/types_src.JsonAuthSig.html). 

* **sig** is the actual hex-encoded signature.
* **derivedVia** should be "EIP1271" to tell the nodes that the authSig is for smart contracts
* **signedMessage** is any string that you want to pass to the `isValidSignature(bytes32 _hash, bytes memory _signature)` as its 1st arguement. It will be converted to bytes32 before calling the smart contract function
* **address** of the smart contract you want to present the authSig for. Note that it should implement the `isValidSignature(bytes32 _hash, bytes memory _signature)` function.

For example:

```js
{
	"sig": "0x18720b54cf0d29d618a90793d5e76f4838f04b559b02f1f01568d8e81c26ae9536e11bb90ad311b79a5bc56149b14103038e5e03fee83931a146d93d150eb0f61c",
	"derivedVia": "EIP1271",
	"signedMessage": "_hash message",
	"address": "0x6FdF5aD7f256D9677eC1d6B7e633Ff1E7FA5Ac14"
}
```

Now you can use the above authSig object in the Lit functions just as an any other authSig.

```js
const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain
})
```

### How it works

The Lit nodes call the `isValidSignature(bytes32 _hash, bytes memory _signature)` function for the contract at the `authSig.address`. Where `bytes32 _hash` is the bytes32 representation of the `authSig.signedMessage` and `authSig.sig` is passed as the `bytes _signature` argument. The authSig is validated based on the returned result of the contract's `isValidSignature` function.

Please read the [EIP1271](https://eips.ethereum.org/EIPS/eip-1271) docs to understand the `isValidSignature` function.

### See it in action!

Below is the complete [**React** project](https://replit.com/@lit/Smart-Contract-Authsig-EIP1271#smart-contract-authsig/src/App.js).

<iframe frameborder="0" width="100%" height="500px" className="repls" style={{display: "none"}} src="https://replit.com/@lit/Smart-Contract-Authsig-EIP1271#smart-contract-authsig/src/App.js"></iframe>

## Clearing the stored AuthSig

If you want to clear the authSig stored in the browser local storage, you can use the `disconnectWeb3()` function:

```js
LitJsSdk.disconnectWeb3();
```
