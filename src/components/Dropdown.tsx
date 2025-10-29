import React, { useState, useRef, useEffect } from 'react';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import './dropdown.css';

export interface DropdownProps {
  items: DropdownItemProps[];
  open?: boolean;
  disabled?: boolean;
  size?: 'small' | 'large';
  trigger?: 'hover' | 'click';
  placement?: 'top' | 'bottom';
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode; // trigger element
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  open: controlledOpen,
  disabled = false,
  size = 'small',
  trigger = 'click',
  placement = 'bottom',
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isControlled = controlledOpen !== undefined;

  useEffect(() => {
    if (!isControlled) return;
    setOpen(controlledOpen!);
  }, [controlledOpen, isControlled]);

  useEffect(() => {
    if (trigger === 'click') {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          if (!isControlled) setOpen(false);
          onOpenChange?.(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, isControlled, onOpenChange]);

  const handleTrigger = (e: React.MouseEvent | React.FocusEvent | React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (trigger === 'click') {
      if (!isControlled) setOpen(o => !o);
      onOpenChange?.(!open);
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    if (trigger === 'hover') {
      if (!isControlled) setOpen(true);
      onOpenChange?.(true);
    }
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    if (trigger === 'hover') {
      if (!isControlled) setOpen(false);
      onOpenChange?.(false);
    }
  };

  return (
    <div
      className={`ds-dropdown ds-dropdown--${size}${disabled ? ' ds-dropdown--disabled' : ''}`}
      ref={ref}
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      <div
        className="ds-dropdown__trigger"
        onClick={trigger === 'click' ? handleTrigger : undefined}
        tabIndex={0}
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
        style={{ display: 'inline-block', cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {children}
      </div>
      {open && (
        <div 
          className={`ds-dropdown__menu ds-dropdown__menu--${placement}`}
          role="menu"
        >
          {items.map((item, idx) => (
            <DropdownItem key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};