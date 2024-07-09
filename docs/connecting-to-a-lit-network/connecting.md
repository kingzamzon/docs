# Connecting to a Lit Network

After installing the Lit SDK, you can connect an instance of [LitNodeClient](https://v6-api-doc-lit-js-sdk.vercel.app/classes/lit_node_client_src.LitNodeClient.html) to a Lit network. This is done by setting the `litNetwork` property when instantiating an instance of `LitNodeClient`:

```ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litNodeClient = new LitNodeClient({
    // Change this to the Lit SDK Network Identifier you want to connect to
    litNetwork: 'datil-dev',
});
await litNodeClient.connect();
```

## Available Lit Networks

### Mainnets

| Name     | Lit SDK Network Identifier | Doc Page Link | Network is Live |
|----------|----------------------------|---------------|-----------------|
| Datil    | `datil`                    | n/a           | ❌               |
| Habanero | `habanero`                 | n/a           | ✅               |

### Testnets

| Name      | Lit SDK Network Identifier | Doc Page Link                | Network is Live |
|-----------|----------------------------|------------------------------|-----------------|
| Datil-dev | `datil-dev`                | [Link](./testnets#datil-dev) | ✅               |
| Datil     | `datil-test`               | n/a                          | ❌               |
| Cayenne   | `cayenne`                  | n/a                          | ✅               |
| Manzano   | `manzano`                  | n/a                          | ✅               |
