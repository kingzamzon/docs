---
sidebar_position: 2
---

# Installation

Use yarn or npm to add the lit-js-sdk to your product:

```
yarn add lit-js-sdk
```

## Importing

### For the browser, imported

```
import LitJsSdk from 'lit-js-sdk'
```

### For the browser, as a script tag

We also provide a web-ready package with all dependencies included at build/index.web.js. You can import this into your HTML webpage using a script tag:

```
<script onload='litJsSdkLoaded()' src="https://jscdn.litgateway.com/index.web.js"></script>
```

You can then use all the sdk functions via LitJsSdk for example `LitJsSdk.toggleLock()`

### For the server side (NodeJS), imported

```
import LitJsSdk from 'lit-js-sdk/build/index.node.js'
```

## Connection to the Lit Network

The SDK requires an active connection to the LIT nodes to perform most functions (but, notably, a connection to the LIT nodes is not required if you are just verifying a JWT). In web apps, this is typically done on first page load and can be shared between all your pages. In NodeJS apps, this is done when when the server starts.

### SDK installed via yarn / NPM (browser usage)

To connect, use the code below. Note that client.connect() will return a promise that resolves when you are connected to the Lit Network. You may also listen for the `lit-ready` event. In the code below, we make the litNodeClient available as a global variable so that it can be used throughout the web app.

```
const client = new LitJsSdk.LitNodeClient()
await client.connect()
window.litNodeClient = client
```

### SDK installed via the script tag (browser usage)

If you're using the script tag with `onload='litJsSdkLoaded()'` then you can put the connection code in the `litJsSdkLoaded()` function.

```
function litJsSdkLoaded(){
  var litNodeClient = new LitJsSdk.LitNodeClient()
  litNodeClient.connect()
  window.litNodeClient = litNodeClient
}
```

### SDK installed via yarn / NPM (NodeJS / serverside usage)

To connect, use the code below. Note that client.connect() will return a promise that resolves when you are connected to the Lit Network. In this example, we store the litNodeClient in a global variable `app.locals.litNodeClient` so that it can be used throughout the server. `app.locals` is provided by Express for this purpose. You may have to use whatever your own server framework provides for this purpose, instead.

```
app.locals.litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
});
await app.locals.litNodeClient.connect();
```

## Listening for the lit-ready event

To listen for the "lit-ready" event which is fired when the network is fully connected:

```
document.addEventListener('lit-ready', function (e) {
  console.log('LIT network is ready')
  setNetworkLoading(false) // replace this line with your own code that tells your app the network is ready
}, false)
```
