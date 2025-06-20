import React, { useState, useEffect } from 'react';

// Nested QueryCard component
const QueryCard = ({ term, rationale }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(term)
      .then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => {
          setCopyButtonText('Copy');
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <div className="border border-[#E0E0E0] rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 bg-[#F8F9FA] p-2 rounded-xl">
        <div className="flex-grow font-mono text-sm">{term}</div>
        <button
          className="bg-transparent border border-[#E0E0E0] rounded-md px-2 py-1 cursor-pointer transition-colors duration-200 hover:bg-[#E9ECEF]"
          onClick={handleCopy}
          type="button"
        >
          {copyButtonText}
        </button>
      </div>
      <p className="text-sm text-[#555] mt-2">{rationale}</p>
    </div>
  );
};

const MethodologyModal = ({ isOpen, onClose, searchQueries }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300); // Match transition duration
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Ensure body overflow is reset when component unmounts or isOpen becomes false
      if (!isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out z-[1000] flex items-center justify-center
        ${isOpen ? 'bg-opacity-60 visible' : 'bg-opacity-0 invisible'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-white rounded-2xl max-w-3xl w-[calc(100%-40px)] max-h-[90vh] overflow-y-auto p-8 relative transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          className="absolute top-4 right-4 bg-none border-none text-2xl cursor-pointer text-[#555]"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
        <h2 id="modal-title" className="text-xl font-bold mb-4">Search Term Methodology</h2>
        <div>
          {searchQueries && searchQueries.length > 0 ? (
            searchQueries.map((query, index) => (
              <QueryCard key={index} term={query.term} rationale={query.rationale} />
            ))
          ) : (
            <p className="text-[#555]">No search queries available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodologyModal;