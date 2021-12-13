---
sidebar_position: 8
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

## Wallet Error Handling

Metamask and other wallets throw errors themselves. The format for those exceptions can be found here: https://docs.metamask.io/guide/ethereum-provider.html#errors
