import React from 'react';

const ModalReviewContent = ({ title, reviewText }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>
      <div className="text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: reviewText }} />
    </>
  );
};

export default ModalReviewContent;