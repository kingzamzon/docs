import React from 'react';
import { LIT_CHAINS } from '@lit-protocol/constants';
import { paramCase } from 'param-case';

export function Section({
  id,
  title,
  children,
  description,
  className,
  hasSubSections = false,
  HeadingTag = 'h3',
}) {
  return (
    <div className={`supported-chains-section ${className}`}>
      {title && <HeadingTag id={id ?? paramCase(title)}>{title}</HeadingTag>}
      {description && (
        <p className="supported-chains-section-description">{description}</p>
      )}
      <div className="supported-chains-section-content">{children}</div>
    </div>
  );
}

export function Card({ title, litIdentifier, chainId, to }) {
  return (
    <div className="supported-chains-card">
      <a href={to} className="supported-chains-card__link"></a>
      <div className="supported-chains-card__content">
        <h6 className="supported-chains-card__title">{title}</h6>
        <span className="supported-chains-card__description">
          Chain ID: {chainId}
        </span>
        <span className="supported-chains-card__description">
          Lit Identifier: {litIdentifier}
        </span>
      </div>
    </div>
  );
}

const BlockchainCard = ({ chainName, symbol, chainId, litIdentifier }) => (
  <div className="blockchain-card">
    <Card
      title={`${chainName} (${symbol})`}
      chainId={chainId}
      litIdentifier={litIdentifier}
    />
  </div>
);

export default function SupportedBlockchainsSection({ title, className }) {
  const chains = React.useMemo(() => {
    return Object.entries(LIT_CHAINS)
      .filter(([key]) => key !== 'hushedNorthstar')
      .sort(([keyA], [keyB]) =>
        keyA.toLowerCase().localeCompare(keyB.toLowerCase())
      )
      .map(([key, chain]) => ({
        litIdentifier: key,
        chainName: chain.name,
        symbol: chain.symbol,
        chainId: chain.chainId,
      }));
  }, []);

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredChains = React.useMemo(() => {
    return chains.filter(chain =>
      chain.chainName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [chains, searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  if (chains.length === 0) {
    return <div>No chains to display</div>;
  }

  return (
    <Section title={title} className={className}>
      <div className="chain-search-input-container">
        <input
          type="text"
          placeholder="Search by chain name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="chain-search-input"
        />
      </div>

      {filteredChains.length === 0 ? (
        <div>No chains found</div>
      ) : (
        filteredChains.map(chain => (
          <BlockchainCard key={chain.litIdentifier} {...chain} />
        ))
      )}
    </Section>
  );
}
