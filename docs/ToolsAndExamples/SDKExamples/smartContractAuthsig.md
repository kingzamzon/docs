---
sidebar_position: 5
---

# Smart Contract Authsig (EIP1271)

Currently on EOA can interface with Lit via [Authsig](/SDK/Explanation/WalletSigs/authSig) & smart contracts can't since they don't have a private key. This tutotial is for generating an Authsig for smart contracts using [EIP1271](https://eips.ethereum.org/EIPS/eip-1271) which is a standard way to verify a signature when the account is a smart contract.

## How to structure the Authsig

The format of the Authsig remains the same: https://lit-protocol.github.io/lit-js-sdk/api_docs_html/#authsig. 

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

## How it works

The Lit nodes call the `isValidSignature(bytes32 _hash, bytes memory _signature)` function for the contract at the `authSig.address` on the chain passed in the function. Where `bytes32 _hash` is the bytes32 representation of the `authSig.signedMessage` & `authSig.sig` is passed as the `bytes _signature` arguement. And validates the authSig based on the returned result of the contract's `isValidSignature` function.

Please read the [EIP1271](https://eips.ethereum.org/EIPS/eip-1271) to understand more about the `isValidSignature` function.