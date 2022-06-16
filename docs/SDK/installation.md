---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

Use yarn or npm to add the lit-js-sdk to your product:

```
yarn add lit-js-sdk
```

## Importing

### For the browser

<Tabs
defaultValue="imported"
values={[
{label: 'imported', value: 'imported'},
{label: 'script tag', value: 'script-tag'},
]}>
<TabItem value="imported">

    import LitJsSdk from 'lit-js-sdk'

</TabItem>
<TabItem value="script-tag">

    <script onload='LitJsSdk.litJsSdkLoadedInALIT()' src="https://jscdn.litgateway.com/index.web.js"></script>

</TabItem>
</Tabs>

If you decide to import the SDK with the script tag, we provide a web-ready package with all dependencies included at build/index.web.js.
You can use all the SDK functions via LitJsSdk, for example `LitJsSdk.encryptString()`

### For the server side (NodeJS), imported

```
import LitJsSdk from 'lit-js-sdk/build/index.node.js'
```

**Note**: You should use at least Node v16 because of the need for the webcrypto library.  
You can use Node v14 (and possibly lower) if you import a global webcrypto polyfill like @peculiar/webcrypto and define the global `crypto` object in your code.

## Connection to the Lit Network

The SDK requires an active connection to the LIT nodes to perform most functions (notably, a connection to the LIT nodes is not required if you are just verifying a JWT). In web apps, this is typically done on first page load and can be shared between all your pages. In NodeJS apps, this is done when when the server starts.

### SDK installed via yarn or the script tag (browser usage)

<Tabs
defaultValue="yarn"
values={[
{label: 'yarn / NPM', value: 'yarn'},
{label: 'script tag', value: 'script'},
]}>
<TabItem value="yarn">

    const client = new LitJsSdk.LitNodeClient()
    await client.connect()
    window.litNodeClient = client

</TabItem>
<TabItem value="script">

    function litJsSdkLoaded(){
      var litNodeClient = new LitJsSdk.LitNodeClient()
      litNodeClient.connect()
      window.litNodeClient = litNodeClient
    }

</TabItem>
</Tabs>

In the **yarn / NPM** example:

Note that client.connect() will return a promise that resolves when you are connected to the Lit Network. You may also listen for the `lit-ready` event. In the code below, we make the litNodeClient available as a global variable so that it can be used throughout the web app.

In the **script tag** example:

If you're using the script tag with `onload='LitJsSdk.litJsSdkLoadedInALIT()'` then the SDK will connect to the Lit Network and put a connected LitNodeClient into `window.litNodeClient` for you. Alternatively, you can put your own connection code in the `litJsSdkLoaded()` function and call it yourself with `onload=litJsSdkLoaded()`.

### SDK installed via yarn / NPM (NodeJS / serverside usage)

In this example, we store the litNodeClient in a global variable `app.locals.litNodeClient` so that it can be used throughout the server. `app.locals` is provided by Express for this purpose. You may have to use what your own server framework provides for this purpose, instead.

```
app.locals.litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
})
await app.locals.litNodeClient.connect()
```

**Note** that client.connect() will return a promise that resolves when you are connected to the Lit Network.

### SDK installed via yarn / NPM (client side usage)

Within a file (we like to call ours `lit.js`), set up your Lit object.

```
const client = new LitJsSdk.LitNodeClient()

class Lit {
  private litNodeClient
  async connect() {
    await client.connect()
    this.litNodeClient = client
  }
}
export default new Lit()
```

## Listening for the lit-ready event

To listen for the "lit-ready" event which is fired when the network is fully connected:

```
document.addEventListener('lit-ready', function (e) {
  console.log('LIT network is ready')
  setNetworkLoading(false) // replace this line with your own code that tells your app the network is ready
}, false)
```
