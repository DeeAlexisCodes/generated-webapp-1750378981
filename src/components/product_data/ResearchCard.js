import React from 'react';

const ResearchCard = ({ researchStudy, isActive, onClick }) => {
  return (
    <div
      className={`
        bg-transparent p-4 rounded-xl border border-gray-200 transition-all duration-200 ease-in-out cursor-pointer
        hover:border-orange-500 hover:-translate-y-0.5
        ${isActive ? 'border-orange-500 ring-2 ring-orange-600' : ''}
      `}
      onClick={onClick}
    >
      <h3 className="font-bold text-base mb-2">
        {researchStudy.title}
      </h3>
      <div className="bg-green-100 text-green-800 py-0.5 px-2 rounded-xl text-xs inline-block">
        <strong>✓ Relevant:</strong> {researchStudy.relevance_reason}
      </div>
    </div>
  );
};

export default ResearchCard;