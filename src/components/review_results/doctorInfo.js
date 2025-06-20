import React from 'react';

const DoctorInfo = ({ imgSrc, doctorName }) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <img src={imgSrc} alt={doctorName} className="w-20 h-20 rounded-full object-cover shadow-md" />
      <span className="font-bold">{doctorName}</span>
    </div>
  );
};

export default DoctorInfo;