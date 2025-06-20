import React, { useState, useEffect } from 'react';
import AppHeader from '../components/reviewResults/AppHeader';
import AppFooter from '../components/reviewResults/AppFooter';
import PageTitle from '../components/reviewResults/PageTitle';
import ReviewCarousel from '../components/reviewResults/ReviewCarousel';
import ReviewModal from '../components/reviewResults/ReviewModal';
import * as api from '../logic/reviewResults/reviewResultsLogic';

function ReviewResults() {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        const data = await api.fetchReviews(); // Assuming this function exists in reviewResultsLogic
        setReviews(data);
        setError(null); // Clear any previous errors on successful fetch
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviewData();
  }, []);

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCardClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null); // Clear selected review when modal closes
  };

  if (loading) {
    return (
      <div className="review-results-page">
        <AppHeader />
        <main className="page-content">
          <PageTitle title="Review Results" />
          <p>Loading reviews...</p>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-results-page">
        <AppHeader />
        <main className="page-content">
          <PageTitle title="Review Results" />
          <p className="error-message">{error}</p>
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="review-results-page">
      <AppHeader />
      <main className="page-content">
        <PageTitle title="Review Results" />
        {reviews.length > 0 ? (
          <ReviewCarousel
            reviews={reviews}
            currentReviewIndex={currentReviewIndex}
            onPrev={handlePrevReview}
            onNext={handleNextReview}
            onCardClick={handleCardClick}
          />
        ) : (
          <p>No reviews available.</p>
        )}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reviewDetails={selectedReview}
        />
      </main>
      <AppFooter />
    </div>
  );
}

export default ReviewResults;