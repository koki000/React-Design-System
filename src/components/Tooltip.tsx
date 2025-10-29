import React, { useState, useRef } from 'react';
import './tooltip.css';

export type TooltipTheme = 'default' | 'light';
export type TooltipOrientation = 'none' | 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  text: string;
  theme?: TooltipTheme;
  orientation?: TooltipOrientation;
  maxWidth?: number;
  children: React.ReactNode;
}

const arrowSvgs: Record<TooltipOrientation, React.ReactNode> = {
  none: null,
  top: (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-tooltip__arrow ds-tooltip__arrow--top"><path d="M0 0L6 7L12 0H0Z" fill="currentColor" /></svg>
  ),
  bottom: (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-tooltip__arrow ds-tooltip__arrow--bottom"><path d="M0 7L6 0L12 7H0Z" fill="currentColor" /></svg>
  ),
  left: (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-tooltip__arrow ds-tooltip__arrow--left"><path d="M0 12L7 6L-5.24537e-07 0L0 12Z" fill="currentColor" /></svg>
  ),
  right: (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ds-tooltip__arrow ds-tooltip__arrow--right"><path d="M7 0L-2.62268e-07 6L7 12L7 0Z" fill="currentColor" /></svg>
  ),
};

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  theme = 'default',
  orientation = 'none',
  maxWidth = 240,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // Position tooltip container based on orientation
  let tooltipPositionStyle: React.CSSProperties = { maxWidth };
  let tooltipClass = `ds-tooltip ds-tooltip--${theme} ${visible ? 'ds-tooltip--visible' : ''}`;
  switch (orientation) {
    case 'top':
      tooltipClass += ' ds-tooltip-pos-top';
      tooltipPositionStyle = { ...tooltipPositionStyle, bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 };
      break;
    case 'bottom':
      tooltipClass += ' ds-tooltip-pos-bottom';
      tooltipPositionStyle = { ...tooltipPositionStyle, top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 };
      break;
    case 'left':
      tooltipClass += ' ds-tooltip-pos-left';
      tooltipPositionStyle = { ...tooltipPositionStyle, right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 };
      break;
    case 'right':
      tooltipClass += ' ds-tooltip-pos-right';
      tooltipPositionStyle = { ...tooltipPositionStyle, left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 };
      break;
    default:
      tooltipClass += ' ds-tooltip-pos-bottom';
      tooltipPositionStyle = { ...tooltipPositionStyle, top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 };
      break;
  }

  return (
    <span
      className="ds-tooltip-trigger"
      ref={triggerRef}
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={visible ? 'ds-tooltip' : undefined}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      <span
        className={tooltipClass}
        style={tooltipPositionStyle}
        role="tooltip"
        id="ds-tooltip"
      >
        {orientation !== 'none' && arrowSvgs[orientation]}
        <span className="ds-tooltip__content">{text}</span>
      </span>
    </span>
  );
};
