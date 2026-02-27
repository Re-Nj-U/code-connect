import React from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma variant: Type — controls background color token */
  variant?: ButtonVariant;
  /** Figma variant: Icon — renders the 18×18 icon placeholder before the label */
  icon?: boolean;
  /** Figma text property: Text — button label */
  text?: string;
  /** Slot for a custom icon node; takes precedence over the placeholder when icon=true */
  iconNode?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      icon = false,
      text = "Button",
      iconNode,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const variantClass =
      variant === "secondary" ? "btn--secondary" : "btn--primary";

    return (
      <button
        ref={ref}
        className={["btn", variantClass, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {icon && (iconNode ?? <span className="btn__icon" aria-hidden="true" />)}
        {children ?? text}
      </button>
    );
  },
);

Button.displayName = "Button";
