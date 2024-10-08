# Using a Sign-in With Solana Message

This guide covers generating Session Signatures by authenticating a Sign-in With Solana (SIWS) message, and checking if the derived Solana public key is authorized to sign using a specific PKP. In order to do this, we make use of Lit Actions, Phantom's [SIWS specification](https://github.com/phantom/sign-in-with-solana/tree/main), and a PKP.

## Prerequisites

Before continuing with this guide, make sure you have an understanding of the following:

- What [Session Signatures](./intro.md) are and how they're used in the Lit Protocol
- Phantom's [SIWS specification](https://github.com/phantom/sign-in-with-solana/tree/main)
- What [Lit Actions](../../../sdk/serverless-signing/overview) are
- [Programmable Key Pairs (PKPs)](../../../user-wallets/pkps/overview) and how they are used to sign data
- [Authentication Methods](../../../user-wallets/pkps/advanced-topics/auth-methods/overview.md) and how they work

## High Level 

Sign-in With Solana (SIWS) allows users to authenticate with applications by signing a standardized message using their Solana wallet. This signed message can then be verified by the app to authenticate the user securely.

The following diagram depicts the flow of authenticating SIWS messages using Lit Actions:
