import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import InputField from '../Components/InputField';
import FormComponent from '../Components/Form';

function SignupPage() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else {
        const errorMessage = error?.details?.[0]?.message || message;
        handleError(errorMessage);
      }
    } catch (err) {
      handleError(err.message || 'An unexpected error occurred');
    }
  };

  const fields = [
    {
      component: InputField,
      props: {
        label: 'Name',
        type: 'text',
        name: 'name',
        placeholder: 'Enter your name...',
        value: signupInfo.name,
        onChange: handleChange,
      },
    },
    {
      component: InputField,
      props: {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email...',
        value: signupInfo.email,
        onChange: handleChange,
      },
    },
    {
      component: InputField,
      props: {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Enter your password...',
        value: signupInfo.password,
        onChange: handleChange,
      },
    },
  ];

  return (
    <FormComponent title="Signup" fields={fields} handleSubmit={handleSignup}>
      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
      <ToastContainer />
    </FormComponent>
  );
}

export default SignupPage;
