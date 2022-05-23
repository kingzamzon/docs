---
sidebar_position: 2
---

# Installation

Create a new yarn project:

```
yarn init
```

Add the Lit Ceramic SDK package:

```
yarn add lit-ceramic-sdk
```

## Import the SDK

Within your main Typescript file (in the example, `app.ts`)
```
import { Integration } from 'lit-ceramic-sdk'
```

Create a new Integration that runs upon startup and is accessible where you intend to do encryptAndWrite or readAndDecrypt operations. Pass your Ceramic RPC URL and the chain you wish to use: 
```
let litCeramicIntegration = new Integration("https://ceramic-clay.3boxlabs.com", "ethereum")
```

## Instantiating the Lit Client

Start the Lit Client when the DOM is loaded, or early on in the lifecycle: 
```
litCeramicIntegration.startLitClient(window)
```