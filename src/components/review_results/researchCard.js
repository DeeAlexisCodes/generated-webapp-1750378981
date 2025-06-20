import React from 'react';

const ResearchCard = ({ researchItem }) => {
  const { title, source, url, excerpt } = researchItem;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">
        Source: <a href={url} target="_blank" rel="noopener noreferrer" className="text-orange-600 no-underline hover:underline">{source}</a>
      </p>
      <p className="text-base pl-4 border-l-4 border-orange-600 text-gray-600">{excerpt}</p>
    </div>
  );
};

export default ResearchCard;