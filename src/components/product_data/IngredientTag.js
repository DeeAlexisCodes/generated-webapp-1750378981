import React from 'react';

const IngredientTag = ({ name }) => {
  return (
    <span className="bg-gray-200 text-[#121212] py-1 px-2.5 rounded-2xl text-[0.85rem] font-medium">
      {name}
    </span>
  );
};

export default IngredientTag;