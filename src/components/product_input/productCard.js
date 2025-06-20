import React from 'react';

const ProductCard = ({ product }) => {
  // Helper function to derive a simplified URL for display
  const getDisplayUrl = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '') + '/product/...';
    } catch (e) {
      return url; // Fallback if URL is invalid or malformed
    }
  };

  const displayUrl = product.displayUrl || getDisplayUrl(product.productUrl);

  return (
    <a
      href={product.productUrl}
      className="block bg-white rounded-2xl shadow-md overflow-hidden text-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-[180px] bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
          {displayUrl}
        </p>
      </div>
    </a>
  );
};

export default ProductCard;