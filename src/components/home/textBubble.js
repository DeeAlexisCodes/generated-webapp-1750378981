import React from 'react';

const TextBubble = ({ text, depth }) => {
  return (
    <div
      className="
        bg-[#EBF5FF]
        text-[#005A9C]
        py-2
        px-4
        rounded-full
        font-medium
        shadow-[0px_4px_12px_rgba(0,0,0,0.05)]
        top-[15%]
        left-[70%]
        absolute
        will-change-transform
        transition-transform
        duration-200
        ease-out
        animate-float
        [animation-delay:0.5s]
      "
      data-depth={depth}
    >
      {text}
    </div>
  );
};

export default TextBubble;