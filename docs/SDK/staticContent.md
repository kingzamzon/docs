---
sidebar_position: 4
---

# Static Content (images, videos, music, docs, etc)

## Storing any static content and manually storing the metadata

You can use Lit to encrypt and store any static content. You have to store the content yourself (on IPFS, Arweave, or even somewhere centralized), but Lit will store who is allowed to decrypt it and enforce this.

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

Next, pass the thing you want to encrypt. To encrypt a string, use the code below. The SDK also supports zipping and encrypting files via the `zipAndEncryptFiles` function.

```
const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
  "this is a secret message"
);
```

Next, define the access control conditions where a user will be allowed to decrypt.

```
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: 'ethereum',
    method: 'eth_getBalance',
    parameters: [
      ':userAddress',
      'latest'
    ],
    returnValueTest: {
      comparator: '>=',
      value: '10000000000000'
    }
  }
]
```

Now, you can save the encryption key with the access control condition, which tells the Lit protocol that users that meet this access control condition should be able to decrypt.

```
const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain,
});

```

You now need to save the `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedString`. You will present the `accessControlConditions` and `encryptedSymmetricKey` to obtain the decrypted symmetric key, which you can then use to decrypt the `encryptedString`.

## Decrypting any static content

If you followed the instructions above for "Storing any static content and manually storing the metadata" above then you should follow these instructions to decrypt the data you stored.

Make sure you have `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedString` variables you created when you stored the content.

There are 2 steps - you must obtain the decrypted symmetric key from the Lit protocol, and then you must decrypt the string using it.

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

To obtain the decrypted symmetric key, use the code below:

```
const symmetricKey = await window.litNodeClient.getEncryptionKey({
  accessControlConditions,
  // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
  toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
  chain,
  authSig
})
```

Now, decrypt the string:

```
const decryptedString = await LitJsSdk.decryptString(
  encryptedString,
  symmetricKey
);
```

Now, your cleartext is located in the `decryptedString` variable.

## Minting HTML NFTs

HTML NFTs are essentially super-powered NFTs. To mint an HTML NFT, you should mint (or already own) any ERC721 or ERC1155 NFT that will serve as the access control token for unlocking the NFT. In the past, we called HTML NFTs "LITs" (Locked Interactive Tokens) so if you see a reference in docs or code to "a LIT" that is referring to an HTML NFT.

We provide pre-deployed ERC1155 NFT contracts on Polygon and Ethereum for your use. Usage of these contracts is optional, and you may supply your own if desired. You can find the addresses of these contracts here: https://github.com/LIT-Protocol/lit-js-sdk/blob/main/src/lib/constants.js#L74

To mint a token using our pre-deployed contracts, you can use the mintLIT function documented here: https://lit-protocol.github.io/lit-js-sdk/api_docs_html/index.html#mintlit

For example:

```
const { tokenId, tokenAddress, mintingAddress, txHash, errorCode, authSig } = await LitJsSdk.mintLIT({ chain, quantity })
```

Once your have your NFT, you can lock and associate content with it on the LIT network. In our implementation in MintLIT, we render the locked content as an HTML string, embedding any media such as pictures or videos as data urls. You can do this, or you can encrypt files directly without rendering them into a HTML string. To encrypt a string, use the following function documented here: https://lit-protocol.github.io/lit-js-sdk/api_docs_html/index.html#zipandencryptstring

```
const { symmetricKey, encryptedZip } = await LitJsSdk.zipAndEncryptString(lockedFileMediaGridHtml)
```

Now you need to encrypt the symmetric key, and save it to the LIT nodes. `litNodeClient` should be an instance of LitNodeClient that has connected to the network via the connect function.

You must also define your access control conditions (the conditions under which someone can decrypt the content). In the example below, we define a condition that requires the user holds at least 1 ERC1155 token with Token ID 9541 from the 0x3110c39b428221012934A7F617913b095BC1078C contract.

```
const accessControlConditions = [
  {
    contractAddress: '0x3110c39b428221012934A7F617913b095BC1078C',
    standardContractType: 'ERC1155',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress',
      '9541'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]

const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain
})
```

We then pass that encrypted content to a function that creates an HTML webpage with an embedded unlock button.

```
const htmlString = LitJsSdk.createHtmlLIT({
    title,
    htmlBody,
    css,
    accessControlConditions,
    encryptedSymmetricKey,
    chain,
    encryptedZipDataUrl: await LitJsSdk.fileToDataUrl(encryptedZip)
  })
```

You'll need to store your HTML NFT somewhere, and we use IPFS via Pinata for this purpose.

```
const litHtmlBlob = new Blob(
  [htmlString],
  { type: 'text/html' }
)
const formData = new FormData()
formData.append('file', litHtmlBlob)

const uploadRespBody = await new Promise((resolve, reject) => {
  fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${PINATA_API_KEY}`
    },
    body: formData
  }).then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
})
const ipfsCid = uploadRespBody.IpfsHash
const fileUrl = `https://ipfs.io/ipfs/${ipfsCid}`
```

Your HTML NFT is now accessible at the fileUrl variable.

Finally, you should store your token metadata somewhere, so that your HTML NFT is backwards compatible with existing NFT websites. We use Firebase for this on MintLIT and if you are using our NFT contracts, you are welcome to use our Firebase instance to store your metadata as well. You can find this createTokenMetadata function in this repo: https://github.com/LIT-Protocol/MintLIT

```
await createTokenMetadata({
  chain,
  tokenAddress,
  tokenId,
  title,
  description,
  socialMediaUrl,
  quantity,
  mintingAddress,
  fileUrl,
  ipfsCid,
  txHash
})
```

Now, you can send the NFT that corresponds to this HTML NFT to anyone, and they can use the website at fileUrl to unlock and decrypt the content inside it.

## Unlocking HTML NFTs

To unlock a HTML NFT, you must retrieve the encryption key shares from the nodes. This SDK provides a convenience function to do this for you called `toggleLock`. It will pull down the encryption key shares and combine them into the encryption key itself, and decrypt content located at `window.encryptedZipDataUrl`, and then load the content into a div with id `mediaGridHolder`. You may use `toggleLock` or implement parts of it yourself if you have further customizations. Here's how it works:

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own the crypto address that presumably owns the NFT. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'polygon'})
```

Next, obtain the symmetric key from the LIT network. It's important that you have a connected LitNodeClient accessible at window.litNodeClient for this to work.

```
const symmetricKey = await window.litNodeClient.getEncryptionKey({
  accessControlConditions: window.accessControlConditions,
  toDecrypt: window.encryptedSymmetricKey,
  authSig,
  chain: window.chain
})
```

Finally, decrypt the content and inject it into the webpage. We provide a convenience function to unlock the LIT once you have the symmetric encryption key that does the same thing as the code below, located here: https://lit-protocol.github.io/lit-js-sdk/api_docs_html/index.html#unlocklitwithkey

```
// convert data url to blob
const encryptedZipBlob = await (await fetch(window.encryptedZipDataUrl)).blob()
// decrypt the zip
const decryptedFiles = await LitJsSdk.decryptZip(encryptedZipBlob, symmetricKey)
// pull out the data url that contains the now-decrypted HTML
const mediaGridHtmlBody = await decryptedFiles['string.txt'].async('text')
// load the content into a div so the user can see it
document.getElementById('mediaGridHolder').innerHTML = mediaGridHtmlBody
```

## Static Content Examples

### Minting HTML NFTs

An example that showcases the ability to mint an HTML NFT with locked content that only the NFT owner can decrypt or see.

https://github.com/LIT-Protocol/MintLIT
