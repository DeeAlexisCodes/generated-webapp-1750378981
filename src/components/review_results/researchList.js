import React from 'react';

const ResearchCard = ({ item }) => {
  return (
    <li>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="font-bold mb-2">{item.title}</h4>
        <p className="text-sm text-gray-600 mb-2">
          Source: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 no-underline hover:underline">{item.source}</a>
        </p>
        <p className="text-sm pl-4 border-l-4 border-orange-500 text-gray-600">{item.excerpt}</p>
      </div>
    </li>
  );
};

const ResearchList = ({ researchItems }) => {
  if (!researchItems || researchItems.length === 0) {
    return (
      <ul className="list-none grid gap-4">
        <li>No specific studies cited for this review.</li>
      </ul>
    );
  }

  return (
    <ul className="list-none grid gap-4">
      {researchItems.map((item, index) => (
        <ResearchCard key={index} item={item} />
      ))}
    </ul>
  );
};

export default ResearchList;