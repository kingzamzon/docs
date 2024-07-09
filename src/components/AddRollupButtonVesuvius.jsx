import React from 'react';

export default function AddRollupButton() {
  const addNetwork = () => {
    const params = [
      {
        chainId: '0x907',
        chainName: 'Chronicle Vesuvius - Lit Protocol Testnet',
        nativeCurrency: {
          name: 'LIT',
          symbol: 'LIT',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-vesuvius-as793xpg5g.t.conduit.xyz'],
        blockExplorerUrls: [
          'https://explorer-vesuvius-as793xpg5g.t.conduit.xyz',
        ],
      },
    ];

    window.ethereum
      .request({ method: 'wallet_addEthereumChain', params })
      .then(() => console.log('Success'))
      .catch(error => console.log('Error', error.message));
  };

  return (
    <button onClick={addNetwork}>Add Chronicle Vesuvius to Metamask</button>
  );
}
