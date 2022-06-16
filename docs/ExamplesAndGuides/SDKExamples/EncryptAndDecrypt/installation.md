---
sidebar_position: 1
---

# Installation

You can use Lit to encrypt and store any static content. This could be a file, a string, or anything that won't change. You have to store the content and metadata yourself (on IPFS, Arweave, or even somewhere centralized), but Lit will store who is allowed to decrypt it and enforce this (aka key management).

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
