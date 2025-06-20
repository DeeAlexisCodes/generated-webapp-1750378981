import React from 'react';

const PromptDisplay = ({ promptText }) => {
  return (
    <pre className="bg-[#2d333b] text-[#cdd9e5] p-4 rounded-xl font-mono text-sm whitespace-pre-wrap break-words">
      {promptText}
    </pre>
  );
};

export default PromptDisplay;