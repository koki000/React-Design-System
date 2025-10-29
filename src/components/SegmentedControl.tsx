import React from 'react';
import './segmented-control.css';

export type SegmentedControlOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={["ds-segmented-control", className].filter(Boolean).join(' ')} role="radiogroup">
      {options.map((opt) => {
        const isActive = value === opt.value;
        const isDisabled = !!opt.disabled;
        return (
          <button
            key={opt.value}
            type="button"
            className={[
              'ds-segment',
              isActive && 'ds-segment--active',
              isDisabled && 'ds-segment--disabled'
            ].filter(Boolean).join(' ')}
            onClick={() => !isDisabled && onChange(opt.value)}
            disabled={isDisabled}
            aria-checked={isActive}
            aria-disabled={isDisabled}
            role="radio"
            tabIndex={isDisabled ? -1 : 0}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
