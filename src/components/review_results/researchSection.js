import React from 'react';

const ResearchSection = ({ researchItems }) => {
  return (
    <>
      <h3 className="text-lg font-bold mt-8 mb-4 pb-2 border-b border-[#E0E0E0]">Supporting Research</h3>
      <ul className="list-none grid gap-4">
        {researchItems && researchItems.length > 0 ? (
          researchItems.map((item, index) => (
            <li key={index}>
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-4">
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-[#555] mb-2">
                  Source:{' '}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6B00] no-underline hover:underline"
                  >
                    {item.source}
                  </a>
                </p>
                <p className="text-sm pl-4 border-l-4 border-[#FF6B00] text-[#555]">
                  {item.excerpt}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li>No specific studies cited for this review.</li>
        )}
      </ul>
    </>
  );
};

export default ResearchSection;