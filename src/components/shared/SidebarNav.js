import React from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {object} NavItem
 * @property {string} id - Unique identifier for the navigation item.
 * @property {string} label - The text label displayed for the navigation item.
 * @property {string} [href] - The URL to navigate to when the item is clicked. If `onItemClick` is provided, this is often superseded.
 * @property {React.ReactNode} [icon] - An optional React component or element to display as an icon next to the label.
 * @property {boolean} [disabled] - If true, the navigation item will be visually disabled and not clickable.
 */

// Define the shape of a navigation item using PropTypes
const navItemShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
});

/**
 * SidebarNav Component
 *
 * A highly reusable vertical navigation list component designed for dashboards
 * or detailed section navigation. It uses Tailwind CSS for styling and is
 * highly configurable via props.
 *
 * Design System Mappings & Tailwind Usage:
 * - Colors:
 *   - Primary: Mapped to `bg-orange-500` (similar to #FF6B00 from design system)
 *   - Text: Mapped to `text-gray-900` for main text and `text-gray-700` for inactive links (close to #121212)
 *   - Background: Mapped to `bg-gray-50` (similar to #F8F9FA)
 * - Typography:
 *   - Font Family: Uses Tailwind's `font-sans` which typically maps to 'Inter' or a similar system font.
 *   - Font Size: `text-sm` (0.875rem) for navigation items.
 *   - Font Weight: `font-medium` for default, `font-semibold` for active items.
 * - Spacing: Utilizes Tailwind's default spacing scale (e.g., `p-4`, `space-y-2`, `py-2`, `px-3`).
 *
 * @param {object} props - The component props.
 * @param {NavItem[]} props.items - An array of navigation items to display.
 * @param {string} [props.activeItemId] - The ID of the currently active navigation item. Used to apply active styles.
 * @param {function(string, string): void} [props.onItemClick] - Callback function triggered when a navigation item is clicked. Receives `(itemId, itemHref)` as arguments. If provided, it prevents default link behavior.
 * @param {string} [props.className] - Additional Tailwind CSS classes to apply to the main navigation container.
 * @param {string} [props.itemClassName] - Additional Tailwind CSS classes to apply to each `<li>` navigation item.
 * @param {string} [props.activeItemClassName] - Additional Tailwind CSS classes to apply specifically to the active `<li>` navigation item. These classes will override or extend the default active styles.
 * @param {string} [props.linkClassName] - Additional Tailwind CSS classes to apply to each `<a>` link element within an item.
 * @param {React.ReactNode} [props.headerComponent] - Optional React node to render at the top of the sidebar. Useful for logos, titles, or user profiles.
 * @param {React.ReactNode} [props.footerComponent] - Optional React node to render at the bottom of the sidebar. Useful for version numbers, copyright info, or settings links.
 * @param {string} [props.navAriaLabel="Main sidebar navigation"] - ARIA label for the main navigation element, for accessibility.
 */
const SidebarNav = ({
  items,
  activeItemId,
  onItemClick,
  className,
  itemClassName,
  activeItemClassName,
  linkClassName,
  headerComponent,
  footerComponent,
  navAriaLabel = "Main sidebar navigation",
}) => {
  // Base classes derived from the design system for consistent styling
  const baseContainerClasses = 'w-64 bg-gray-50 text-gray-900 h-full overflow-y-auto flex flex-col font-sans shadow-md';
  const baseListClasses = 'p-4 space-y-2 flex-grow'; // `flex-grow` pushes footer to the bottom if content is short
  const baseItemClasses = 'rounded-md transition-colors duration-200';
  const baseLinkClasses = 'flex items-center gap-3 py-2 px-3 text-sm font-medium'; // gap-3 for 12px spacing between icon and text
  const baseActiveLinkClasses = 'bg-orange-500 text-white font-semibold shadow-sm'; // Using orange-500 for primary color
  const baseInactiveLinkClasses = 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500';
  const disabledLinkClasses = 'opacity-50 cursor-not-allowed';

  return (
    <nav className={`${baseContainerClasses} ${className || ''}`} aria-label={navAriaLabel}>
      {/* Optional Header Component */}
      {headerComponent && <div className="p-4 border-b border-gray-200">{headerComponent}</div>}

      {/* Navigation List */}
      <ul className={baseListClasses}>
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          const isDisabled = item.disabled;

          // Combine base, prop, and active/inactive/disabled classes for the list item
          const itemFinalClasses = `${baseItemClasses} ${itemClassName || ''} ${
            isActive ? (activeItemClassName || '') : ''
          }`;

          // Combine base, prop, and active/inactive/disabled classes for the link
          const linkFinalClasses = `${baseLinkClasses} ${linkClassName || ''} ${
            isActive ? baseActiveLinkClasses : baseInactiveLinkClasses
          } ${isDisabled ? disabledLinkClasses : ''}`;

          const handleClick = (e) => {
            if (isDisabled) {
              e.preventDefault(); // Prevent navigation for disabled items
              return;
            }
            if (onItemClick) {
              e.preventDefault(); // Prevent default link behavior if a custom handler is provided
              onItemClick(item.id, item.href);
            }
            // If `onItemClick` is not provided, the default link behavior (`href`) takes over.
          };

          return (
            <li key={item.id} className={itemFinalClasses}>
              <a
                href={item.href || '#'} // Fallback href for accessibility, allows focus
                onClick={handleClick}
                className={linkFinalClasses}
                aria-current={isActive ? 'page' : undefined} // ARIA for current page
                aria-disabled={isDisabled ? true : undefined} // ARIA for disabled state
                tabIndex={isDisabled ? -1 : 0} // Make disabled links non-focusable by keyboard
              >
                {/* Optional Icon component, ensures it doesn't shrink */}
                {item.icon && <span className="flex-shrink-0 text-lg">{item.icon}</span>}
                {/* Label, allows it to grow and truncates if too long */}
                <span className="flex-grow truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Optional Footer Component, pushed to bottom by flex-grow on ul */}
      {footerComponent && <div className="p-4 border-t border-gray-200 mt-auto">{footerComponent}</div>}
    </nav>
  );
};

SidebarNav.propTypes = {
  items: PropTypes.arrayOf(navItemShape).isRequired,
  activeItemId: PropTypes.string,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  headerComponent: PropTypes.node,
  footerComponent: PropTypes.node,
  navAriaLabel: PropTypes.string,
};

SidebarNav.defaultProps = {
  activeItemId: null,
  onItemClick: null,
  className: '',
  itemClassName: '',
  activeItemClassName: '',
  linkClassName: '',
  headerComponent: null,
  footerComponent: null,
  navAriaLabel: "Main sidebar navigation",
};

export default SidebarNav;