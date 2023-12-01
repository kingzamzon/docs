# Mainnet

## Overview

:::note
**STATE OF THE NETWORK**

Lit V0, the mainnet beta (AKA 'Habanero'), is set to launch on Friday, December 1st. Habanero will be the latest version of the Lit Network that will support [ID encrypt](../../sdk/access-control/encryption.md), [programmable wallets](../../sdk/wallets/intro.md), and [serverless signing](../../sdk/serverless-signing/overview.md). 

The initial DKG will be conducted with subsequent DKGs to follow until the network is stable. This means that the initial keys that are generated on Habanero **MAY BE DELETED**. As such, please do not use Habanero to store real assets until stability has been confirmed. Please monitor this page for changes or join the [Lit Builders Circle](https://t.me/+aa73FAF9Vp82ZjJh) for status updates.
:::

Main networks should be used by applications that are currently live in production, designed to store live assets. Mainnet keys are persistent and will not be deleted. 

You can set your Lit Network in the [LitNodeClient config of the Lit SDK](../../sdk/installation.md), by passing the network name to the `litNetwork` parameter.


| Name | Description | Supported Algorithms | Supported Features | Status | SDK Version | Deprecation timeline | Contracts |
| ---- | ----------- | -------------------- | ------------------ | ------ | ----------- | -------------------- | --------------- |
| Jalapeno | Centralized alpha network. Persistent, keys will not be deleted. | BLS | Encryption | [Live](https://jalapeno-status.litprotocol.com/) | V1, V2 | None | n/a |
| Habanero | Decentralized mainnet beta. Persistent, keys will not be deleted. | BLS, ECDSA | Encryption, Programmable Wallets (PKPs), Serverless Signing (Lit Actions) | Coming Soon | V3 | TBD | [habanero](https://github.com/LIT-Protocol/networks/tree/main/habanero) | 

## Token Usage
If you'd like to use Habanero, you'll need some 'testLIT' tokens to pay for network fees and [gas](../rollup.mdx). Habanero uses a test token for payments and gas that holds no real world value. You can acquire some tokens from the verified [faucet](https://faucet.litprotocol.com/). (NOTE: you can use Habanero without test tokens, but your usage will be rate limited to 5 requests per day).

## Migration
In order to connect to the Habanero network (the mainnet beta), you'll need to ensure your application is compatible with the V3 version of the Lit SDK. This means if you were previously building on Jalapeno or Serrano using the V2 SDK, you'll need to update your app to use V3. 

Upgrading to V3 can be done by following the [migration guide](../../migration/overview.md), or checking out the related [blog post](https://spark.litprotocol.com/cayenne-network-release-lit-js-sdk-v3/) on Spark.

If your app currently has users in production (on the V1 or V2 SDK), we recommend upgrading internally while keeping users on the current branch until after Habanero is live and fully functional. Once you've upgraded to V3 and Habanero is stable, you’ll just need to perform the necessary migration tasks dependent on the Lit tooling that you’re using:
- If you’re using Lit for encryption (AKA decentralized access control): Perform re-encryption with Habanero keys.
- If you’re building with PKPs (AKA programmable wallets): Re-mint PKPs on Habanero with the same auth methods. Docs will be provided soon.