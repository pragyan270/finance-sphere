import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import InputField from '../Components/InputField';
import FormComponent from '../Components/Form';

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => navigate('/home'), 1000);
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
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email...',
        value: loginInfo.email,
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
        value: loginInfo.password,
        onChange: handleChange,
      },
    },
  ];

  return (
    <FormComponent title="Login" fields={fields} handleSubmit={handleLogin}>
      <span>
        Don't have an account? <Link to="/signup">Signup</Link>
      </span>
      <ToastContainer />
    </FormComponent>
  );
}

export default LoginPage;
