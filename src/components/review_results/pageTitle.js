import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default PageTitle;