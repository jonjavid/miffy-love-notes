
import React from 'react';

const BunnyEars = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      <div className="bunny-ear float" style={{ animationDelay: '0s' }}></div>
      <div className="bunny-ear float" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default BunnyEars;
