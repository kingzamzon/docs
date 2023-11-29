---
sidebar_position: 5
---

# GetLit CLI

![](https://raw.githubusercontent.com/LIT-Protocol/getlit/main/banner.png)

The GetLit CLI is a command-line tool designed to help developers manage their Lit Actions projects. The CLI provides a set of commands to create, build, test, and configure Lit Actions.

- GitHub repo: https://github.com/LIT-Protocol/getlit
- npm: https://www.npmjs.com/getlit

## Getting Started

### Installation

```bash
npm install -g getlit

// or
yarn add global getlit
```

### Usage

To use the GetLit CLI, navigate to a directory or your existing project, and then simply run the desired command followed by any required or optional arguments. The CLI will execute the associated function and display the output accordingly.

| Command                  | Usage                               | Description                               |
| ------------------------ | ----------------------------------- | ----------------------------------------- |
| `action` \| `init` | `getlit action`                       | 🏁 Initialise a new Lit project           |
| `build`           | `getlit build`                      | 🏗  Build your Lit Actions                |
| `new` | `getlit new [<lit-action-name>]` | 📝 Create a new Lit Action                |
| `test`            | `getlit test [<lit-action-name>]`   | 🧪 Test a Lit Action                      |
| `watch`           | `getlit watch [<lit-action-name>]`  | 🔧 Simultaneously build and test a Lit Action |
| `setup`           | `getlit setup`                      | 🔑 Setup config for authSig and PKP      |
| `docs` \| `doc` | `getlit docs`                       | 📖 Open the Lit Protocol documentation   |
| `help` \|  `show` | `getlit help`    | 🆘 Show the help menu                     |

### Basic Application

```bash
getlit action
```

Initialized Lit project directory looks like:

```
├── README.md
├── getlit.json
├── globa.d.ts
├── package-lock.json
├── package.json
├── src
│   ├── README.md
│   ├── foo.action.ts
│   └── main.action.ts
├── test
│   ├── README.md
│   ├── foo.t.action.mjs
│   └── main.t.action.mjs
├── tsconfig.json
└── utils.mjs
```

In order to proceed, `src/foo.action.ts` needs to be modified as ‘NA_E’ to ‘NAME’:

```javascript
/**
 * NA_E: foo
 *
 * ⬆️ Replace "_" with "M" to pass the schema validation
 *
 */
 
const foo = () => {
  return "bar";
};
```

Let's see what we have in our main Lit Action, `src/main.action.ts`:

```javascript
/**
 * NAME: hello
 */
 
// This will exceed the default file size limit
// import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
 
type SignData = number[];
 
const helloWorld: SignData = [
  72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100,
];
 
(async () => {
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await LitActions.signEcdsa({
    toSign: new Uint8Array(helloWorld),
    <your pkp publickey>, // <-- You should pass this in jsParam
    sigName,
  });
 
  console.log('sigShare', sigShare);
})();
```

You can start building your own Lit Action by modifying `src/main.action.ts`, and `test/main.t.action.mjs` accordingly.

:::note
Don't forget to [mint your PKP](https://developer.litprotocol.com/v3/sdk/serverless-signing/quick-start/) before running the build and test commands.
:::