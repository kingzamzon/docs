---
sidebar_position: 1
---

# Encryption & Decryption Intro

This example will show you how to encrypt and decrypt data using Lit Protocol's JS SDK on the client side.



## Import the SDK

Within your Typescript file (for example, `lit.ts`)
```
import LitJsSdk from 'lit-js-sdk'
```

## Instantiating the Lit Client

At the top of your file, instantiate your Lit Node client like so:

```
const client = new LitJsSdk.LitNodeClient()
const chain = 'ethereum'
const standardContractType = 'ERC721'
```

Create a Lit class and set the litNodeClient.

```
class Lit {
  private litNodeClient

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }
}

export default new Lit()
```
