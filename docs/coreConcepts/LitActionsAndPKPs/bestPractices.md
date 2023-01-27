---
sidebar_position: 5
---

# Best Practices

:::note
It is NOT recommended to use the lit-js-sdk within a Lit Action due to the potential for exponential growth of computational complexity (n^2) (eg. If 10 nodes try to get 10 signature shares, there are now 100 http requests). It is the responsibility of the client to collect and combine the signature or decryption shares, as the combination operation is not supported within a Lit Action. 
:::

## Ideal Use Cases

- Generating proofs
- Using a signature to prove
that a particular interaction took place.
- Lookup PKP permitted actions, addresses and auth methods
- Checking access control conditions

## Think Twice Use Case
- POST request that inserts a new SQL row (you will have n number of rows, where n is the number of nodes that run the Lit Actions) 


## Bad Use Cases
- ETH RPC calls
- Sending a transaction
