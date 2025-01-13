import React from 'react';

const Quote = ({quote}) => {
  return (
    <div className="flex justify-center items-center my-12">
      <p className="text-lg italic font-semibold text-gray-800">
        "{quote.content}" - <span className="font-bold not-italic">{quote.personOrOrganization}</span>
      </p>
    </div>
  );
};

export default Quote;