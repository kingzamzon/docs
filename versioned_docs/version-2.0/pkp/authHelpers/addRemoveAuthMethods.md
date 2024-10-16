# Adding and Removing Auth Methods

Configure auth methods for your PKP using the [`@lit-protocol/contracts-sdk`](https://js-sdk.litprotocol.com/modules/contracts_sdk_src.html) package.

To write to the blockchain, the `LitContracts` instance must be created with a `ethers.Signer` that is authorized to sign transactions using the PKP. The [`@lit-protocol/pkp-ethers` package](https://js-sdk.litprotocol.com/modules/pkp_ethers_src.html) provides a convenient class, `PKPEthersWallet`, which can be used as a signer.

## Initialize `PKPEthersWallet`

`PKPEthersWallet` must be instantiated with an `AuthSig` or a `SessionSig` in order to authorize signing requests. To learn how to generate these signatures, refer to the [Authentication section](../../SDK/Explanation/authentication/overview).

```js
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { LIT_RPC } from "@lit-protocol/constants";

const pkpWallet = new PKPEthersWallet({
  controllerAuthSig: "<Your AuthSig>",
  // Or you can also pass in controllerSessionSigs
  pkpPubKey: "<Your PKP public key>",
  rpc: LIT_RPC.CHRONICLE_YELLOWSTONE,
});
await pkpWallet.init();
```

To view more constructor options for `PKPEthersWallet`, check out the [API docs](https://js-sdk.litprotocol.com/interfaces/types_src.PKPEthersWalletProp.html).

:::note

**Passing `SessionSigs`**

When generating session signatures for `PKPEthersWallet`, be sure to request the ability to execute Lit Actions by passing the following object in the `resourceAbilityRequests` array:

```js
{
  resource: new LitActionResource('*'),
  ability: LitAbility.LitActionExecution,
}
```

:::

## Initialize `LitContracts`

Create an instance of `LitContracts` and pass in your `PKPEthersWallet`.

```js
import { LitContracts } from "@lit-protocol/contracts-sdk";

const litContracts = new LitContracts({
  signer: pkpWallet,
});
await litContracts.connect();
```

To view more constructor options for `LitContracts`, check out the [API docs](https://js-sdk.litprotocol.com/classes/contracts_sdk_src.LitContracts.html#constructor).

## Construct the `AuthMethod` Object

To add an auth method, you must pass an `authMethod` object, which should have the following properties:

- `authMethodType`: A number representing the type of auth method you want to add. Refer to the supported auth methods table [here](../authHelpers/overview#using-lit-auth-directly).
- `id`: Bytes that represent a hash of a string that uniquely identifies the auth method
- `userPubkey`: Public key of a WebAuthn credential (only required when using WebAuthn as an auth method)

The auth method ID should be a hash of a string that uniquely identifies the auth method. For example, if adding Discord as an auth method, the auth method ID could be a hash of the Discord user ID and your Discord client ID.

```js
import { utils } from "ethers";

// You can fetch the Discord user ID by calling the Discord API: https://discord.com/developers/docs/resources/user
const userId = "<Discord user ID>";
// Upon creating a Discord application, you will be given a client ID: https://discord.com/developers/docs/topics/oauth2
const clientId = "<Discord client ID>";
// The id can be a hash of the Discord user ID and the Discord client ID
const authMethodId = utils.keccak256(
  utils.toUtf8Bytes(`${user.id}:${this.clientId}`)
);
```

## Add an Auth Method

Auth methods can be modified by interacting with the [PKPPermissions contract](https://github.com/LIT-Protocol/LitNodeContracts/blob/main/contracts/PKPPermissions.sol). To add an auth method, call the `addPermittedAuthMethod` function on the `PKPPermissions` contract.

```js
const transaction =
  await litContracts.pkpPermissionsContract.write.addPermittedAuthMethod(
    "<The token ID of the PKP you want to add an auth method to>",
    "<The auth method object you want to add>",
    [],
    { gasPrice: utils.parseUnits("0.001", "gwei"), gasLimit: 400000 }
  );
const result = await transaction.wait();
```

The `addPermittedAuthMethod` function takes the following arguments:

- `tokenId`: The token ID of the PKP you want to add an auth method to
- `authMethod`: The auth method you want to add
- `overrides`: An optional object that allows you to customize [certain parameters](https://docs.ethers.org/v5/api/contract/contract/#contract-functionsSend) of the transaction (e.g, `gasPrice`, `gasLimit`)

## Remove an Auth Method

To remove an auth method, call the `removePermittedAuthMethod` function on the `PKPPermissions` contract.

```js
const transaction =
  await litContracts.pkpPermissionsContract.write.removePermittedAuthMethod(
    "<The token ID of your PKP>",
    "<The auth method type",
    "<The auth method ID>",
    { gasPrice: utils.parseUnits("0.001", "gwei"), gasLimit: 400000 }
  );
```

The `removePermittedAuthMethod` function takes the following arguments:

- `tokenId`: The token ID of the PKP you want to remove an auth method from
- `authMethodType`: A number representing the type of auth method you want to remove. Refer to the supported auth methods table [here](../authHelpers/overview#using-lit-auth-directly).
- `id`: Bytes that represent a hash of a string that uniquely identifies the auth method you want to remove
- `overrides`: An optional object that allows you to customize [certain parameters](https://docs.ethers.org/v5/api/contract/contract/#contract-functionsSend) of the transaction (e.g, `gasPrice`, `gasLimit`)

## Estimating Gas

To estimate of the amount of gas that would be required to add and remove auth methods, you can first mock the transaction using `populateTransaction` to create an unsigned transaction and then call `estimateGas` on the unsigned transaction.

```js
// First, mock the transaction to add an auth method
const mockTransaction =
  await litContracts.pkpPermissionsContract.write.populateTransaction.addPermittedAuthMethod(
    "<The token ID of the PKP you want to add an auth method to>",
    "<The auth method object you want to add>",
    []
  );

// Then, estimate gas on the unsigned transaction
const gas = await litContracts.signer.estimateGas(mockTransaction);

// Now, you can use the gas value to set the gas limit
const transaction =
  await litContracts.pkpPermissionsContract.write.addPermittedAuthMethod(
    "<The token ID of the PKP you want to add an auth method to>",
    "<The auth method object you want to add>",
    [],
    { gasLimit: gas }
  );
```

## Fetch Auth Methods

To check that the auth method was added or removed successfully, call the `getPermittedAuthMethods` function on the `PKPPermissions` contract.

```js
const authMethods =
  await litContracts.pkpPermissionsContract.read.getPermittedAuthMethods(
    "<The token ID of your PKP>"
  );
```

The `getPermittedAuthMethods` function returns an array of `authMethod` objects, each of which will include `authMethodType`, `id`, and `userPubkey` values.
