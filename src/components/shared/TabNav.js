import React from 'react';
import PropTypes from 'prop-types';

/**
 * TabNav Component
 *
 * A highly reusable horizontal navigation component designed for switching between
 * different content views within a section. It adheres to the provided design system
 * for colors, typography, and spacing, and uses Tailwind CSS for styling.
 *
 * This component handles the rendering of tabs and managing the active state through props.
 * It does NOT manage the content associated with each tab; that responsibility lies
 * with the parent component using `TabNav` and the `onTabChange` callback.
 */
const TabNav = ({
  tabs,
  activeTabId,
  onTabChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  underlineClassName = '',
}) => {
  // --- Design System Mappings (Conceptual for Tailwind CSS) ---
  // In a real project, these colors and fonts would be configured in your `tailwind.config.js`.
  // For demonstration, we use approximate standard Tailwind classes:
  //
  // tailwind.config.js (example configuration based on design system):
  // module.exports = {
  //   theme: {
  //     extend: {
  //       colors: {
  //         primary: '#FF6B00',    // Design System: accent / primary
  //         secondary: '#555',     // Design System: secondary text
  //         text: '#121212',       // Design System: main text
  //         background: '#F8F9FA', // Design System: main background
  //       },
  //       fontFamily: {
  //         sans: ['Inter', 'sans-serif'], // Design System: default font
  //         // Add others as needed: mono: ['Menlo', 'Consolas', 'monospace']
  //       },
  //       spacing: { // Customize spacing if needed, or rely on default Tailwind units
  //         'px': '1px',
  //         '0.5': '2px', // Useful for thin lines like the underline
  //         '1': '4px',
  //         '2': '8px',   // Matches design system base_unit
  //         '3': '12px',  // 1.5 * 8px
  //         '4': '16px',  // 2 * 8px
  //         '6': '24px',  // 3 * 8px
  //       }
  //     }
  //   }
  // }
  //
  // --- Tailwind Classes Mapping to Design System ---
  // - primary color (#FF6B00): We will use `text-orange-600`, `bg-orange-600`, `ring-orange-600` as close approximations.
  // - secondary color (#555): We will use `text-gray-600`.
  // - text color (#121212): We will use `text-gray-900`.
  // - font families: `font-sans` ensures 'Inter' (if configured in Tailwind) is used.
  // - spacing: `py-3` (12px), `px-4` (16px), `h-0.5` (2px) align with multiples of the 8px base unit.
  // ----------------------------------------------------

  return (
    <nav
      className={`relative font-sans ${className}`}
      aria-label="Section navigation tabs"
    >
      <ul
        role="tablist"
        className="flex flex-wrap border-b border-gray-200" // Subtle separator line for the tab list
      >
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;

          return (
            <li key={tab.id} role="presentation">
              <button
                id={`tab-${tab.id}`}
                role="tab"
                // `aria-controls` should point to the ID of the content panel that this tab controls.
                // This is crucial for screen readers to understand the relationship.
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                // Apply base styles for all tabs
                className={`
                  relative
                  py-3                  // Vertical padding (approx 12px based on 8px base unit)
                  px-4                  // Horizontal padding (approx 16px based on 8px base unit)
                  text-base             // Base font size (1rem, design system 'body_text')
                  font-medium           // Medium font weight for emphasis on tabs
                  text-gray-600         // Inactive tab text color (design system secondary: #555)
                  hover:text-orange-600 // Hover text color (design system primary: #FF6B00)
                  focus:outline-none    // Remove default browser focus outline
                  focus:ring-2          // Focus ring for keyboard accessibility
                  focus:ring-orange-600 // Focus ring color (design system primary: #FF6B00)
                  focus:ring-offset-2   // Offset the focus ring from the element
                  transition-colors     // Smooth color transitions on hover/focus
                  duration-200          // Transition duration
                  whitespace-nowrap     // Prevent tab labels from wrapping to next line
                  ${tabClassName}        // Custom classes applied to all tab buttons
                  ${isActive ? `text-orange-600 ${activeTabClassName}` : ''} // Active tab specific styles
                `}
                // Only the active tab is in the natural tab order for keyboard navigation.
                // Users typically use arrow keys to navigate between tabs once focused on the tablist.
                tabIndex={isActive ? 0 : -1}
              >
                {tab.label}
                {isActive && (
                  // Active tab underline indicator
                  <span
                    className={`
                      absolute
                      bottom-0                  // Position at the very bottom of the button
                      left-0                    // Start from the left edge of the button
                      w-full                    // Span the full width of the tab button
                      h-0.5                     // Thickness of the underline (2px, based on 8px base unit)
                      bg-orange-600             // Underline color (design system primary: #FF6B00)
                      ${underlineClassName}     // Custom classes for the underline
                    `}
                  ></span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

TabNav.propTypes = {
  /**
   * An array of tab objects. Each object must have an `id` (string) and a `label` (string).
   * Example: `[{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Product Details' }]`
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * The `id` of the currently active tab. This prop controls which tab is highlighted.
   */
  activeTabId: PropTypes.string.isRequired,
  /**
   * Callback function triggered when a tab is clicked.
   * It receives the `id` of the newly selected tab as its only argument.
   * Signature: `(tabId: string) => void`
   */
  onTabChange: PropTypes.func.isRequired,
  /**
   * Additional Tailwind CSS classes to apply to the main `nav` container.
   * Useful for external positioning, background, or border adjustments.
   */
  className: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply to all individual tab `button` elements.
   * These classes will be present on both active and inactive tabs.
   */
  tabClassName: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply *only* to the active tab `button` element.
   * These classes will be merged with and potentially override `tabClassName` for the active tab.
   */
  activeTabClassName: PropTypes.string,
  /**
   * Additional Tailwind CSS classes to apply to the active tab's underline indicator `span`.
   * Useful for changing its color, height, or other visual properties.
   */
  underlineClassName: PropTypes.string,
};

TabNav.defaultProps = {
  className: '',
  tabClassName: '',
  activeTabClassName: '',
  underlineClassName: '',
};

export default TabNav;