---
sidebar_position: 2
---

# Encrypting

In this example, we use the accessControlConditions from previous examples of allowing access if a wallet has at least 0.000001 ETH:
```
const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '1000000000000',  // 0.000001 ETH
      },
    },
  ]
```

Within your Lit class, create an encrypt function that takes in a message. 

```
async encrypt(message: string) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message)

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    })

    return {
      encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString('hex'),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
  }
```