import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { RiCloseLine } from '@remixicon/react';
import { Button } from './Button';
import './modal.css';

export type ModalType = 'passive' | 'transactional';
export type OkType = 'default' | 'primary' | 'danger';

export interface ModalProps {
    title?: React.ReactNode;
    visible: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    okType?: OkType;
    type?: ModalType; // passive or transactional
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    visible,
    onOk,
    onCancel,
    okText = 'OK',
    cancelText = 'Cancel',
    okType = 'primary',
    type = 'transactional',
    children,
    className = '',
    icon,
}) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && visible) {
                onCancel?.();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [visible, onCancel]);

    // Add transition class for fade/scale effect
    const overlayClass = `ds-modal-overlay${visible ? ' ds-modal--visible' : ''}`;
    const modalClass = `ds-modal ds-modal--${type} ${className}${visible ? ' ds-modal--visible' : ''}`;

    const okButtonType = okType === 'danger' ? 'primary-danger' : okType === 'primary' ? 'primary' : 'secondary';

    const content = (
        <div className={overlayClass} ref={overlayRef} onMouseDown={(e) => e.target === overlayRef.current && onCancel?.()}>
            <div className={modalClass} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Modal'}>
                <div className="ds-modal__header">
                    <div className="ds-modal__header-content">
                        {icon && <span className="ds-modal__icon">{icon}</span>}
                        <h3 className="ds-modal__title">{title}</h3>
                    </div>
                    <Button content='icon' aria-label="Close" type="tertiary" onClick={() => onCancel?.()} icon={<RiCloseLine size={20} />}></Button>
                </div>
                <div className="ds-modal__body">{children}</div>
                <div className="ds-modal__footer">
                    {type === 'transactional' && (
                        <Button type="tertiary" onClick={() => onCancel?.()}>{cancelText}</Button>
                    )}
                    <Button type={okButtonType as any} onClick={() => onOk?.()}>{okText}</Button>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
};

// Global confirm utility
export interface ConfirmOptions {
    title?: string;
    content?: React.ReactNode | string;
    okText?: string;
    cancelText?: string;
    okType?: OkType;
    onOk?: () => void;
    onCancel?: () => void;
    icon?: React.ReactNode;
}

export const confirm = (opts: ConfirmOptions) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    let visible = true;

    const close = () => {
        visible = false;
        root.unmount();
        if (container.parentNode) container.parentNode.removeChild(container);
    };

    const handleOk = () => {
        try { opts.onOk?.(); } finally { close(); }
    };
    const handleCancel = () => {
        try { opts.onCancel?.(); } finally { close(); }
    };

    const element = (
        <Modal
            visible={visible}
            title={opts.title}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={opts.okText}
            cancelText={opts.cancelText}
            okType={opts.okType ?? 'primary'}
            type="transactional"
            icon={opts.icon}
        >
            {opts.content}
        </Modal>
    );

    root.render(element);

    return {
        destroy: close,
    };
};
