import React from 'react';

const ResearchDetailPanel = ({ selectedResearchStudy }) => {
  if (!selectedResearchStudy) {
    return (
      <section className="bg-white rounded-xl border border-gray-300 p-6 overflow-y-auto flex flex-col h-full">
        <div className="flex flex-col justify-center items-center h-full text-center text-gray-600">
          <p>Select a clinical study from the list to view its details here.</p>
        </div>
      </section>
    );
  }

  const {
    title,
    metadata,
    product_related_summary,
    supporting_statements,
    source_url,
  } = selectedResearchStudy;

  return (
    <section className="bg-white rounded-xl border border-gray-300 p-6 overflow-y-auto flex flex-col h-full">
      <div className="relative flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>

        <div className="text-sm text-gray-600 mb-4 flex flex-col sm:flex-row sm:gap-4">
          <span>
            <strong className="font-medium">Authors:</strong> {metadata.authors.join(', ')}
          </span>
          <span>
            <strong className="font-medium">Journal:</strong> {metadata.journal}, {metadata.publication_date}
          </span>
        </div>

        <h3 className="text-base font-bold mb-2 pb-2 border-b border-gray-300 text-gray-900">Summary</h3>
        <p className="text-base mb-4 px-4 py-2 rounded-lg border-l-4 border-orange-500 bg-gray-50 text-gray-900">
          {product_related_summary}
        </p>

        <h3 className="text-base font-bold mb-2 pb-2 border-b border-gray-300 text-gray-900">Supporting Statements</h3>
        <ul className="list-none p-0 mb-4">
          {supporting_statements.map((statement, index) => (
            <li key={index} className="text-sm italic text-gray-600 pl-4 border-l-2 border-gray-300 mb-2">
              {statement}
            </li>
          ))}
        </ul>

        {source_url && (
          <a
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 font-medium mt-auto inline-block"
          >
            Read Full Study &rarr;
          </a>
        )}
      </div>
    </section>
  );
};

export default ResearchDetailPanel;