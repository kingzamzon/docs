---
sidebar_position: 4
---

# Solana Examples

Solana Access Control conditions work a little different than EVM access control conditions. Solana conditions let you make a Solana RPC call, and then filter and parse the response. This is useful for things like checking the balance of an account, checking the owner of an account, or checking the number of tokens a user has.

Note that you can use Solana RPC Conditions in the same way you would use EVM conditions, but you should pass a `solRpcConditions` array instead of a `accessControlConditions` or `evmContractConditions` array.

## Must posess an NFT in a Metaplex collection

In this example, we are checking if the user owns one or more NFTs in the Metaplex collection with address FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33. The collection must be verified. Note that "balanceOfMetaplexCollection" is not a real Solana RPC call. It is a custom RPC call that is specific to Lit Protocol.

```
var solRpcConditions = [
  {
    method: "balanceOfMetaplexCollection",
    params: ["FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33"],
    chain,
    returnValueTest: {
      key: "",
      comparator: ">",
      value: "0",
    },
  },
];
```

## Must posess at least 0.1 SOL

In this example, we are checking if the user's wallet contains more than 0.1 SOL. The parameter of ":userAddress" will be automatically substituted with the user's wallet address which was verified by checking the message signed by their wallet.

```
var solRpcConditions = [
  {
    method: "getBalance",
    params: [":userAddress"],
    chain: 'solana',
    returnValueTest: {
      key: "",
      comparator: ">=",
      value: "100000000", // equals 0.1 SOL
    },
  },
];
```

## A specific wallet address

In this example, we are checking that the user is in posession of a specific wallet address 88PoAjLoSqrTjH2cdRWq4JEezhSdDBw3g7Qa6qKQurxA. The parameter of ":userAddress" will be automatically substituted with the user's wallet address which was verified by checking the message signed by their wallet.

```
var solRpcConditions = [
  {
    method: "",
    params: [":userAddress"],
    chain: 'solana',
    returnValueTest: {
      key: "",
      comparator: "=",
      value: "88PoAjLoSqrTjH2cdRWq4JEezhSdDBw3g7Qa6qKQurxA",
    },
  },
];
```

## Must posess a specific token (NFT)

This example checks if the user owns at least 1 token with address 29G6GSKNGP8K6ATy65QrNZk4rNgsZX1sttvb5iLXWDcE. The parameter of ":userAddress" will be automatically substituted with the user's wallet address which was verified by checking the message signed by their wallet. Pay special attention to the "key" in the returnValueTest. The key is a JSONPath that filters the account objects based on the "mint" address. After filtering, the JSONPath expression refers to the tokenAmount.amount field which is the amount of tokens the user owns.

```
var solRpcConditions = [
  {
    method: "getTokenAccountsByOwner",
    params: [
      ":userAddress",
      {
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      },
      {
        encoding: "jsonParsed",
      },
    ],
    chain: 'solana',
    returnValueTest: {
      key: '$[?(@.account.data.parsed.info.mint == "29G6GSKNGP8K6ATy65QrNZk4rNgsZX1sttvb5iLXWDcE")].account.data.parsed.info.tokenAmount.amount',
      comparator: ">",
      value: "0",
    },
  },
];
```

## A specific token account balance

This is useful if you already know the token account address and want to check the balance of that account. Note that putting the user's wallet address in here will NOT work, because the user's wallet owns the token account, which is a separate on-chain account that owns the token itself. In this example, we re checking the token account E7aAccig7X3X4pSWjf1eqqUJkV3EbzG6DrtyM2gbuuhH.

```
var solRpcConditions = [
  {
    method: "getTokenAccountBalance",
    params: ["E7aAccig7X3X4pSWjf1eqqUJkV3EbzG6DrtyM2gbuuhH"],
    chain: 'solana',
    returnValueTest: {
      key: "amount",
      comparator: ">",
      value: "0",
    },
  },
];
```
