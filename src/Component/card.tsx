import React from "react";
import "./cars.css";
import { Button } from "./Button";

/* ── Figma variant types ─────────────────────────────────── */

/** Figma property: "Asset Type" — Icon | Image */
export type CardAssetType = "icon" | "image";

/** Figma property: "Variant" — Default (transparent bg) | Stroke (white bg) */
export type CardVariant = "default" | "stroke";

/** Figma property: "Direction" — Horizontal | Vertical layout axis */
export type CardDirection = "horizontal" | "vertical";

/* ── Props ───────────────────────────────────────────────── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma text property: "Heading#280:0" */
  heading?: string;

  /** Figma text property: "Body#280:13" */
  body?: string;

  /** Figma boolean property: "Button#113:15" — show/hide the action button */
  showButton?: boolean;

  /** Label rendered inside the action button */
  buttonText?: string;

  /** Click handler forwarded to the action button */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Figma button variant — "Type" property on the nested Button instance.
   *   Primary   → --color-btn-primary  (VariableID:1:5 = #732727)
   *   Secondary → --color-btn-secondary (VariableID:1:6 = #2da132)
   */
  buttonVariant?: "primary" | "secondary";

  /**
   * Figma button icon — "Icon" property on the nested Button instance.
   *   Yes → renders the 18×18 icon placeholder beside the label
   *   No  → label only
   */
  buttonIcon?: boolean;

  /**
   * Figma variant: "Asset Type"
   *   Icon  → 32×32 icon container (default: info circle SVG from Figma node 33:374)
   *   Image → 160×160 image/placeholder
   */
  assetType?: CardAssetType;

  /**
   * Figma variant: "Variant"
   *   Default → transparent background
   *   Stroke  → white background (--color-card-bg)
   */
  variant?: CardVariant;

  /**
   * Figma variant: "Direction"
   *   Horizontal → HORIZONTAL flex (asset left, body right)
   *   Vertical   → VERTICAL flex (asset top, body below)
   */
  direction?: CardDirection;

  /**
   * Custom icon node for the Icon asset slot.
   * When omitted the exported info-circle SVG from Figma (node 33:374) is used.
   */
  iconNode?: React.ReactNode;

  /** Image src for the Image asset slot */
  imageSrc?: string;

  /** Alt text for the image */
  imageAlt?: string;
}

/* ── Default icon: exact SVG export of Figma node 33:374 ─── */
// Info-circle vector (stroke="currentColor" inherits --color-card-icon)
const DefaultInfoIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 20.3932V15M15 9.60673H15.0135M28.4831 15C28.4831 22.4465 22.4465 28.4831 15 28.4831C7.55346 28.4831 1.51685 22.4465 1.51685 15C1.51685 7.55346 7.55346 1.51685 15 1.51685C22.4465 1.51685 28.4831 7.55346 28.4831 15Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Image placeholder SVG ───────────────────────────────── */
// Shown when assetType="image" and no imageSrc is provided.
// Matches the Figma image placeholder appearance (mountains + sun).
const ImagePlaceholderIcon = () => (
  <svg
    className="card__image-placeholder-icon"
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="44" cy="18" r="7" />
    <path d="M0 48 L20 20 L36 40 L44 30 L64 48Z" />
  </svg>
);

/* ── Component ───────────────────────────────────────────── */

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      heading = "Title",
      body = "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
      showButton = true,
      buttonText = "Button",
      onButtonClick,
      buttonVariant = "primary",
      buttonIcon = false,
      assetType = "icon",
      variant = "default",
      direction = "horizontal",
      iconNode,
      imageSrc,
      imageAlt = "",
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "card",
      `card--${direction}`,
      variant === "stroke" ? "card--stroke" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {/* ── Asset area ──────────────────────────────────── */}
        {assetType === "icon" ? (
          /* Figma: Info frame 32×32, VariableID:8686058b…/5613:412 color */
          <div className="card__icon-container" aria-hidden="true">
            {iconNode ?? <DefaultInfoIcon />}
          </div>
        ) : (
          /* Figma: Image frame 160×160, fill=VariableID:c39ca5ae…/4317:846 */
          <div className="card__image-container">
            {imageSrc ? (
              <img className="card__image" src={imageSrc} alt={imageAlt} />
            ) : (
              <ImagePlaceholderIcon />
            )}
          </div>
        )}

        {/* ── Body ────────────────────────────────────────── */}
        {/* Figma: VERTICAL layout, gap=VariableID:1:7, layoutGrow=1 */}
        <div className="card__body">
          {/* Figma: Text frame — VERTICAL, gap=VariableID:1d726f3f…/564:255 */}
          <div className="card__text">
            {/* Figma: Title node — Inter 24/600, fills=VariableID:36:53 */}
            <h3 className="card__heading">{heading}</h3>
            {/* Figma: Body text node — Inter 16/400, fills=VariableID:36:53 */}
            <p className="card__body-text">{body}</p>
          </div>

          {/* Figma: Button instance — fills=VariableID:1:5, text fills=VariableID:1:8 */}
          {showButton && (
            <Button
              text={buttonText}
              onClick={onButtonClick}
              variant={buttonVariant}
              icon={buttonIcon}
            />
          )}
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";
