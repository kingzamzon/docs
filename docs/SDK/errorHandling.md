---
sidebar_position: 4
---

# Error Handling

## SDK Error Handling

Errors are thrown as exceptions when something has gone wrong. Errors are objects with a message, name, and errorCode. Possible codes are documented below.

### Not Authorized

- errorCode: not_authorized
- Reason: Thrown when the user does not have access to decrypt or is unauthorized to receive a JWT for an item.

### Wrong Network

- errorCode: wrong_network
- Reason: The user is on the wrong network. For example, this may mean the user has ethereum selected in their wallet but they were trying to use polygon for the current operation.

### Missing access control conditions

- errorCode: missing_access_control_conditions
- Reason: You must pass either access_control_conditions or evm_contract_conditions or sol_rpc_conditions, and you did not pass these things to the nodes.

### Incorrect access control conditions

- errorCode: incorrect_access_control_conditions
- Reason: The access control conditions you passed in do not match the ones that were set by the condition creator for this resourceId or encryptedSymmetricKey.

### Storage error

- errorCode: storage_error
- Reason: An error occurred storing the condition. This usually means that you tried to update a permanant condition, or you tried to update a non-permanant condition from the wrong account. Only the creator of a condition can update it, and only if \"permanant\": false was originally passed in when storing the condition.

### Resource ID not found

- errorCode: resource_id_not_found
- Reason: Could not find the resource ID you passed in. You should have already called saveSigningCondition with the exact same resource ID.

### Encrypted symmetric key not found

- errorCode: encrypted_symmetric_key_not_found
- Reason: Could not find the encrypted symmetric key you passed in. You should have already called saveEncryptionKey which returned the encrypted symmetric key.

### Access control conditions check failed

- errorCode: access_control_conditions_check_failed
- Reason: The Lit nodes failed to check the condition. This means that the Lit nodes could not talk to the chain to check the condition. This could be because the RPC servers are down, or because the condition is making an incorrect smart contract call that reverts.

### IAT outside grace period

- errorCode: iat_outside_grace_period
- Reason: When signing a JWT, the IAT is outside the grace period. This usually means that your system clock is wrong. Please check it and make sure it is set accurately for your timezone.

### EXP wrong or too large

- errorCode: exp_wrong_or_too_large
- Reason: When signing a JWT, the EXP is too large or wrong. This usually means that your system clock is wrong. Please check it and make sure it is set accurately for your timezone.

### Invalid Auth Signature

- errorCode: invalid_auth_sig
- Reason: The auth_sig passed to the nodes is invalid or could not be verified. make sure that you are passing the correct auth_sig.

### Lit Node Client Not Ready Error

- errorCode: lit_node_client_not_ready
- Reason: The Lit node client is not ready. This means that the Lit node client is not connected to the Lit network. You should run `await litNodeClient.connect()` before calling any other methods that use the Lit Node Client.

### Invalid Unified Condition Type

- errorCode: invalid_unified_condition_type
- Reason: In a unified access control condition, you passed an invalid `conditionType`. Check the docs to see what valid types are: https://developer.litprotocol.com/docs/accesscontrolconditions/unifiedaccesscontrolconditions/

### RPC Error

- errorCode: rpc_error
- Reason: The Lit Node(s) could not complete the RPC call. This could be because the RPC servers are down, or because the RPC call is making an incorrect smart contract call that reverts.

### Unknown error

- errorCode: unknown_error
- Reason: An unknown error has occurred. Please contact us on Discord to report this error.

## Wallet Error Handling

Metamask and other wallets throw errors themselves. The format for those exceptions can be found here: https://docs.metamask.io/guide/ethereum-provider.html#errors
