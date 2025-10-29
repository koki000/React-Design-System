import React from 'react';
import { Checkbox } from './Checkbox';

export interface DropdownItemProps {
  label: string;
  icon?: React.ReactNode;
  category?: boolean;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  icon,
  category = false,
  checkbox = false,
  checked = false,
  disabled = false,
  active = false,
  onClick,
}) => {
  if (category) {
    return (
      <div className="ds-dropdown__category" aria-disabled="true">
        {label}
      </div>
    );
  }
  return (
    <div
      className={`ds-dropdown__item${active || checked ? ' ds-dropdown__item--active' : ''}${disabled ? ' ds-dropdown__item--disabled' : ''}`}
      role="option"
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
    >
      {icon && <span className="ds-dropdown__item-icon">{icon}</span>}
      {checkbox && (
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onClick}
        />
      )}
      <span className="ds-dropdown__item-label">{label}</span>
    </div>
  );
};

export default DropdownItem;