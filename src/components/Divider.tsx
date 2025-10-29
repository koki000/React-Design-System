import React from 'react';
import './divider.css';

export type DividerStyle = 'subtle' | 'strong' | 'brand';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  style?: DividerStyle;
  orientation?: DividerOrientation;
  className?: string;
  length?: number | string;
  thickness?: number | string;
  margin?: string;
}

const styleToken: Record<DividerStyle, string> = {
  subtle: 'var(--border-subtle)',
  strong: 'var(--border-strong)',
  brand: 'var(--border-brand)',
};

const thicknessToken: Record<DividerOrientation, string> = {
  horizontal: 'var(--stroke-width-s)',
  vertical: 'var(--stroke-width-s)',
};

const defaultLength: Record<DividerOrientation, string> = {
  horizontal: '100%',
  vertical: '32px',
};

export const Divider: React.FC<DividerProps> = ({
  style = 'subtle',
  orientation = 'horizontal',
  className = '',
  length,
  thickness,
  margin,
}) => {
  const isHorizontal = orientation === 'horizontal';
  const dividerStyle: React.CSSProperties = isHorizontal
    ? {
      borderTop: `${thickness || thicknessToken[orientation]} solid ${styleToken[style]}`,
      width: length || defaultLength[orientation],
      margin: margin || 'var(--space-m-24) 0',
    }
    : {
      borderLeft: `${thickness || thicknessToken[orientation]} solid ${styleToken[style]}`,
      height: length || defaultLength[orientation],
      margin: margin || `0 var(--space-m-24)`,
    };

  return <div className={`ds-divider ds-divider--${style} ds-divider--${orientation} ${className}`.trim()} style={dividerStyle} role="separator" aria-orientation={orientation} />;
};
