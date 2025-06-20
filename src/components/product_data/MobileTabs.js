import React from 'react';

const MobileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'product-details', label: 'Details' },
    { id: 'research-list-panel', label: 'Research' },
    { id: 'research-detail-panel', label: 'Study' },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            px-4 py-2
            border-none bg-transparent text-base
            whitespace-nowrap
            ${activeTab === tab.id
              ? 'border-b-2 border-orange-500 font-bold'
              : ''
            }
          `}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MobileTabs;