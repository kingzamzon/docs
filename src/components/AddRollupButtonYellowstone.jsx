import React from 'react';

export default function AddRollupButton() {
  const addNetwork = () => {
    const params = [
      {
        chainId: '0x2ac54',
        chainName: 'Chronicle Yellowstone - Lit Protocol Testnet',
        nativeCurrency: {
          name: 'Lit Protocol - Chronicle Vesuvius Testnet Token (tstLPX)',
          symbol: 'tstLPX',
          decimals: 18,
        },
        rpcUrls: ['https://yellowstone-rpc.litprotocol.com'],
        blockExplorerUrls: [
          'https://explorer-chronicle-yellowstone-testnet-9qgmzfcohk.t.conduit.xyz',
        ],
      },
    ];

    window.ethereum
      .request({ method: 'wallet_addEthereumChain', params })
      .then(() => console.log('Success'))
      .catch(error => console.log('Error', error.message));
  };

  return (
    <button onClick={addNetwork}>Add Chronicle Yellowstone to Metamask</button>
  );
}
