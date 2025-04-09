import React from 'react';

const FormComponent = ({ title, fields, handleSubmit, children }) => {
  return (
    <div className='container'>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <field.component key={index} {...field.props} />
        ))}
        <button type='submit'>{title}</button>
        {children}
      </form>
    </div>
  );
};

export default FormComponent;
