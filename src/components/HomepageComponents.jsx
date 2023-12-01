import React from 'react';
import { paramCase } from 'param-case';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export function HomepageSection({
  id,
  title,
  children,
  description,
  className,
  hasSubSections = false,
  HeadingTag = 'h3',
}) {
  return (
    <div
      className={clsx(
        'homepage-section',
        hasSubSections && 'has-sub-sections',
        className
      )}
    >
      {title && <HeadingTag id={id ?? paramCase(title)}>{title}</HeadingTag>}
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </div>
  );
}

export function HomepageCard({ id, icon, title, description, to }) {
  return (
    // <Link to={to} className="homepage-card">
    //   {icon && <div className="icon">{icon}</div>}
    //   <div className="homepage-card__content">
    //     <h6 className="homepage-card__title">{title}</h6>
    //     <span className="homepage-card__description">{description}</span>
    //   </div>
    // </Link>
    <div className="homepage-card">
      <a href={to} className='homepage-card__link'></a>
       <div className="homepage-card__content">
        {icon && <span className="homepage-card__icon">{icon}</span>}
        <h6 className="homepage-card__title">{title}</h6>
        <span className="homepage-card__description">{description}</span>
      </div>
    </div>
  );
}
