import React from 'react';
import { Button } from '../components/Button';
import './banner.css';
import { RiCheckboxCircleFill } from '@remixicon/react'
import { RiInformationFill } from '@remixicon/react'
import { RiAlertFill } from '@remixicon/react';
import { RiErrorWarningFill } from '@remixicon/react';
import { RiCloseLine } from '@remixicon/react';

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

const statusIconColors: Record<BannerStatus, Record<'subtle' | 'strong', string>> = {
  info: {
    subtle: 'var(--support-info-strong)',
    strong: 'var(--icon-inverse',
  },
  success: {
    subtle: 'var(--support-success-strong)',
    strong: 'var(--icon-inverse)',
  },
  warning: {
    subtle: 'var(--support-warning-strong)',
    strong: 'var(--icon-on-color-dark)',
  },
  error: {
    subtle: 'var(--support-error-strong)',
    strong: 'var(--icon-inverse)',
  }
};

const statusIcon = (status: BannerStatus, emphasis: 'subtle' | 'strong'): React.ReactNode => {
  const iconColor = statusIconColors[status][emphasis];

  const icons = {
    info: <RiInformationFill size={20} color={iconColor} />,
    success: <RiCheckboxCircleFill size={20} color={iconColor} />,
    warning: <RiAlertFill size={20} color={iconColor} />,
    error: <RiErrorWarningFill size={20} color={iconColor} />,
  };

  return icons[status];
};

export const Banner: React.FC<BannerProps> = ({
  status = 'info',
  emphasis = 'subtle',
  title,
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
      {statusIcon(status, emphasis)}
      <div className="ds-banner__content">
        {title && <div className="ds-banner__title">{title}</div>}
        {linkText && linkHref && (
          <a className="ds-banner__link" href={linkHref}>{linkText}</a>
        )}
      </div>
      {onClose && (
        <Button
          content='icon'
          size='small'
          type={emphasis === 'subtle' ? 'tertiary' : 'inverse'}
          onClick={onClose}
          aria-label="Close"
          icon={
            <RiCloseLine
              size={20}
              style={
                emphasis === 'strong' && status === 'warning'
                  ? { color: 'var(--icon-on-color-dark)' }
                  : undefined
              }
            />
          }
        />
      )}
    </div>
  );
};
