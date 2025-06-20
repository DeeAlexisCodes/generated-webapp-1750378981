import React, { useState, useEffect } from 'react';
import AppHeader from '../components/processingPage/AppHeader';
import AppFooter from '../components/processingPage/AppFooter';
import ProcessingCard from '../components/processingPage/ProcessingCard';
import Spinner from '../components/processingPage/Spinner';
import Button from '../components/processingPage/Button';
import * as api from '../logic/processingPage/processingPageLogic';

const ProcessingPage = () => {
    // State variables as defined in the plan
    const [productUrl, setProductUrl] = useState('');
    const [processingTitle, setProcessingTitle] = useState('Analyzing Product');
    const [statusMessage, setStatusMessage] = useState('Initializing...');
    const [showSpinner, setShowSpinner] = useState(true);
    const [showUrlDetails, setShowUrlDetails] = useState(true);
    const [showHomeButton, setShowHomeButton] = useState(false);

    // Additional state for global loading and error handling (as per rules)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initiateProcessingFlow = async () => {
            setIsLoading(true);
            setError(null); // Clear any previous errors

            try {
                // Extract product URL from query parameters as per description
                const params = new URLSearchParams(window.location.search);
                const urlFromQuery = params.get('url');

                if (!urlFromQuery) {
                    throw new Error('Product URL not found in query parameters.');
                }

                setProductUrl(urlFromQuery); // Set the URL from query params

                // Call the logic function, passing state setters for real-time UI updates
                // The 'api.processProduct' function is assumed to orchestrate the steps
                // and update the UI via these setters.
                await api.processProduct({
                    productUrl: urlFromQuery,
                    setProcessingTitle,
                    setStatusMessage,
                    setShowSpinner,
                    setShowUrlDetails,
                    setShowHomeButton,
                    setError // Allow logic to report specific errors
                });

                // If api.processProduct resolves, it means the main flow completed successfully
            } catch (err) {
                console.error("Failed to process product:", err);
                setError(err.message || 'An unknown error occurred during processing.');
                // Update UI to reflect the error state
                setProcessingTitle('Processing Failed');
                setStatusMessage(`Error: ${err.message || 'Please try again.'}`);
                setShowSpinner(false);
                setShowUrlDetails(false); // No valid URL details to show in error
                setShowHomeButton(true); // Provide option to go back
            } finally {
                setIsLoading(false); // Always set loading to false when done or error
            }
        };

        initiateProcessingFlow();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div className="processing-page-container">
            <AppHeader />
            <main className="main-content">
                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <Spinner />
                        <p style={{ marginTop: '10px' }}>{statusMessage}</p>
                    </div>
                )}

                {error && !isLoading && (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#ff4d4f' }}>
                        <h2>{processingTitle}</h2>
                        <p>{statusMessage}</p>
                        <p style={{ marginTop: '20px' }}>Detailed Error: {error}</p>
                        {showHomeButton && (
                            <Button href="/" className="mt-4">Back to Homepage</Button>
                        )}
                    </div>
                )}

                {!isLoading && !error && (
                    <ProcessingCard
                        productUrl={productUrl}
                        processingTitle={processingTitle}
                        statusMessage={statusMessage}
                        showSpinner={showSpinner}
                        showUrlDetails={showUrlDetails}
                        showHomeButton={showHomeButton}
                    />
                )}
            </main>
            <AppFooter />
        </div>
    );
};

export default ProcessingPage;