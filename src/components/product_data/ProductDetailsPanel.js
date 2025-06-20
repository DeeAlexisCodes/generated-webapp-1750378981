import React, { useState, useCallback } from 'react';

const ProductDetailsPanel = ({ product, onViewSearchTerms }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded(prev => !prev);
  }, []);

  const handleOpenMethodologyModal = useCallback(() => {
    setIsMethodologyModalOpen(true);
    if (onViewSearchTerms) {
      onViewSearchTerms(); // Call prop if provided
    }
  }, [onViewSearchTerms]);

  const handleCloseMethodologyModal = useCallback(() => {
    setIsMethodologyModalOpen(false);
  }, []);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // In a real application, you might show a temporary "Copied!" message here.
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  if (!product) {
    // Render a simple message or a skeleton loader if product data is not available
    return (
      <section className="bg-white rounded-2xl border border-gray-200 p-6 overflow-y-auto flex flex-col items-center justify-center text-gray-600 min-h-[300px]">
        <p>No product details available.</p>
      </section>
    );
  }

  return (
    <section
      id="product-details"
      className="bg-white rounded-2xl border border-gray-200 p-6 overflow-y-auto flex flex-col font-sans text-gray-900"
    >
      <div className="flex-grow">
        <img
          id="product-img"
          className="w-full rounded-xl mb-4"
          src={product.product_image_url}
          alt={product.product_name || 'Product Image'}
        />
        <h2 id="product-name" className="text-xl font-bold">
          {product.product_name}
        </h2>
        {product.product_description && (
          <>
            <p
              id="product-description"
              className={`text-gray-600 text-sm mt-2 mb-4 overflow-hidden transition-all duration-300 ease-in-out ${
                isDescriptionExpanded ? 'max-h-full' : 'max-h-20'
              }`}
            >
              {product.product_description}
            </p>
            <button
              id="toggle-description"
              onClick={toggleDescription}
              className="bg-transparent border-none text-orange-500 font-medium cursor-pointer p-0 text-sm text-left"
            >
              {isDescriptionExpanded ? 'Show Less' : 'Show More'}
            </button>
          </>
        )}

        <h3 className="text-base font-bold mb-2 pb-2 border-b border-gray-200 mt-4">
          Key Ingredients
        </h3>
        <div id="ingredients-list" className="flex flex-wrap gap-2 my-4">
          {product.ingredients && product.ingredients.map((ingredient, index) => (
            // IngredientTag is rendered as a styled span within this component for simplicity
            // given the single-file output requirement and basic styling.
            <span
              key={index}
              className="bg-gray-200 text-gray-900 px-2.5 py-1 rounded-full text-sm font-medium"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* Methodology Button */}
      {product.search_queries && product.search_queries.length > 0 && (
        <button
          id="methodology-button"
          onClick={handleOpenMethodologyModal}
          className="bg-transparent border-none text-orange-500 font-medium cursor-pointer p-0 text-sm text-left mt-auto pt-4 border-t border-gray-200 w-full flex items-center justify-between"
        >
          View Search Terms <span className="ml-2">&rarr;</span>
        </button>
      )}

      {/* Methodology Modal */}
      {isMethodologyModalOpen && (
        <div
          id="methodology-modal"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100 visible"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleCloseMethodologyModal} // Close modal when clicking on the overlay
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-[calc(100%-40px)] max-h-[90vh] overflow-y-auto p-8 relative transform translate-y-0 scale-100 transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} // Prevent event propagation so clicking inside the modal doesn't close it
          >
            <button
              id="modal-close"
              onClick={handleCloseMethodologyModal}
              className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-gray-600"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 id="modal-title" className="text-xl font-bold mb-4">Search Term Methodology</h2>
            <div id="modal-body" className="animate-fadeIn">
              {product.search_queries.map((query, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                    <div className="flex-grow font-mono text-sm break-all">{query.term}</div>
                    <button
                      className="bg-transparent border border-gray-200 rounded-md px-2 py-1 cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                      onClick={() => copyToClipboard(query.term)}
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{query.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsPanel;