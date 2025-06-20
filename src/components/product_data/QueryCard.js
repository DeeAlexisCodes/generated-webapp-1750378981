import React, { useState } from 'react';

const QueryCard = ({ term, rationale }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(term);
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Failed!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2000);
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
        <div className="flex-grow font-mono text-sm">{term}</div>
        <button
          onClick={handleCopyClick}
          className="bg-transparent border border-gray-300 rounded-md py-1 px-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 text-sm"
        >
          {copyButtonText}
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">{rationale}</p>
    </div>
  );
};

export default QueryCard;