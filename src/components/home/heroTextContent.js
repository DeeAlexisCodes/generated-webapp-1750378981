import React from 'react';

const HeroTextContent = ({ title, subtitle, ctaLink, ctaText }) => {
  // Assuming 'Doctor-Vetted' is a fixed string within the title that needs highlighting.
  // This approach splits the title string to insert the highlighted span.
  const titleParts = title.split('Doctor-Vetted');

  return (
    <div className="text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
        {titleParts[0]}
        <span className="font-normal text-gray-600">Doctor-Vetted</span>
        {titleParts[1]}
      </h1>
      <p className="text-lg sm:text-xl max-w-xl mx-auto mb-8 text-gray-600 md:mx-0">
        {subtitle}
      </p>
      <a
        href={ctaLink}
        className="inline-block bg-orange-500 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all duration-300 ease-in-out shadow-lg hover:bg-orange-600 hover:-translate-y-1 hover:shadow-xl"
      >
        {ctaText}
      </a>
    </div>
  );
};

export default HeroTextContent;