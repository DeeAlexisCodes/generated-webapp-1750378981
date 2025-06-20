import React from 'react';

const ReviewCard = ({ review, isActive, onClick }) => {
  const shortReviewText = review.reviewText.split('</p>')[0].replace('<p>', '') + '...';

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm p-8 text-center flex-none mx-[10px] cursor-pointer max-w-[400px]
        transition-all duration-400 ease-out w-[80%] md:w-[60%]
        ${isActive ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-60'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2 mb-4">
        <img
          src={review.doctorImg}
          alt={review.doctorName}
          className="w-20 h-20 rounded-full object-cover shadow-sm"
        />
        <span className="font-bold">{review.doctorName}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">{review.reviewTitle}</h2>
      <p className="text-gray-600">{shortReviewText}</p>
    </div>
  );
};

export default ReviewCard;