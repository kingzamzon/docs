---
sidebar_position: 3
---

# Decrypting

In order to decrypt the string, we need the encryptedSymmetricKey and the encryptedString. Within your Lit class, include this decrypt function.

```
  async decrypt(encryptedString: string, encryptedSymmetricKey: string) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
      const symmetricKey = await this.litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encryptedSymmetricKey,
        chain,
        authSig
      })

      const decryptedString = await LitJsSdk.decryptString(
        new Blob([encryptedString]),
        symmetricKey
      );
  
    return { decryptedString }
  }
```


