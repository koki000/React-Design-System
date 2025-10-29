// Breadcrumb.tsx
import React from 'react';
import './breadcrumb.css';

export type BreadcrumbSize = 'small' | 'medium' | 'large';

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
  readOnly?: boolean;
  className?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemData[];
  size?: BreadcrumbSize;
  className?: string;
}

const arrowSvg = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-breadcrumb__arrow">
    <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, size = 'medium', className = '' }) => {
  return (
    <nav className={`ds-breadcrumb ds-breadcrumb--${size} ${className}`} aria-label="Breadcrumb">
      <ol className="ds-breadcrumb__list">
        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;
          const Tag = item.href && !item.readOnly ? 'a' : 'span';
          
          return (
            <li 
              key={idx}
              className={`ds-breadcrumb__item ds-breadcrumb__item--${size} ${isFirst ? 'ds-breadcrumb__item--first' : ''} ${isLast ? 'ds-breadcrumb__item--last' : ''} ${item.className || ''}`}
            >
              <Tag
                href={Tag === 'a' ? item.href : undefined}
                tabIndex={item.readOnly ? -1 : 0}
                aria-current={isLast ? 'page' : undefined}
                className={`ds-breadcrumb__link${item.readOnly ? ' ds-breadcrumb__link--readonly' : ''}`}
              >
                {item.label}
              </Tag>
              {!isLast && <span className="ds-breadcrumb__separator">{arrowSvg}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};