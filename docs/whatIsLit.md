---
sidebar_position: 2
---

# What is the Lit Protocol?

The LIT Protocol is a decentralized access control protocol running on top of Ethereum and other EVM chains. With LIT, you can harness on-chain access control conditions to do 4 main things:

- Encrypt and lock static content (images, videos, music, etc) behind an on chain condition (for example, posession of an NFT)
- Decrypt static content that was locked behind an on chain condition
- Authorize network signatures that provide access to dynamic content (for example, a server or network resource) behind an on chain condition
- Request a network signed JWT that provisions access and authorization to dynamic content behind an on chain condition.

With this functionality, the LIT protocol enables the creation of locked NFTs that can only be unlocked by owners of that NFT. It also enables provisioning access to a given server or network resource only to NFT owners. Rather than a simple JPEG, LIT NFTs can be HTML/JS/CSS web pages that can be interactive and dynamic.

## Features

- Supports many EVM chains. Full list here: https://github.com/LIT-Protocol/lit-js-sdk/blob/main/src/lib/constants.js#L14
- Supports many standard contracts, with plans to support any RPC call soon. If you need to interact with a contract that we don't support yet, ask us, and we will implement it
- Boolean conditions. "And" or "Or" are currently supported.
- Updateable conditions. Only the creator can update the condition.
- Permanant conditions. When a condition is stored as permanant, it becomes impossible to update it, forever.

## State of the network today - AlphaNet

Right now, the LIT Protocol is in an alpha state (the "AlphaNet") and the creators are running all the nodes. It is unaudited and the nodes are not distributed yet. There are various security improvements to be made, and cryptoeconomic guarantees as a result of staking are not in place yet. Data is persistent and we plan to support this network in perpetuity. We are in the active process of decentralizing and working towards a Mainnet release.
