import React from 'react';
import { Redirect } from 'react-router-dom';

export const redirect = link => {
  if (link) {
    return <Redirect to={link} />;
  }
};
