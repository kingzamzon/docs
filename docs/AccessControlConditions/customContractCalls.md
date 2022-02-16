---
sidebar_position: 2
---

# Custom Contract Calls

This page defines how to create access control conditions (referred to as `evmContractConditions` in the code) based on any smart contract call on an EVM compatible network. You may pass any function ABI, and define the `returnValueTest` under which access should be granted.

## Must have at least 1 share in a given MolochDAOv2.1 DAO

```
const evmContractConditions = [
  {
    contractAddress: "0xb71a679cfff330591d556c4b9f21c7739ca9590c",
    functionName: "members",
    functionParams: [":userAddress"],
    functionAbi: {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address",
        },
      ],
      name: "members",
      outputs: [
        {
          name: "delegateKey",
          type: "address",
        },
        {
          name: "shares",
          type: "uint256",
        },
        {
          name: "loot",
          type: "uint256",
        },
        {
          name: "exists",
          type: "bool",
        },
        {
          name: "highestIndexYesVote",
          type: "uint256",
        },
        {
          name: "jailed",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    chain: "xdai",
    returnValueTest: {
      key: "shares",
      comparator: ">=",
      value: "1",
    },
  },
];
```
