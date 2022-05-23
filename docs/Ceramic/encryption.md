---
sidebar_position: 3
---

# Encrypting

First the string will need to be encrypted using the Lit Ceramic SDK.

Set access control conditions, in this example the access is for any wallet that holds a minimum of 0.000001 ETH.

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

```
const stringToEncrypt = 'This is what we want to encrypt on Lit and then store on ceramic'
const response = litCeramicIntegration
   .encryptAndWrite(stringToEncrypt, accessControlConditions)
   .then((streamID) => console.log(streamID))
```

This uses an example streamID and prints the secret value to the console.

Save the streamID, you'll need it to decrypt the message.

