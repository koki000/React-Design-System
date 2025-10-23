import React from 'react';
import './banner.css';

export type BannerStatus = 'info' | 'success' | 'warning' | 'error';
export type BannerEmphasis = 'subtle' | 'strong';

export interface BannerProps {
  status?: BannerStatus;
  emphasis?: BannerEmphasis;
  title?: string;
  message: string;
  linkText?: string;
  linkHref?: string;
  onClose?: () => void;
  className?: string;
}

const statusIcon: Record<BannerStatus, React.ReactNode> = {
  info: <span aria-label="Info">ℹ️</span>,
  success: <span aria-label="Success">✔️</span>,
  warning: <span aria-label="Warning">⚠️</span>,
  error: <span aria-label="Error">❌</span>,
};

const Banner: React.FC<BannerProps> = ({
  status = 'info',
  emphasis = 'subtle',
  title,
  message,
  linkText,
  linkHref,
  onClose,
  className = '',
}) => {
  const baseClass = 'ds-banner';
  const statusClass = `${baseClass}--${status}`;
  const emphasisClass = `${baseClass}--${emphasis}`;
  const classes = [baseClass, statusClass, emphasisClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status">
      <span className="ds-banner__icon">{statusIcon[status]}</span>
      <div className="ds-banner__content">
        {title && <div className="ds-banner__title">{title}</div>}
        <div className="ds-banner__message">{message}</div>
        {linkText && linkHref && (
          <a className="ds-banner__link" href={linkHref}>{linkText}</a>
        )}
      </div>
      {onClose && (
        <button className="ds-banner__close" onClick={onClose} aria-label="Close">×</button>
      )}
    </div>
  );
};

export default Banner;
