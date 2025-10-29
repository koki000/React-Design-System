import React from 'react';
import { TabItem, TabState } from './TabItem';
import './tab.css';

export type TabPosition = 'left' | 'center' | 'right';

export interface TabBarProps {
  tabs: Array<{ label: string; disabled?: boolean }>;
  activeIndex: number;
  onChange: (index: number) => void;
  tabPosition?: TabPosition;
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeIndex, onChange, tabPosition = 'left', className = '' }) => {
  const alignmentClass = `ds-tabbar--${tabPosition}`;

  return (
    <div className={["ds-tabbar", alignmentClass, className].filter(Boolean).join(' ')} role="tablist">
      {tabs.map((tab, idx) => {
        let state: TabState = 'inactive';
        if (tab.disabled) state = 'disabled';
        else if (activeIndex === idx) state = 'active';
        return (
          <TabItem
            key={tab.label}
            label={tab.label}
            state={state}
            onClick={() => !tab.disabled && onChange(idx)}
            index={idx}
          />
        );
      })}
    </div>
  );
};
