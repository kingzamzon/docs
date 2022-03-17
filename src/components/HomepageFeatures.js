import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Easy to Use",
    Svg: require("../../static/img/undraw_programmer_re_owql.svg").default,
    description: (
      <>
        Integrate the Lit JS SDK to get started with just a few lines of code.
        No need to set anything else up.
      </>
    ),
  },
  {
    title: "Fast",
    Svg: require("../../static/img/undraw_fast_loading_re_8oi3.svg").default,
    description: (
      <>
        The Lit network is lightning fast so your users won't notice any delay
      </>
    ),
  },
  {
    title: "Decentralized",
    Svg: require("../../static/img/undraw_travel_together_re_kjf2.svg").default,
    description: (
      <>
        Lit Protocol is the only decentralized access control network. Other
        solutions involve a centralized provider to gate access to locked
        content.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
