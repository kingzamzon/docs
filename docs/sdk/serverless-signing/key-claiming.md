import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Key Claiming

## Prerequisites

- Familiarity with JavaScript
- Basic understanding of [severless signing](../serverless-signing/quick-start.md)

## Overview

Lit Actions have their own support for [claiming](../wallets/claimable-keys/intro.md). Instead of using an [auth method](../wallets/auth-methods) use your own `userId` with the Lit Action's `IPFS CID` to create an `appId`. This allows for deriving custom claims without the need for an authentication method.

# How it works
Instead of pre-authenticating the `access token` within an `Authentication Method`, claiming in a Lit Action allows you to define your own `userId` and use the Actions `IPFS CID` to form the `key identifier` through your own user identifier. This doesn't require a pre-authentication step which allows you to set up your own claims to them be routed on-chain with our `contract-sdk`.

## Example

```jsx
  const res = await client.executeJs({
    authSig,
    code: `(async () => {
      Lit.Actions.claimKey({keyId: userId});
    })();`,
    authMethods: [],
    jsParams: {
        userId: 'foo'
    },
  });

  let client = new LitContracts(signer: "<your pkp wallet or other signer>");
  let tx = await contractClient.pkpNftContract.write.claimAndMint(2, res.claims['foo'].derivedKeyId, res.claims['foo'].signatures);
```

### adding an auth method when minting a claim
```jsx
  const authMethod = {
    authMethodType: AuthMethodType.EthWallet,
    accessToken: JSON.stringify(authSig),
  };

  const authMethodId = LitAuthClient.getAuthMethodId(authMethod);

  const res = await client.executeJs({
    authSig,
    code: `(async () => {
      Lit.Actions.claimKey({keyId: userId});
    })();`,
    jsParams: {
        userId: 'foo'
    },
  });

  let client = new LitContracts(signer: "<your pkp wallet or other signer>");
  let tx = await client.pkpHelperContract.write.claimAndMintNextAndAddAuthMethods(
    res.claims['foo'],
   {
    keyType: 2,
    permittedIpfsCIDs: [],
    permittedIpfsCIDScopes: [],
    permittedAddresses:: [],
    permittedAddressScopes: [],
    permittedAuthMethodTypes: [AuthMethodType.EthWallet],
    permittedAuthMethodIds: [`0x${authMethodId}`],
    permittedAuthMethodPubkeys: [`0x`],
    permittedAuthMethodScopes: [[BigNumber.from("1")]],
    addPkpEthAddressAsPermittedAddress: true,
    sendPkpToItself: true
   });
```
