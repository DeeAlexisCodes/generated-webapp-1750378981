import React, { useState, useEffect, useRef, useCallback } from 'react';

const ReviewCard = ({ review, isActive, onClick }) => {
    const shortText = review.reviewText.split('</p>')[0].replace('<p>', '') + '...';

    return (
        <div
            className={`
                flex-shrink-0 flex-grow-0
                bg-white rounded-2xl shadow-sm p-8 text-center
                max-w-[400px] cursor-pointer
                transition-all duration-400 ease-in-out transform
                ${isActive ? 'scale-100 opacity-100' : 'scale-85 opacity-60'}
                w-[80%] md:w-[60%]
            `}
            onClick={onClick}
        >
            <div className="flex flex-col items-center gap-2 mb-4">
                <img src={review.doctorImg} alt={review.doctorName} className="w-20 h-20 rounded-full object-cover shadow-sm" />
                <span className="font-bold">{review.doctorName}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{review.reviewTitle}</h2>
            <p className="text-gray-600">{shortText}</p>
        </div>
    );
};

const ReviewCarousel = ({ reviews, currentReviewIndex, onPrev, onNext, onCardClick }) => {
    const carouselViewportRef = useRef(null);
    const carouselTrackRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const CARD_GAP_PX = 20;

    const updateCarouselTransform = useCallback(() => {
        if (carouselTrackRef.current && carouselViewportRef.current && reviews.length > 0) {
            const firstCard = carouselTrackRef.current.children[0];
            if (!firstCard) return;

            const cardWidth = firstCard.offsetWidth;
            const viewportWidth = carouselViewportRef.current.offsetWidth;

            const offset = -currentReviewIndex * (cardWidth + CARD_GAP_PX) + (viewportWidth / 2 - cardWidth / 2);
            carouselTrackRef.current.style.transform = `translateX(${offset}px)`;
        }
    }, [currentReviewIndex, reviews.length]);

    useEffect(() => {
        updateCarouselTransform();

        const handleResize = () => updateCarouselTransform();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateCarouselTransform]);

    const handleCardClickInternal = (review, index) => {
        setSelectedReview(review);
        setModalOpen(true);
        if (onCardClick) {
            onCardClick(index);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-900 leading-relaxed overflow-x-hidden">
            <main className="py-12">
                <div className="w-full max-w-screen-xl mx-auto px-8 lg:px-12">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold">Generated Review Templates</h1>
                    </header>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            id="prev-btn"
                            className="bg-white border border-gray-200 rounded-full w-11 h-11 cursor-pointer flex items-center justify-center shadow-sm transition-all duration-200 shrink-0 hover:scale-110 hover:shadow-md"
                            onClick={onPrev}
                        >
                            <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
                        </button>
                        <div ref={carouselViewportRef} className="w-full max-w-2xl overflow-hidden">
                            <div ref={carouselTrackRef} className="flex items-center transition-transform duration-400 ease-out" style={{ gap: `${CARD_GAP_PX}px` }}>
                                {reviews.map((review, index) => (
                                    <ReviewCard
                                        key={index}
                                        review={review}
                                        isActive={index === currentReviewIndex}
                                        onClick={() => handleCardClickInternal(review, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            id="next-btn"
                            className="bg-white border border-gray-200 rounded-full w-11 h-11 cursor-pointer flex items-center justify-center shadow-sm transition-all duration-200 shrink-0 hover:scale-110 hover:shadow-md"
                            onClick={onNext}
                        >
                            <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                        </button>
                    </div>
                </div>
            </main>

            {modalOpen && selectedReview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="bg-gray-50 rounded-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-4 right-4 bg-gray-200 border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center z-10 hover:bg-gray-600 hover:text-white"
                            onClick={closeModal}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                        <div className="p-12">
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <img src={selectedReview.doctorImg} alt={selectedReview.doctorName} className="w-20 h-20 rounded-full object-cover" />
                                <span className="font-bold">{selectedReview.doctorName}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{selectedReview.reviewTitle}</h2>
                            <div className="text-gray-900" dangerouslySetInnerHTML={{ __html: selectedReview.reviewText }} />

                            <h3 className="text-lg font-bold mt-8 mb-4 pb-2 border-b border-gray-200">Supporting Research</h3>
                            <ul className="list-none grid gap-4">
                                {selectedReview.research.length > 0 ? (
                                    selectedReview.research.map((item, idx) => (
                                        <li key={idx}>
                                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                                <h4 className="font-bold mb-2">{item.title}</h4>
                                                <p className="text-sm text-gray-600 mb-2">Source: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 no-underline hover:underline">{item.source}</a></p>
                                                <p className="text-base pl-4 border-l-4 border-orange-500 text-gray-600">{item.excerpt}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>No specific studies cited for this review.</li>
                                )}
                            </ul>

                            <h3 className="text-lg font-bold mt-8 mb-4 pb-2 border-b border-gray-200">Generation Prompt</h3>
                            <pre className="bg-gray-800 text-gray-200 p-4 rounded-xl font-mono text-sm whitespace-pre-wrap break-words">{selectedReview.prompt}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewCarousel;