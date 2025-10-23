import React from 'react';
import './link.css';

export type LinkVariant = 'default' | 'subtle' | 'onColor';
export type LinkSize = 'large' | 'medium' | 'small';
export type LinkState = 'rest' | 'hover' | 'active' | 'focus';
export type LinkIconOrientation = 'none' | 'left' | 'right';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  size?: LinkSize;
  state?: LinkState;
  iconOrientation?: LinkIconOrientation;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  variant = 'default',
  size = 'medium',
  state = 'rest',
  iconOrientation = 'none',
  icon,
  trailingIcon,
  children,
  className = '',
  ...props
}) => {
  // Compose class names for all variants
  const baseClass = 'ds-link';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = `${baseClass}--${size}`;
  const stateClass = `${baseClass}--${state}`;
  const iconClass = iconOrientation !== 'none' ? `${baseClass}--icon-${iconOrientation}` : '';
  const classes = [baseClass, variantClass, sizeClass, stateClass, iconClass, className]
    .filter(Boolean)
    .join(' ');

  // Link content rendering
  let linkContent: React.ReactNode = null;
  if (iconOrientation === 'left' && icon) {
    linkContent = (
      <>
        {icon}
        <span className="ds-link__text">{children}</span>
      </>
    );
  } else if (iconOrientation === 'right' && trailingIcon) {
    linkContent = (
      <>
        <span className="ds-link__text">{children}</span>
        {trailingIcon}
      </>
    );
  } else {
    linkContent = <span className="ds-link__text">{children}</span>;
  }

  return (
    <a className={classes} {...props}>
      {linkContent}
    </a>
  );
};
