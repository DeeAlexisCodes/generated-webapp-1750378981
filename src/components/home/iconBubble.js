import React from 'react';

const IconBubble = ({ iconSvg, depth, className }) => {
  // Base classes for the outer bubble container, converted from .icon-bubble and .visual-element styles
  const bubbleBaseClasses = `
    absolute
    will-change-transform
    transition-transform duration-200 ease-out
    w-20 h-20
    bg-white
    rounded-3xl
    shadow-[0_4px_12px_rgba(0,0,0,0.05)]
    flex items-center justify-center
    animate-[float_5s_ease-in-out_infinite]
  `.replace(/\s+/g, ' ').trim(); // Normalize whitespace for cleaner class string

  // Classes to be applied to the SVG icon itself, converted from .icon-bubble svg styles
  const svgClasses = "w-10 h-10 text-orange-500";

  // Clone the iconSvg element to inject the required Tailwind classes.
  // This assumes `iconSvg` is a React element (e.g., `<svg>...</svg>` as JSX).
  // It merges any existing `className` on the `iconSvg` prop with the new styles.
  const styledIcon = React.cloneElement(iconSvg, {
    className: `${svgClasses} ${iconSvg.props.className || ''}`.trim()
  });

  return (
    <div
      className={`${bubbleBaseClasses} ${className || ''}`.trim()}
      data-depth={depth}
    >
      {styledIcon}
    </div>
  );
};

export default IconBubble;