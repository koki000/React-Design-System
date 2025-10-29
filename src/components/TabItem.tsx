import React from 'react';
import './tab.css';

export type TabState = 'active' | 'inactive' | 'hover' | 'disabled' | 'focus';

export interface TabItemProps {
  label: string;
  state?: TabState;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export const TabItem: React.FC<TabItemProps> = ({ label, state = 'inactive', onClick, className = '', index }) => {
  const classes = [
    'ds-tab',
    `ds-tab--${state}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={state !== 'disabled' ? onClick : undefined}
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-selected={state === 'active'}
      aria-disabled={state === 'disabled'}
      role="tab"
      data-index={index}
    >
      <span className="ds-tab__label">{label}</span>
      {state === 'active' && <span className="ds-tab__indicator" />}
    </button>
  );
};
