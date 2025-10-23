import React, { useEffect } from 'react';
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

const statusIcon: Record<ToastStatus, React.ReactNode> = {
  info: <span aria-label="Info">ℹ️</span>,
  success: <span aria-label="Success">✔️</span>,
  warning: <span aria-label="Warning">⚠️</span>,
  error: <span aria-label="Error">❌</span>,
};

const Toast: React.FC<ToastProps> = ({
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
  useEffect(() => {
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
  const classes = [baseClass, statusClass, emphasisClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status">
      <span className="ds-toast__icon">{statusIcon[status]}</span>
      <div className="ds-toast__content">
        {title && <div className="ds-toast__title">{title}</div>}
        <div className="ds-toast__message">{message}</div>
        {linkText && linkHref && (
          <a className="ds-toast__link" href={linkHref}>{linkText}</a>
        )}
      </div>
      {onClose && (
        <button className="ds-toast__close" onClick={() => onClose(id)} aria-label="Close">×</button>
      )}
    </div>
  );
};

export default Toast;
