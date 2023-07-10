# Email / SMS

Email and SMS authentication provides users with a convenient way to verify their identity using one-time passwords (OTP) sent to their registered email address or phone number. We have chosen to [Stytch](https://stytch.com) as our supported OTP provider.

Once you have authenticated your user using Stytch's OTP solutions. You can provide the user session jwt as proof of authentication, along with the `app id` and `user id` which will be validated on the Lit Network. 

For more information on Stytch sessions see [here](https://stytch.com/docs/passcodes#sms_auth)

:::note
To recieve a jwt within your session `session_duration_minutes` must be specified within your `Authenticate` request
::: 


### Register user Stytch session JWT

```javascript
const authClient = new LitAuthClient({
    litRelayConfig: {
        relayApiKey: '<Your Lit Relay Server API Key>',
    }
});

// starting a validation session
let provider = client.initProvider<OtpProvider>(ProviderType.Otp, {
      appId: "<STYTCH_APP_ID>",
      userId: "<STYTCH_USER_ID>"
});

let authMethod = await session.authenticate({
    accessToken: "<AUTHENTICATION SESSION JWT>"
});

const txHash = await session.mintPKPThroughRelayer(authMethod);
```
:::note

The Lit Relay Server enables you to mint PKPs without worrying about gas fees. You can also use your own relay server or mint PKPs directly using Lit's contracts.

If you are using Lit Relay Server, you will need to request an API key [here](https://forms.gle/RNZYtGYTY9BcD9MEA).

:::

### Minting via Contract

An alternative to minting the PKP NFT via the Lit Relay Server is to send a transaction to the smart contract yourself. You can reference the following example data that is passed to the `mintNextAndAddAuthMethods` method of the `PKPHelper` smart contract:

- `keyType` is `2`
- `permittedAuthMethodTypes` is `[7]`
- `permittedAuthMethodIds` is the `keccak256 encoding of "{userId}:{projectId}"`.
- `permittedAuthMethodScopes` is an array with 1 zero-initialized element, e.g. `[[ethers.BigNumber.from("0")]]`
- `addPkpEthAddressAsPermittedAddress` is `true`
- `sendPkpToItself` is `true`

### Authenticating to Fetch PKP information

```javascript
const authClient = new LitAuthClient({
    litRelayConfig: {
        relayApiKey: '<Your Lit Relay Server API Key>',
    }
});

let provider = client.initProvider<OtpProvider>(ProviderType.Otp, {
      appId: "<STYTCH_APP_ID>",
      userId: "<STYTCH_USER_ID>"
});

let authMethod = await session.authenticate({
    accessToken: "<AUTHENTICATION SESSION JWT>"
});

const txHash = await session.fetchPKPThroughRelayer(authMethod);
```
:::note 
If the user is using a phone number, the country code must be provided.
:::

Below is an example of an authentication method from successful authentication
```javascript
{
    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay10ZXN0LWZiMjhlYmY2LTQ3NTMtNDdkMS1iMGUzLTRhY2NkMWE1MTc1NyIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC10ZXN0LWRlNGUyNjkwLTE1MDYtNGNmNS04YmNlLTQ0NTcxZGRhZWJjOSJdLCJleHAiOjE2ODg1Njc0MTQsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi10ZXN0LTlkZDI3ZGE1LTVjNjQtNDE5NS04NjdlLWIxNGE3MWE5M2MxMSIsInN0YXJ0ZWRfYXQiOiIyMDIzLTA3LTA1VDE0OjI1OjE0WiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDIzLTA3LTA1VDE0OjI1OjE0WiIsImV4cGlyZXNfYXQiOiIyMDIzLTA5LTEzVDAxOjA1OjE0WiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6IiIsImlwX2FkZHJlc3MiOiIifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im90cCIsImRlbGl2ZXJ5X21ldGhvZCI6ImVtYWlsIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyMy0wNy0wNVQxNDoyNToxNFoiLCJlbWFpbF9mYWN0b3IiOnsiZW1haWxfaWQiOiJlbWFpbC10ZXN0LTAwMzZmM2YzLTQ0MjQtNDg2My1iYWQ3LTFkNGU3NTM1ZDJiMCIsImVtYWlsX2FkZHJlc3MiOiJqb3NoQGxpdHByb3RvY29sLmNvbSJ9fV19LCJpYXQiOjE2ODg1NjcxMTQsImlzcyI6InN0eXRjaC5jb20vcHJvamVjdC10ZXN0LWRlNGUyNjkwLTE1MDYtNGNmNS04YmNlLTQ0NTcxZGRhZWJjOSIsIm5iZiI6MTY4ODU2NzExNCwic3ViIjoidXNlci10ZXN0LTY4MTAzZTAxLTc0NjgtNGFiZi04M2M4LTg4NWRiMmNhMWM2YyJ9.rZgaunT1UV2pmliZ0V7nYqYtyfdGas4eY6Q6RCzEEBc5y1K66lopUbvvkfNsLJUjSc3vw12NlIX3Q47zm0XEP8AahrJ0QWAC4v9gmZKVYbKiL2JppqnaxtNLZV9Zo1KAiqm9gdqRQSD29222RTC59PI52AOZd4iTv4lSBIPG2J9rUkUwaRI23bGLMQ8XVkTSS7wcd1Ls08Q-VDXuwl8vuoJhssBfNfxFigk7cKHwbbM-o1sh3upEzV-WFgvJrTstPUNbHOBvGnqKDZX6A_45M5zBnHrerifz4-ST771tajiuW2lQXWvocyYlRT8_a0XBsW77UhU-YBTvKVpj3jmH4A",
    "authMethodType": 7
}
```

## Generating `SessionSigs`

After successfully authenticating with an `AuthMethod`, you can generate `Session Signatures` using the provider's `getSessionSigs` method. The `getSessionSigs` method takes in an `AuthMethod` object, a PKP public key, and other session-specific arguments such as `resourceAbilityRequests` and returns a `SessionSig` object.

```javascript
// Get session signatures for the given PKP public key and auth method
const sessionSigs = await provider.getSessionSigs({
  authMethod: '<AuthMethod object returned from authenticate()>',
  sessionSigsParams: {
    chain: 'ethereum',
    resourceAbilityRequests: [{
      resource: litResource,
      ability: LitAbility.AccessControlConditionDecryption
    }],
  },
});
```
