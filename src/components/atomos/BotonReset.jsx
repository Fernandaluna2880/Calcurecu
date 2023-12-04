import React from 'react';


const BotonReset = ({ handleReset, children }) => (
  <div className='p-1 flex items-center justify-center text-red-600 font-bold text-xl bg-red-300 hover:bg-red-200' onClick={handleReset}>
    {children}
  </div>
);

export default BotonReset;
