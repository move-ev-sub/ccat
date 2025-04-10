'use client';

import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Oops!</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
