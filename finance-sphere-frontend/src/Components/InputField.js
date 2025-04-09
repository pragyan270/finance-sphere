import React from 'react';

const InputField = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default InputField;
