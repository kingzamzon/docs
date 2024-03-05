---
sidebar_position: 4
---

# Paying For Usage 

:::info
Currently Rate Limiting is only enabled on `Habanero` and `Manzano`.
See [here](../network/networks/testnet) for a list of test networks.
See [here](../network/networks/mainnet) for a list of mainnet networks.
:::

# Overview

In order to use Lit, you must reserve capacity on the network. This can be done using capacity credits, which allow holders to reserve a configurable number of requests (measured in requests per day) over a fixed length of time (i.e. one week).

# **Capacity Credits**

In order to send transactions on Lit, you must first authenticate with the [Lit nodes](../sdk/authentication/overview). This can be done using one of two ways:

1. [Session signatures](../sdk/authentication/session-sigs/intro): signatures scoped to specific capabilities or resources, designed to be ephemeral and limited in scope. (RECOMMENDED)
2. [Auth sigs](../sdk/authentication/auth-sig): a signature obtained from a user proving they own a particular key (NOT RECOMMENDED)

Every time you authenticate with Lit, the request context (i.e. wallet address, owned capacity credits, etc) is extracted and validated against the Rate Limiting Module to ensure capacity has not been breached. In order to increase your rate limit, you'll need to mint a `Capacity Credits NFT` on Chronicle - Lit's custom EVM rollup testnet. To do so, you can either use:
1. The [Lit  Explorer](https://explorer.litprotocol.com/get-credits) or,
2. Our `contracts-sdk`.

A `Capacity Credits NFT` can be very easily minted from the Lit Explorer. So, here we will show how you can mint it using `contracts-sdk`. You can download the `contracts-sdk` from `npm` [here](https://www.npmjs.com/package/@lit-protocol/contracts-sdk).

You’ll also need some 'testLPX' tokens for minting. These are test tokens that hold no real value and should only be used to pay for usage on Habanero. `testLPX` should only be claimed from the verified faucet, linked [here](https://faucet.litprotocol.com/).

For minting a Capacity Credits NFT see example docs for using our contract-sdk [here](../sdk/capacity-credits#minting-capacity-credits).

### **Delegating Capacity — Paying for Your Users’ Requests**
You can also delegate your capacity credits to other users. For example, Alice owns a Capacity Credit NFT and wants to let Bob use it, but only for a specific Lit Actions or another resource or set of resources that she owns.

Alice can create a session capability object that specifies the ability to Authenticate with an Capacity Credits NFT as well as request for Threshold Execution, for example, against a particular Lit Action IPFS CID(s). Alice then signs and issues these capabilities to Bob.

Alice can generate an `AuthSig` by delegating equal rights to Bob's session keys, and attaching the capabilities granted to him by Alice as a proof in the session object. Bob can subsequently generate a `SessionSig` that requests for Alice's Capacity Credits NFT, specifying the Lit Action IPFS CID in the `resourceAbilityRequests` field.


### **Best Practices**

- **Capacity Management**: Keep an eye on your usage limit and expiration date.
- **Understanding Limits**: Be aware that there are no free requests on `Habanero` mainnet. On `Manzano` testnet, free tier rate limit is set to three free requests per day. You can use Capacity credits to reserve more usage on these networks.
- **Delegation**: You can create restrictions on your delegations to ensure that your users don't take your `capacityDelegationAuthSig` and use it for other apps.
