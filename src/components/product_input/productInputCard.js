import React from 'react';

const ProductInputCard = ({ productUrl, setProductUrl, isLoading, errorMessage, onGenerateReviews }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Start a New Review Generation</h1>
        <p className="text-gray-600 mb-8">Enter a product page URL to begin the analysis and review creation process.</p>
        <form className="flex flex-col gap-4" onSubmit={onGenerateReviews}>
          <input
            type="url"
            className="w-full p-4 text-base border border-gray-300 rounded-xl bg-gray-100 transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/20"
            placeholder="https://www.example.com/product/item-123"
            required
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            disabled={isLoading}
          />
          {errorMessage && (
            <p className="text-red-600 text-sm text-left -mt-2">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="bg-orange-500 text-white p-4 rounded-xl text-lg font-bold transition-all duration-300 ease-in-out shadow-xl border-none cursor-pointer hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Reviews'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductInputCard;