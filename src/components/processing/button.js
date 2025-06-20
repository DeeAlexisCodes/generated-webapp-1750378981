import React from 'react';

const Button = ({ children, onClick, href, className }) => {
  const baseClasses = `
    inline-block
    py-3
    px-6
    text-base
    font-medium
    rounded-xl
    transition-colors
    duration-300
    ease-in-out
    bg-[#FF6B00]
    text-white
    hover:bg-[#E66000]
    focus:outline-none
    focus:ring-2
    focus:ring-[#FF6B00]
    focus:ring-opacity-50
    disabled:opacity-50
    disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim();

  const combinedClasses = `${baseClasses} ${className || ''}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;