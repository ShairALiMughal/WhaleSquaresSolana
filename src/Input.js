import React from 'react';

const Input = ({ id, value, onChange, onKeyPress, className }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    className={`border rounded px-3 py-2 ${className}`}
  />
);

export default Input;
