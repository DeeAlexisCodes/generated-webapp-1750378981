import React from 'react';

// Helper component for individual research studies
// Converted from .research-card, .research-card__title, .research-card__relevance styles in the original HTML snippet.
const ResearchCard = ({ study, isActive, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        bg-transparent p-4 rounded-xl border border-gray-200 transition-all duration-200 ease-in-out cursor-pointer text-left
        hover:border-orange-500 hover:-translate-y-0.5
        ${isActive ? 'border-orange-500 ring-2 ring-orange-600/70' : ''}
      `}
    >
      <h3 className="font-bold text-base mb-2">{study.title}</h3>
      <div className="bg-green-50 text-green-700 py-0.5 px-2 rounded-xl text-xs inline-block">
        <strong className="font-semibold">✓ Relevant:</strong> {study.relevance_reason}
      </div>
    </button>
  );
};

const ResearchListPanel = ({ researchStudies, onSelectResearch, selectedResearchIndex }) => {
  return (
    <section 
      id="research-list-panel" 
      className="bg-white rounded-2xl border border-gray-200 p-6 overflow-y-auto flex flex-col"
    >
      {/* This div corresponds to the 'content' div from original HTML, adjusted for React rendering */}
      <div className="w-full">
        {/* Converted from .section-title */}
        <h2 className="text-base font-bold mb-2 pb-2 border-b border-gray-200">Clinical Research</h2>
        {/* Converted from .research-list */}
        <div id="research-list" className="flex flex-col gap-4">
          {researchStudies && researchStudies.length > 0 ? (
            researchStudies.map((study, index) => (
              <ResearchCard
                key={index}
                study={study}
                isActive={selectedResearchIndex === index}
                onSelect={() => onSelectResearch(index)}
              />
            ))
          ) : (
            <div className="text-gray-600 text-center py-8">
              No research studies available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchListPanel;