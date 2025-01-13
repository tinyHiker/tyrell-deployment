// NotFound.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  return <Navigate to="/404" replace />;
};

export default NotFound;