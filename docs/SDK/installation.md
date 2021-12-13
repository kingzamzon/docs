---
sidebar_position: 2
---

# Installation

Use yarn or npm to add the lit-js-sdk to your product:

```
yarn add lit-js-sdk
```

You can then import it like so:

```
import LitJsSdk from 'lit-js-sdk'
```

We also provide a web-ready package with all dependencies included at build/index.web.js. You can import this into your HTML webpage using a script tag:

```
<script onload='litJsSdkLoaded()' src="https://jscdn.litgateway.com/index.web.js"></script>
```

You can then use all the sdk functions via LitJsSdk for example `LitJsSdk.toggleLock()`

## Connection to the Lit Network

The SDK requires an active connection to the LIT nodes to perform most functions (but, notably, a connection to the LIT nodes is not required if you are just verifying a JWT). In web apps, this is typically done on first page load and can be shared between all your pages.

### SDK installed via yarn / NPM

To connect, use the code below. Note that client.connect() will return instantly, but that does not mean your are connected to the network. You must listen for the `lit-ready` event. In the code below, we make the litNodeClient available as a global variable so that it can be used throughout the web app.

```
const client = new LitJsSdk.LitNodeClient()
client.connect()
window.litNodeClient = client
```

### SDK installed via the script tag

If you're using the script tag with `onload='litJsSdkLoaded()'` then you can put the connection code in the `litJsSdkLoaded()` function.

```
function litJsSdkLoaded(){
  var litNodeClient = new LitJsSdk.LitNodeClient()
  litNodeClient.connect()
  window.litNodeClient = litNodeClient
}
```

## Listening for the lit-ready event

To listen for the "lit-ready" event which is fired when the network is fully connected:

```
document.addEventListener('lit-ready', function (e) {
  console.log('LIT network is ready')
  setNetworkLoading(false) // replace this line with your own code that tells your app the network is ready
}, false)
```
