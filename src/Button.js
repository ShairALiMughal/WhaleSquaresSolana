import React from 'react';

const Button = ({ children, onClick, className }) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 text-white rounded whitespace-nowrap overflow-hidden text-ellipsis ${className}`} 
    type="button"
  >
    {children}
  </button>
);


export default Button;
