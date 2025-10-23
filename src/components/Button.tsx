import React from 'react';
import './button.css';

export type ButtonType =
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger-primary"
    | "danger-secondary"
    | "danger-tertiary";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonState = "rest" | "hover" | "active" | "focus" | "disabled" | "loading";
export type ButtonContent = "text" | "leading-icon" | "trailing-icon" | "icon";

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    state?: ButtonState;
    content?: ButtonContent;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    type = "primary",
    size = "medium",
    state = "rest",
    content = "text",
    children,
    icon,
    trailingIcon,
    disabled = false,
    loading = false,
    onClick,
    className = "",
}) => {
    // Compose class names for all variants
    const baseClass = "ds-btn";
    const typeClass = `${baseClass}--${type}`;
    const sizeClass = `${baseClass}--${size}`;
    const stateClass = `${baseClass}--${state}`;
    const contentClass = `${baseClass}--${content}`;
    const classes = [baseClass, typeClass, sizeClass, stateClass, contentClass, className]
        .filter(Boolean)
        .join(" ");

    // Button content rendering
    let buttonContent: React.ReactNode = null;
    if (content === "icon") {
        buttonContent = icon;
    } else if (content === "leading-icon") {
        buttonContent = (
            <>
                {icon}
                <span className="ds-btn__text">{children}</span>
            </>
        );
    } else if (content === "trailing-icon") {
        buttonContent = (
            <>
                <span className="ds-btn__text">{children}</span>
                {trailingIcon}
            </>
        );
    } else {
        buttonContent = <span className="ds-btn__text">{children}</span>;
    }

    return (
        <button
            className={classes}
            disabled={disabled || state === "disabled"}
            aria-disabled={disabled || state === "disabled"}
            aria-busy={loading || state === "loading"}
            onClick={onClick}
            type="button"
        >
            {buttonContent}
            {(loading || state === "loading") && <span className="ds-btn__loader" />}
        </button>
    );
};

export default Button;
