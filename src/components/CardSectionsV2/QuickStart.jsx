import React from "react";
import {
  HomepageCard as Card,
  HomepageSection as Section,
} from "../HomepageComponents";

export default function QuickStartSection({ title, className }) {
  return (
    <Section title={title} className={className}>
      <Card
        title="👩‍💻 Install the Lit JavaScript SDK"
        description="Set up the SDK within your local environment."
        to="/v2/sdk/explanation/installation"
      />
      <Card
        title="👋 Hello World w/ Lit Actions"
        description="Create your first Lit-enabled application using Lit Actions."
        to="/v2/litActions/helloWorld"
      />
      <Card
        title="📁 Encrypt On-Chain Metadata (Polygon)"
        description="Encrypt on-chain meta-data (an NFT description) using the Lit SDK."
        to="/v2/toolsAndExamples/sdkExamples/onchainMetadata/introduction"
      />
      <Card
        title="⌨️ Encrypt and Decrypt Static Content"
        description="Learn how to encrypt data for private storage on the open web."
        to="/v2/sdk/explanation/encryption"
      />
      <Card
        title="🔑 Provisioning access with a JSON Web Token (JWT)"
        description="NextJS Project: Token gate a page using a JWT."
        to="/v2/sdk/examples#nextjs-minimal-jwt-example"
      />
      <Card
        title="✍️ Return a signed API response"
        description="Learn how to fetch and sign data from the open Web using Lit Actions."
        to="/v2/litActions/workingWithActions/usingFetch"
      />
    </Section>
  );
}
