import React from 'react';

const ReviewModal = ({ isOpen, onClose, reviewDetails }) => {
  if (!isOpen || !reviewDetails) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 rounded-2xl w-11/12 max-w-[800px] max-h-[90vh] overflow-y-auto relative p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-gray-200 border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center z-10 hover:bg-gray-600 hover:text-white transition-colors duration-200"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>

        {/* Doctor Info */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <img src={reviewDetails.doctorImg} alt={reviewDetails.doctorName} className="w-20 h-20 rounded-full object-cover shadow-md" />
          <span className="font-bold text-gray-900">{reviewDetails.doctorName}</span>
        </div>

        {/* Review Title */}
        <h2 className="text-xl font-bold mb-4 text-gray-900">{reviewDetails.reviewTitle}</h2>

        {/* Review Text */}
        <div className="text-gray-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: reviewDetails.reviewText }} />

        {/* Supporting Research Section */}
        <h3 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-900">Supporting Research</h3>
        <ul className="list-none grid gap-4">
          {reviewDetails.research && reviewDetails.research.length > 0 ? (
            reviewDetails.research.map((item, index) => (
              <li key={index}>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold mb-2 text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Source:{' '}
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 no-underline hover:underline">
                      {item.source}
                    </a>
                  </p>
                  <p className="text-base pl-4 border-l-4 border-orange-500 text-gray-600">{item.excerpt}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No specific studies cited for this review.</li>
          )}
        </ul>

        {/* Generation Prompt Section */}
        <h3 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-900">Generation Prompt</h3>
        <pre className="bg-[#2d333b] text-[#cdd9e5] p-4 rounded-xl font-mono text-sm whitespace-pre-wrap break-words">
          {reviewDetails.prompt}
        </pre>
      </div>
    </div>
  );
};

export default ReviewModal;