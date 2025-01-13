import React from 'react';
import { NavLink } from 'react-router-dom';

const FourOhFour = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Return to shopping
      </NavLink>
    </div>
  );
};

export default FourOhFour;
