export const getProcessingInitialState = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        title: "Analyzing Product",
        urlLabel: "Processing URL:",
        urlText: "https://example.com/mock-product-url-from-backend", // Simulates the URL being provided by the backend
        statusText: "Initializing...",
        spinnerVisible: true,
        urlLabelVisible: true,
        urlTextVisible: true,
        homeButtonVisible: false
    };
};

export const getProcessingSendingState = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        title: "Sending Request",
        statusText: "Sending request to process the page...",
        spinnerVisible: true,
        urlLabelVisible: true,
        urlTextVisible: true,
        homeButtonVisible: false
    };
};

export const getProcessingCompleteState = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        title: "Request Sent",
        statusText: "Your request has been sent. The product analysis will appear on the homepage once completed.",
        spinnerVisible: false,
        urlLabelVisible: false,
        urlTextVisible: false,
        homeButtonVisible: true,
        homeButtonText: "Back to Homepage"
    };
};

export const getLogoData = () => {
    return {
        icon: "+",
        name: "FrontrowMD",
        homeLink: "/"
    };
};

export const getFooterCopyright = () => {
    return "© 2024 FrontrowMD. All rights reserved.";
};