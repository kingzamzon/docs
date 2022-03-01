---
sidebar_position: 1
---

# EVM Basic Examples

This page defines some basic access control conditions (referred to as `accessControlConditions` in the code) based on standard contract types like ERC20, ERC721, and ERC1155 for EVM (Ethereum) chains. Also included are some conditions like wallet address ownership, proof of humanity, and POAP posession. You may set you conditions, and define the `returnValueTest` under which access should be granted.

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

In this example, the token contract's address is 0x319ba3aab86e04a37053e984bd411b2c63bf229e and the token id we are checking for is 9541.

```
const accessControlConditions = [
  {
    contractAddress: '0x319ba3aab86e04a37053e984bd411b2c63bf229e',
    standardContractType: 'ERC721',
    chain,
    method: 'ownerOf',
    parameters: [
      '5954'
    ],
    returnValueTest: {
      comparator: '=',
      value: ':userAddress'
    }
  }
]
```

## Must posess any token in an ERC721 collection (NFT Collection)

In this example, the token contract's address is 0x319ba3aab86e04a37053e984bd411b2c63bf229e.

```
const accessControlConditions = [
  {
    contractAddress: '0x319ba3aab86e04a37053e984bd411b2c63bf229e',
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

## Must posess a POAP with a specific name

This is an integration with https://poap.xyz

It checks that a user holds a specific POAP. Enter the POAP name in the final returnValueTest value. In this example the POAP is "Burning Man 2021".

This actually performs two checks, so there are two access control conditions tested. The first checks that the user holds at least 1 POAP, but it could be from any POAP event. The second checks that the name of any of the user's POAPs is a match to the returnValueTest value.

You may use "contains" or "=" for the final returnValueTest comparator. For example, if there are POAPs issued every year for Burning Man, with names in the format of "Burning Man 2021" and "Burning Man 2022" but you just want to check that the user holds any Burning Man POAP, you could use "contains" "Burning Man" and all Burning Man POAPs would pass the test. If you wanted to check for a specific year like 2021, you could use "=" "Burning Man 2021"

Note that most POAPs live on the xDai chain so this example uses it.

```
const chain = "xdai";
var accessControlConditions = [
  {
    contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
    standardContractType: "ERC721",
    chain,
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
  {"operator": "and"},
  {
    contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
    standardContractType: "POAP",
    chain,
    method: "tokenURI",
    parameters: [],
    returnValueTest: {
      comparator: "contains",
      value: "Burning Man 2021",
    },
  },
];
```

## Must posess at least one ERC20 token

In this example, the token contract's address is 0x3110c39b428221012934A7F617913b095BC1078C.

```
const accessControlConditions = [
  {
    contractAddress: '0xc0ad7861fe8848002a3d9530999dd29f6b6cae75',
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
