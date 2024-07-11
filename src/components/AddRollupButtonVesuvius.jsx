import React from 'react';

export default function AddRollupButton() {
  const addNetwork = () => {
    const params = [
      {
        chainId: '0x907',
        chainName: 'Chronicle Vesuvius - Lit Protocol Testnet',
        nativeCurrency: {
          name: 'Lit Protocol - Chronicle Vesuvius Testnet Token (tstLPX)',
          symbol: 'tstLPX',
          decimals: 18,
        },
        rpcUrls: ['https://vesuvius-rpc.litprotocol.com'],
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
