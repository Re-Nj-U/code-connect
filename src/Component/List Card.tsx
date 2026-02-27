import React from "react";
import "./List Card.css";

export interface ListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Figma text property: "Text" (componentPropertyDefinitions key "Text#42:0").
   * Rendered as the card's primary title.
   */
  text?: string;

  /**
   * Figma variant: "Dissabled"
   *   Default  → false  → background: var(--color-list-card-default)
   *   Variant2 → true   → background: var(--color-list-card-disabled)
   */
  disabled?: boolean;

  /**
   * Left icon slot (Figma node "Icon", colored with --color-list-icon).
   * When omitted, a "Family" SVG placeholder matching the Figma glyph is rendered.
   * Pass any React node (e.g. a Font Awesome <FontAwesomeIcon icon={faFamily} />) to override.
   */
  iconNode?: React.ReactNode;

  /**
   * Right navigation chevron slot (Figma node "Navigaton").
   * When omitted, a CSS-only chevron placeholder is rendered.
   */
  chevronNode?: React.ReactNode;
}

export const ListCard = React.forwardRef<HTMLDivElement, ListCardProps>(
  (
    {
      text = "My Family",
      disabled = false,
      iconNode,
      chevronNode,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "list-card",
          disabled ? "list-card--disabled" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Container → Body (Figma HORIZONTAL auto-layout row) */}
        <div className="list-card__body">
          {/* Icon — Figma node "Icon", fills=VariableID:1:5, size=18×18, radius=100 */}
          <div className="list-card__icon" aria-hidden="true">
            {iconNode ?? (
              // Exact SVG export of Font Awesome 6 Pro "Family" glyph (Figma node 36:138).
              // fill="currentColor" inherits --color-list-icon from the parent .list-card__icon.
              // Replace via iconNode prop once your icon library is wired up.
              <svg
                className="list-card__icon-placeholder"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M7.06809 2.6965C7.06809 3.63619 6.53696 4.49416 5.7607 4.98444C4.94358 5.43385 3.92218 5.43385 3.14591 4.98444C2.32879 4.49416 1.83852 3.63619 1.83852 2.6965C1.83852 1.79767 2.32879 0.939689 3.14591 0.449416C3.92218 0 4.94358 0 5.7607 0.449416C6.53696 0.939689 7.06809 1.79767 7.06809 2.6965ZM3.51362 8.57977C2.85992 8.57977 2.28794 9.11089 2.20623 9.80545L2.0428 11.8074C2.00195 12.1751 2.32879 12.5019 2.6965 12.5019H2.81907H5.27043C5.14786 12.9514 5.107 13.3599 5.107 13.8093V14.463H3.79961V20.0195C3.79961 20.5914 3.35019 21 2.81907 21C2.24708 21 1.83852 20.5914 1.83852 20.0195V14.3405C0.735409 13.9319 0 12.8696 0.0817121 11.644L0.245136 9.64202C0.40856 7.92607 1.83852 6.61868 3.51362 6.61868H5.35214C5.71984 6.61868 6.08755 6.70039 6.4144 6.82296C6.4144 6.98638 6.4144 7.14981 6.4144 7.27237C6.4144 7.76265 6.49611 8.21206 6.65953 8.57977H5.35214H4.45331H3.51362ZM12.9514 7.27237C12.9514 7.19066 12.9105 7.10895 12.9105 6.98638C13.3191 6.7821 13.7685 6.61868 14.2588 6.61868H15.5253C16.7101 6.61868 17.7315 7.39494 18.0584 8.53891L19.6518 14.1362C19.8969 14.9533 19.2432 15.7704 18.3852 15.7704H17.5272V20.0195C17.5272 20.5914 17.0778 21 16.5467 21C15.9747 21 15.5661 20.5914 15.5661 20.0195V15.7704H14.0136C14.177 15.3619 14.2588 14.9533 14.2588 14.463V13.8093H17.5272L16.179 9.07004C16.0973 8.78405 15.8113 8.57977 15.5253 8.57977H14.9125H14.2588H12.6654C12.8288 8.21206 12.9514 7.76265 12.9514 7.27237ZM17.5272 2.6965C17.5272 3.63619 16.9961 4.49416 16.2198 4.98444C15.4027 5.43385 14.3813 5.43385 13.6051 4.98444C12.7879 4.49416 12.2977 3.63619 12.2977 2.6965C12.2977 1.79767 12.7879 0.939689 13.6051 0.449416C14.3813 0 15.4027 0 16.2198 0.449416C16.9961 0.939689 17.5272 1.79767 17.5272 2.6965ZM9.68288 9.23346C8.94747 9.23346 8.33463 8.86576 7.96693 8.25292C7.59922 7.68093 7.59922 6.90467 7.96693 6.29183C8.33463 5.71984 8.94747 5.31128 9.68288 5.31128C10.3774 5.31128 10.9903 5.71984 11.358 6.29183C11.7257 6.90467 11.7257 7.68093 11.358 8.25292C10.9903 8.86576 10.3774 9.23346 9.68288 9.23346ZM10.9903 13.8093C10.9903 13.1148 10.3774 12.5019 9.68288 12.5019C8.94747 12.5019 8.37549 13.1148 8.37549 13.8093V14.463C8.37549 14.8307 8.66148 15.1167 9.02918 15.1167H9.68288H10.3366C10.6634 15.1167 10.9903 14.8307 10.9903 14.463V13.8093ZM12.9514 14.463C12.9514 15.4436 12.3794 16.3016 11.6031 16.751C11.6031 16.8735 11.644 16.9961 11.644 17.0778V19.6926C11.644 20.428 11.0311 21 10.3366 21H9.02918C8.29377 21 7.72179 20.428 7.72179 19.6926V17.0778C7.72179 16.9961 7.72179 16.8735 7.72179 16.751C6.94553 16.3016 6.4144 15.4436 6.4144 14.463V13.8093C6.4144 12.0117 7.84436 10.5409 9.68288 10.5409C11.4805 10.5409 12.9514 12.0117 12.9514 13.8093V14.463Z" />
              </svg>
            )}
          </div>

          {/* Content — Figma node "Content", layoutGrow=1, itemSpacing=4px */}
          <div className="list-card__content">
            {/* Title — Figma node "Title", fills=VariableID:36:53, Inter 12px */}
            <span className="list-card__title">{children ?? text}</span>
          </div>

          {/* Navigation — Figma node "Navigaton", fills=VariableID:36:53, size=18 */}
          <div className="list-card__navigation" aria-hidden="true">
            {chevronNode ?? <span className="list-card__chevron-placeholder" />}
          </div>
        </div>
      </div>
    );
  },
);

ListCard.displayName = "ListCard";
