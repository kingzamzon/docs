---
sidebar_position: 4
---

# Using PKPs with Lit Actions

## Introduction 

As a distributed key management network, Lit provides developers with the ability to add programmable signing to their applications and wallets. These distributed wallets are known as Programmable Key Pairs (PKP) and the application logic that dictates when and why that key-pair will sign is known as a Lit Action.

## How do Lit Actions and PKPs work together?

A user can [create a new PKP](../pkp/minting) and grant a Lit Action the right to sign using it. This means the distributed key has the ability to sign and decrypt arbitrary data based on pre-defined logic and conditions.

### Using Mint/Grant/Burn

Mint/Grant/Burn is an optional pattern that allows you to prove that a PKP was not used to sign anything before it was approved to use a Lit Action.

Suppose you have a Lit Action that will check if a number is prime, and if it is, sign that number. If it is not prime, the Lit Action will abort. If you were able to mint a PKP, assign it to that Lit Action, and then burn the PKP in a single atomic transaction, then it would be provable that the PKP was not used to sign anything before it was approved to use the Lit Action. In this case, you could trust that any numbers signed with that PKP are indeed prime, without needing to check them yourself. This creates a powerful way to prove the output of any JS code by checking that 1) the signature is valid, 2) the lit action code is correct, and 3) that the PKP was minted using this Mint/Grant/Burn pattern.

The function to do this is called Mint/Grant/Burn. You mint the PKP, grant access for a Lit Action to use it, and then burn the PKP in a single transaction. Burning the PKP destroys the ability to grant access for a Lit Action to use it, so you know that no other Lit Action can ever use that PKP.
You can see the definition of a MintGrantBurn fuction in the contract source code [here](https://github.com/LIT-Protocol/LitNodeContracts/blob/main/contracts/PKPNFT.sol#L157)

## Why is this useful?

A programmable distributed key is a primitive with a number of potential use-cases. For example, using a PKP and Lit Actions for [onboarding web2 users](https://spark.litprotocol.com/wallet-abstraction-with-google-oauth/) to wallets based on modern multi-factor authentication and without relying on a central authority or key custodian.

Additionally, Lit Actions + PKPs + web3 storage can be a replacement for a traditional web2 backend. Imagine a web3 Twitter clone that stores the data on Ceramic. You could create a PKP that owns a Ceramic stream, and then grant access to sign with that PKP to a group of Lit Actions for things like createPost() and likePost(). Your Lit Actions can work just like a web2 backend, with business logic to ensure that only correct data is written to your Ceramic Stream. For example, the likePost() function could check that a user has not already liked a post, and only write the like to the stream if they have not already liked it.

In web2, your backend has "god mode" access to the database. Using Lit and web3 storage like Ceramic, you can create Lit Actions that have "god mode" over a Ceramic stream, because the Lit Action has been granted the ability to sign with a PKP that owns the Ceramic stream. However, the Lit Action will only write to the stream according to the logic of the code inside it. This makes moving from a centralized web2 paradigm to a decentralized web3 paradigm much easier.
