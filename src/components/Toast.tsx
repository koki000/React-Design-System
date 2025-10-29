import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { RiCheckboxCircleFill } from '@remixicon/react'
import { RiInformationFill } from '@remixicon/react'
import { RiAlertFill } from '@remixicon/react';
import { RiErrorWarningFill } from '@remixicon/react';
import { RiCloseLine } from '@remixicon/react';
import './toast.css';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error';
export type ToastEmphasis = 'subtle' | 'strong';

export interface ToastProps {
    id: string;
    status?: ToastStatus;
    emphasis?: ToastEmphasis;
    title?: string;
    message: string;
    linkText?: string;
    linkHref?: string;
    onClose?: (id: string) => void;
    delay?: number;
    className?: string;
}

const statusIconColors: Record<ToastStatus, Record<'subtle' | 'strong', string>> = {
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

const statusIcon = (status: ToastStatus, emphasis: 'subtle' | 'strong'): React.ReactNode => {
    const iconColor = statusIconColors[status][emphasis];

    const icons = {
        info: <RiInformationFill size={20} color={iconColor} />,
        success: <RiCheckboxCircleFill size={20} color={iconColor} />,
        warning: <RiAlertFill size={20} color={iconColor} />,
        error: <RiErrorWarningFill size={20} color={iconColor} />,
    };

    return icons[status];
};

export const Toast: React.FC<ToastProps> = ({
    id,
    status = 'info',
    emphasis = 'subtle',
    title,
    message,
    linkText,
    linkHref,
    onClose,
    delay = 4000,
    className = '',
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        if (delay > 0) {
            const timer = setTimeout(() => {
                onClose?.(id);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [id, delay, onClose]);

    const baseClass = 'ds-toast';
    const statusClass = `${baseClass}--${status}`;
    const emphasisClass = `${baseClass}--${emphasis}`;
    const visibleClass = visible ? 'ds-toast--visible' : '';
    const classes = [baseClass, statusClass, emphasisClass, visibleClass, className].filter(Boolean).join(' ');

    return (
        <div className={classes} role="status">
            {statusIcon(status, emphasis)}
            <div className="ds-toast__content">
                {title && <div className="ds-toast__title">{title}</div>}
                <div className="ds-toast__message">{message}</div>
                {linkText && linkHref && (
                    <a className="ds-toast__link" href={linkHref}>{linkText}</a>
                )}
            </div>
            {onClose && (
        <Button
          content='icon'
          size='small'
          type={emphasis === 'subtle' ? 'tertiary' : 'inverse'}
          onClick={() => onClose(id)}
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
