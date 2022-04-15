---
sidebar_position: 4
---

# Encrypting Static Content (images, videos, music, docs, etc)

You can use Lit to encrypt and store any static content. This could be a file, a string, or anything that won't change. You have to store the content and metadata yourself (on IPFS, Arweave, or even somewhere centralized), but Lit will store who is allowed to decrypt it and enforce this (aka key management).

## Encrypting

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

Next, choose the encryption method you want to use:

- If you are encrypting a string, use `encryptString()`. You could also use `zipAndEncryptString()` if you wanted to zip the string before encrypting it (saves space, but takes time to zip)
- If you are encrypting a large file (more than 20mb) then you should use `encryptFile()` because it is fast (a 1gb file only takes 2 seconds to encrypt).
- If you are encrypting a small file (less than 20mb) then you can use `encryptFileAndZipWithMetadata()` which will zip the file, and include all metadata in the zip, so you don't have to store anything else. If you want to store the metadata yourself, manually, you can use `zipAndEncryptFiles()` instead.

Next, use the encryption method you've chosen. In the example, we are using `encryptString()`. All encryption methods will output the encrypted data and a symmetric key, which can be used to decrypt the data.

```
const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
  "this is a secret message"
);
```

Next, define the access control conditions where a user will be allowed to decrypt. In this example, the user must hold 0.00001 ETH.

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

Now, you can save the encryption key with the access control condition, which tells Lit Protocol that users that meet this access control condition should be able to decrypt.

```
const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain,
});

```

You now need to save the `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedString`. You will present the `accessControlConditions` and `encryptedSymmetricKey` to obtain the decrypted symmetric key, which you can then use to decrypt the `encryptedString`.

## Decrypting

If you followed the instructions above for "Encrypting" above then you should follow these instructions to decrypt the data you stored.

Make sure you have `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedString` variables you created when you stored the content, unless you used `encryptFileAndZipWithMetadata()` which will include this metadata in the zip.

There are 2 steps - you must obtain the decrypted symmetric key from Lit Protocol, and then you must decrypt the content using it.

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

Now, decrypt the content. In the example, we used `encryptString()` so we will use `decryptString()` to decrypt. Note that if you used something else to encrypt the content, you will need to use the appropriate decrypt method.

```
const decryptedString = await LitJsSdk.decryptString(
  encryptedString,
  symmetricKey
);
```

Now, your cleartext is located in the `decryptedString` variable.

## Encrypting a file and manually storing the metadata with "encryptFile()"

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

Next, encrypt the content.

```
const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({file});
```

Next, define the access control conditions where a user will be allowed to decrypt. In this example, the user must hold 0.00001 ETH.

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

Now, you can save the encryption key with the access control condition, which tells Lit Protocol that users that meet this access control condition should be able to decrypt.

```
const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain,
});

```

You now need to save the `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedFile`. You will present the `accessControlConditions` and `encryptedSymmetricKey` to obtain the decrypted symmetric key, which you can then use to decrypt the `encryptedFile`.

## Decrypting a file with "decryptFile()"

If you followed the instructions above for "Encrypting a file and manually storing the metadata with encryptFile()" above then you should follow these instructions to decrypt the data you stored.

Make sure you have `accessControlConditions`, `encryptedSymmetricKey`, and the `encryptedFile` variables you created when you stored the content.

There are 2 steps - you must obtain the decrypted symmetric key from Lit Protocol, and then you must decrypt the content using it.

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

Now, decrypt the content. In the example, we used `encryptFile()` so we will use `decryptFile()` to decrypt.

```
const decryptedFile = await LitJsSdk.decryptFile({
  file: encryptedFile,
  symmetricKey: retrievedSymmKey,
});
```

Now, your cleartext file is located in the `decryptedFile` variable.

## Zipping and Encrypting a file with all metadata included with "encryptFileAndZipWithMetadata()"

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

Next, define the access control conditions where a user will be allowed to decrypt. In this example, the user must hold 0.00001 ETH.

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

You must pass a connected LitNodeClient, so let's create that.

```
const litNodeClient = new LitNodeClient();
await litNodeClient.connect();
```

Next, encrypt the content. The "readme" param will not be encrypted and is for any users who stumble across the zip file, and it will be located in the base of the zip as readme.txt.

```
const { zipBlob } = await LitJsSdk.encryptFileAndZipWithMetadata({
  file,
  accessControlConditions,
  authSig,
  chain,
  litNodeClient,
  readme: "this is a test",
});
```

Now, all you need to save is the `zipBlob`.

## Decrypting a zip file with all metadata included with "decryptZipFileWithMetadata()"

If you followed the instructions above for "Zipping and Encrypting a file with all metadata included with encryptFileAndZipWithMetadata()" above then you should follow these instructions to decrypt the data you stored.

First, obtain an authSig from the user. This will ask their metamask to sign a message proving they own their crypto address. Pass the chain you're using.

```
const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})
```

You must pass a connected LitNodeClient, so let's create that.

```
const litNodeClient = new LitNodeClient();
await litNodeClient.connect();
```

Now, decrypt the content. In the example, we used `encryptFileAndZipWithMetadata()` so we will use `decryptZipFileWithMetadata()` to decrypt. Recall that we obtained `zipBlob` from `encryptFileAndZipWithMetadata()`.

```
const { decryptedFile } = await LitJsSdk.decryptZipFileWithMetadata({
  authSig,
  litNodeClient,
  file: zipBlob,
});
```

Now, your cleartext file is located in the `decryptedFile` variable which is an ArrayBuffer.
