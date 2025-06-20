import React from 'react';

const ProcessingCard = ({
  productUrl,
  processingTitle,
  statusMessage,
  showSpinner,
  showUrlDetails,
  showHomeButton,
}) => {
  return (
    <div className="flex-grow flex items-center justify-center py-12">
      <div className="max-w-xl w-full bg-white p-12 rounded-2xl shadow-lg text-center animate-fadeIn">
        {showSpinner && (
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-8"></div>
        )}
        <h1 className="text-3xl font-bold mb-4">
          {processingTitle}
        </h1>
        
        {showUrlDetails && (
          <>
            <p className="text-sm text-gray-600">Processing URL:</p>
            <p className="font-medium break-all mb-8">
              {productUrl}
            </p>
          </>
        )}
        
        <p className="text-base text-gray-600 min-h-6">
          {statusMessage}
        </p>
        
        {showHomeButton && (
          <a href="/" className="inline-block bg-orange-500 text-white px-6 py-3 text-base font-medium rounded-xl transition-colors hover:bg-orange-600 mt-8">
            Back to Homepage
          </a>
        )}
      </div>
    </div>
  );
};

export default ProcessingCard;