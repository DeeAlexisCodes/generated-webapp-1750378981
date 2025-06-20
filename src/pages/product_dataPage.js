import React, { useState, useEffect } from 'react';
import * as api from '../logic/productDashboard/productDashboardLogic';

import AppHeader from '../components/productDashboard/AppHeader';
import MobileTabs from '../components/productDashboard/MobileTabs';
import ProductDetailsPanel from '../components/productDashboard/ProductDetailsPanel';
import ResearchListPanel from '../components/productDashboard/ResearchListPanel';
import ResearchDetailPanel from '../components/productDashboard/ResearchDetailPanel';
import MethodologyModal from '../components/productDashboard/MethodologyModal';

const ProductDashboard = () => {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResearchIndex, setSelectedResearchIndex] = useState(null);
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('productDetails');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchProductDashboardData();
        setProductData(data);
        if (data && data.researchStudies && data.researchStudies.length > 0) {
          setSelectedResearchIndex(0); // Select the first research study by default
        }
      } catch (error) {
        console.error("Failed to fetch product dashboard data:", error);
        // Optionally, set an error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tabName) => {
    setActiveMobileTab(tabName);
  };

  const handleViewSearchTerms = () => {
    setIsMethodologyModalOpen(true);
  };

  const handleCloseMethodologyModal = () => {
    setIsMethodologyModalOpen(false);
  };

  const handleSelectResearch = (index) => {
    setSelectedResearchIndex(index);
    setActiveMobileTab('researchDetail'); // Switch to research detail tab on mobile
  };

  const selectedResearchStudy = productData?.researchStudies?.[selectedResearchIndex] || null;

  if (isLoading) {
    return (
      <div className="product-dashboard-page-container">
        <AppHeader />
        <div className="loading-state-placeholder p-4 text-center text-gray-500">
          Loading product dashboard...
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="product-dashboard-page-container">
        <AppHeader />
        <div className="error-state-placeholder p-4 text-center text-red-500">
          Error: Could not load product data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="product-dashboard-page-container flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <div className="mobile-tabs-container md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <MobileTabs activeTab={activeMobileTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-grow overflow-hidden p-4 pt-0 md:p-4">
        {/* Product Details Panel */}
        <div className={`flex-none w-full md:w-1/3 md:block ${activeMobileTab === 'productDetails' ? 'block' : 'hidden'} overflow-y-auto custom-scroll`}>
          <ProductDetailsPanel
            product={productData.product}
            onViewSearchTerms={handleViewSearchTerms}
          />
        </div>

        {/* Research List Panel */}
        <div className={`flex-none w-full md:w-1/4 md:block ${activeMobileTab === 'researchList' ? 'block' : 'hidden'} ml-0 md:ml-4 overflow-y-auto custom-scroll`}>
          <ResearchListPanel
            researchStudies={productData.researchStudies}
            onSelectResearch={handleSelectResearch}
            selectedResearchIndex={selectedResearchIndex}
          />
        </div>

        {/* Research Detail Panel */}
        <div className={`flex-grow w-full md:w-auto md:block ${activeMobileTab === 'researchDetail' ? 'block' : 'hidden'} ml-0 md:ml-4 overflow-y-auto custom-scroll`}>
          <ResearchDetailPanel
            selectedResearchStudy={selectedResearchStudy}
          />
        </div>
      </div>

      <MethodologyModal
        isOpen={isMethodologyModalOpen}
        onClose={handleCloseMethodologyModal}
        searchQueries={productData.searchQueries}
      />
    </div>
  );
};

export default ProductDashboard;