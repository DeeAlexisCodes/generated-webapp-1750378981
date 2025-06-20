import React from 'react';
import PropTypes from 'prop-types';

/**
 * MainNav component for top-level navigation.
 * It's highly reusable and configurable via props, styled with Tailwind CSS.
 * Adheres to semantic HTML and accessibility best practices.
 */
const MainNav = ({
  navItems,
  activePath,
  className,
  linkClassName,
  activeLinkClassName,
  direction = 'row', // 'row' for horizontal, 'col' for vertical
  itemSpacing = 32, // Spacing between items in pixels (e.g., 8, 16, 32, 64)
}) => {
  // Determine the flex direction based on the 'direction' prop
  const flexDirectionClass = direction === 'col' ? 'flex-col' : 'flex-row';

  // Calculate the Tailwind spacing unit based on the pixel value
  // Tailwind's default spacing scale: N * 4px.
  // So, 8px = space-2, 16px = space-4, 32px = space-8 etc.
  const tailwindSpacingUnit = itemSpacing / 4;
  const spacingClass = direction === 'col' ? `space-y-${tailwindSpacingUnit}` : `space-x-${tailwindSpacingUnit}`;

  return (
    // Semantic <nav> element with an ARIA label for accessibility
    <nav className={`MainNav ${className}`} aria-label="Main navigation">
      {/*
        Unordered list for navigation items.
        - 'flex' for layout
        - Dynamic 'flexDirectionClass' for horizontal/vertical layout
        - Dynamic 'spacingClass' for space between items
        - 'items-start' for column layout, 'items-center' for row layout to align items
        - 'list-none', 'p-0', 'm-0' to reset default list styles
      */}
      <ul className={`flex ${flexDirectionClass} ${spacingClass} ${direction === 'col' ? 'items-start' : 'items-center'} list-none p-0 m-0`}>
        {navItems.map((item) => {
          const isActive = activePath === item.href;

          // Combine base, custom, and active link classes
          const linkClasses = `
            text-text                  /* Default text color from design system */
            text-base                  /* Body text size from typography */
            font-normal                /* Default font weight */
            hover:text-primary         /* Hover state color from primary design system color */
            transition-colors          /* Smooth transition for color changes */
            duration-200               /* Transition speed */
            ease-in-out                /* Transition timing function */
            px-3 py-2                  /* Padding: 12px horizontal (px-3), 8px vertical (py-2) */
            rounded-md                 /* Slightly rounded corners for links */
            whitespace-nowrap          /* Prevents links from wrapping if text is long */
            ${linkClassName || ''}     /* Custom classes for all links */
            ${isActive ? 'text-primary font-bold ' + (activeLinkClassName || '') : ''} /* Active state styling */
          `.replace(/\s+/g, ' ').trim(); // Clean up multiple spaces and trim

          return (
            // Flex-shrink-0 prevents list items from shrinking when space is limited
            <li key={item.href} className="flex-shrink-0">
              <a
                href={item.href}
                className={linkClasses}
                // 'aria-current="page"' visually and semantically identifies the active page for screen readers
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// PropTypes for robust prop validation and documentation
MainNav.propTypes = {
  /**
   * An array of navigation items. Each item should have a 'label' (string) and 'href' (string).
   * Example: `[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }]`
   */
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * The current active path (e.g., '/products') to highlight the corresponding navigation item.
   * If no match, no item will be marked active by default component styling.
   */
  activePath: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply directly to the main `<nav>` element.
   * Useful for layout, background, or outer styling.
   */
  className: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply to each `<a>` (link) element within the navigation.
   * These classes will be merged with the component's default link styles.
   */
  linkClassName: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply specifically to the active `<a>` element.
   * These classes will override or extend the component's default active link styles (e.g., 'text-primary', 'font-bold').
   */
  activeLinkClassName: PropTypes.string,
  /**
   * The layout direction of the navigation items.
   * - 'row': Items are arranged horizontally (default).
   * - 'col': Items are arranged vertically.
   * @default 'row'
   */
  direction: PropTypes.oneOf(['row', 'col']),
  /**
   * The spacing between navigation items in pixels. This value maps to Tailwind's spacing scale.
   * For example, `itemSpacing={16}` results in 16px spacing (`space-x-4` or `space-y-4`).
   * Adheres to the design system's common spacing values (8px, 16px, 24px, 32px, etc.).
   * @default 32 (pixels, which translates to Tailwind's `space-8` for 32px)
   */
  itemSpacing: PropTypes.number,
};

// Default props ensure the component works even if some props are not provided
MainNav.defaultProps = {
  activePath: '',
  className: '',
  linkClassName: '',
  activeLinkClassName: '',
  direction: 'row',
  itemSpacing: 32, // Default to 32px spacing between items
};

export default MainNav;