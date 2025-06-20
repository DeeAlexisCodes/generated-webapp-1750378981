import React from 'react';

const RecentProductsSection = ({ recentProducts }) => {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Recent Products</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {recentProducts && recentProducts.length > 0 ? (
          recentProducts.map((product) => (
            <a
              href={product.url}
              key={product.id || product.url} // Use product.id for key, falling back to url if ID is not available
              className="block bg-white rounded-2xl shadow-sm overflow-hidden no-underline text-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-44 bg-gray-100">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.url ? `${new URL(product.url).hostname}${new URL(product.url).pathname !== '/' ? '/...' : ''}` : 'N/A'}
                </p>
              </div>
            </a>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No recent products to display.</p>
        )}
      </div>
    </section>
  );
};

export default RecentProductsSection;