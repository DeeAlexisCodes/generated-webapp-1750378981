import React from 'react';

const ImageBubble = ({ src, alt, depth }) => {
  return (
    <div
      className="absolute w-[320px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-lg overflow-hidden will-change-transform transition-transform duration-200 ease-out"
      data-depth={depth}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default ImageBubble;