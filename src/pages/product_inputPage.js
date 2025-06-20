import React, { useState, useEffect } from 'react';
import AppHeader from '../components/reviewGenerationPage/AppHeader';
import ProductInputCard from '../components/reviewGenerationPage/ProductInputCard';
import RecentProductsSection from '../components/reviewGenerationPage/RecentProductsSection';
import ProductCard from '../components/reviewGenerationPage/ProductCard'; // Imported as per plan's components array
import AppFooter from '../components/reviewGenerationPage/AppFooter';
import * as api from '../logic/reviewGenerationPage/reviewGenerationPageLogic';

function ReviewGenerationPage() {
  const [productUrl, setProductUrl] = useState("");
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadRecentProducts = async () => {
      setIsLoading(true);
      setErrorMessage(""); // Clear any previous errors
      try {
        // Assuming api.fetchRecentProducts is an async function that fetches recent product data
        const data = await api.fetchRecentProducts();
        setRecentProducts(data);
      } catch (error) {
        setErrorMessage("Failed to load recent products: " + error.message);
        console.error("Error loading recent products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentProducts();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const onGenerateReviews = async () => {
    if (!productUrl.trim()) {
      setErrorMessage("Please enter a product URL.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous errors before a new attempt
    try {
      // Assuming api.generateReviews is an async function that processes the URL
      // and returns the newly generated product data
      const newProduct = await api.generateReviews(productUrl);
      // Add the new product to the beginning of the recent products list
      setRecentProducts(prevProducts => [newProduct, ...prevProducts]);
      setProductUrl(""); // Clear the input field after successful generation
    } catch (error) {
      setErrorMessage("Failed to generate reviews: " + error.message);
      console.error("Error generating reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppHeader />
      <main>
        <ProductInputCard
          productUrl={productUrl}
          setProductUrl={setProductUrl}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onGenerateReviews={onGenerateReviews}
        />
        {/* Display loading state for initial recent products fetch if needed */}
        {isLoading && recentProducts.length === 0 && (
          <p style={{ textAlign: 'center', margin: '20px' }}>Loading recent products...</p>
        )}
        {/* Display error message for initial recent products fetch if needed */}
        {errorMessage && recentProducts.length === 0 && (
          <p style={{ color: 'red', textAlign: 'center', margin: '20px' }}>{errorMessage}</p>
        )}
        <RecentProductsSection recentProducts={recentProducts} />
      </main>
      <AppFooter />
    </div>
  );
}

export default ReviewGenerationPage;