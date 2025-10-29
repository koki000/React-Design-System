import React from 'react';
import './checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  indeterminate?: boolean;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  disabled = false,
  label,
  onChange,
  className = '',
  indeterminate = false,
  id,
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e.target.checked);
    }
  };

  const checkboxId = id || React.useId();

  return (
    <div className={`ds-checkbox ${disabled ? 'ds-checkbox--disabled' : ''} ${className}`}>
      <label 
        htmlFor={checkboxId}
        className="ds-checkbox__label"
      >
        <div className="ds-checkbox__input-wrapper">
          <input
            ref={checkboxRef}
            type="checkbox"
            id={checkboxId}
            className="ds-checkbox__input"
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
          />
          <div 
            className={`ds-checkbox__custom ${checked ? 'ds-checkbox__custom--checked' : ''} ${indeterminate ? 'ds-checkbox__custom--indeterminate' : ''}`}
            role="presentation"
          />
        </div>
        {label && <span className="ds-checkbox__text">{label}</span>}
      </label>
    </div>
  );
};