import React from 'react';

export type BreadcrumbSize = 'small' | 'medium' | 'large';

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  href?: string;
  size?: BreadcrumbSize;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  readOnly?: boolean;
}

const arrowSvg = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-breadcrumb__arrow"><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  size = 'medium',
  isFirst = false,
  isLast = false,
  className = '',
  readOnly = false,
}) => {
  const Tag = href && !readOnly ? 'a' : 'span';
  return (
    <li className={`ds-breadcrumb__item ds-breadcrumb__item--${size} ${isFirst ? 'ds-breadcrumb__item--first' : ''} ${isLast ? 'ds-breadcrumb__item--last' : ''} ${className}`}>
      <Tag
        href={Tag === 'a' ? href : undefined}
        tabIndex={readOnly ? -1 : 0}
        aria-current={isLast ? 'page' : undefined}
        className={`ds-breadcrumb__link${readOnly ? ' ds-breadcrumb__link--readonly' : ''}`}
      >
        {children}
      </Tag>
      {!isLast && <span className="ds-breadcrumb__separator">{arrowSvg}</span>}
    </li>
  );
};

export default BreadcrumbItem;
