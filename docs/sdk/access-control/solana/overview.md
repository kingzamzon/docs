# Solana Based Access Control

Deriving a Solana public key (aka. address) from a signed message works slightly differently than with EVM chains. Currently the Lit nodes support deriving an address from a Sign-in With Ethereum Message (EIP-5573), while also validating what was signed using the EIP-5573 specification (e.g. the signed message hasn't expired and has the correct format).

However, the Lit nodes built-in support for authenticating signed Solana messages is limited to just deriving the Solana public key from the signed data, but they do **not** perform any validation on the what was signed. This means that any data signed by a specific Solana wallet will be accepted, which opens the door for signature malleability and replay attacks.

For example, if your access control requires a message signed by a specific wallet, anyone could take any signed message from that specific wallet and use it to gain access, including all past transactions signed by the wallet. This is possible because the Lit nodes do not validate what was signed or when it was signed; they only validate that the data was signed by the specific wallet.

To implement Solana message authentication using the [SIWS specification](https://github.com/phantom/sign-in-with-solana/tree/main) created by Phantom, and use authenticated SIWS messages to provide access control, please start with the deep dive into how to [implement SIWS authentication](./implementing-siws.md) using Lit Actions.
