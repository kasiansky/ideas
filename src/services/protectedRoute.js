import React from 'react';
import { Route } from 'react-router-dom';

const protectedRoute = ({ path }) => {
  return <Route />;
};

export default protectedRoute;
