---
sidebar_position: 2
---

# Basic Examples

This page defines some basic access control conditions (referred to as `accessControlConditions` in the code) based on standard contract types like ERC20, ERC721, and ERC1155 for EVM (Ethereum) chains. Also included are some conditions like wallet address ownership, proof of humanity, and POAP possession. You may set your conditions, and define the `returnValueTest` under which access should be granted.

If you would like to use a contract call for a contract type that is not here, refer to the [custom contract calls](/docs/accessControlConditions/evmCustomContractCalls) page, which will let you pass a function ABI and call any smart contract function. These are referred to as `evmContractConditions` in the code.

## Must posess at least one ERC1155 token with a given token id

In this example, the token contract's address is 0x3110c39b428221012934A7F617913b095BC1078C and the token id we are checking for is 9541.

```
const accessControlConditions = [
  {
    contractAddress: '0x3110c39b428221012934A7F617913b095BC1078C',
    standardContractType: 'ERC1155',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress',
      '9541'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]
```

## Must posess at least one ERC1155 token from a batch of token ids

In this example, the token contract's address is 0x10daa9f4c0f985430fde4959adb2c791ef2ccf83 and the token ids we are checking for are either 1, 2, 10003, or 10004.

```
const accessControlConditions = [
  {
    contractAddress: '0x10daa9f4c0f985430fde4959adb2c791ef2ccf83',
    standardContractType: 'ERC1155',
    chain,
    method: 'balanceOfBatch',
    parameters: [
      ':userAddress,:userAddress,:userAddress,:userAddress',
      '1,2,10003,10004'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]
```

## Must posess a specific ERC721 token (NFT)

In this example, the token contract's address is 0x89b597199dAc806Ceecfc091e56044D34E59985c and the token id we are checking for is 3112.

```
const accessControlConditions = [
  {
    contractAddress: '0x89b597199dAc806Ceecfc091e56044D34E59985c',
    standardContractType: 'ERC721',
    chain,
    method: 'ownerOf',
    parameters: [
      '3112'
    ],
    returnValueTest: {
      comparator: '=',
      value: ':userAddress'
    }
  }
]
```

## Must posess any token in an ERC721 collection (NFT Collection)

In this example, the token contract's address is 0xA80617371A5f511Bf4c1dDf822E6040acaa63e71.

```
const accessControlConditions = [
  {
    contractAddress: '0xA80617371A5f511Bf4c1dDf822E6040acaa63e71',
    standardContractType: 'ERC721',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]
```

## Must posess at least one ERC20 token

In this example, the token contract's address is for Maker: 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2.

```
const accessControlConditions = [
  {
    contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    standardContractType: 'ERC20',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]
```

## Must posess at least 0.00001 ETH

In this example, we are checking the ETH balance of the user's address and making sure it's above 0.00001 ETH. Note that the return value is in Wei, so we specified 0.00001 ETH as 10000000000000 Wei.

```
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain,
    method: 'eth_getBalance',
    parameters: [
      ':userAddress',
      'latest'
    ],
    returnValueTest: {
      comparator: '>=',
      value: '10000000000000'
    }
  }
]
```

## Must be a member of a DAO (MolochDAOv2.1, also supports DAOHaus)

In this example, we are checking that the user is a member of a MolochDAOv2.1. DAOHaus DAOs are also MolochDAOv2.1 and therefore are also supported. This checks that the user is a member of the DAO and also that they are not jailed. This example checks the DAO contract at 0x50D8EB685a9F262B13F28958aBc9670F06F819d9 on the xDai chain.

```
const accessControlConditions = [
  {
    contractAddress: '0x50D8EB685a9F262B13F28958aBc9670F06F819d9',
    standardContractType: 'MolochDAOv2.1',
    chain,
    method: 'members',
    parameters: [
      ':userAddress',
    ],
    returnValueTest: {
      comparator: '=',
      value: 'true'
    }
  }
]
```

## Must be a subscriber to a creator on creaton.io

In this example, we are checking that the user is a subscriber to a creator on creaton.io. This example checks the Creator contract at 0x50D8EB685a9F262B13F28958aBc9670F06F819d9 on the Mumbai chain.

```
const accessControlConditions = [
  {
    contractAddress: '0x77c0612bb672a52c60c7a71b898853570bd2bbbb',
    standardContractType: 'Creaton',
    chain,
    method: 'subscribers',
    parameters: [
      ':userAddress',
    ],
    returnValueTest: {
      comparator: '=',
      value: 'true'
    }
  }
]
```

## A specific wallet address

In this example, we are checking that the user is in posession of a specific wallet address 0x50e2dac5e78B5905CB09495547452cEE64426db2

```
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain,
    method: '',
    parameters: [
      ':userAddress',
    ],
    returnValueTest: {
      comparator: '=',
      value: '0x50e2dac5e78B5905CB09495547452cEE64426db2'
    }
  }
]
```

## Proof of Humanity

Here, we are checking that the user is registered with Proof Of Humanity https://www.proofofhumanity.id/

```
const accessControlConditions = [
  {
    contractAddress: "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb",
    standardContractType: "ProofOfHumanity",
    chain: "ethereum",
    method: "isRegistered",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: "true"
    }
  }
]
```
