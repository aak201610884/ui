import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TokenService from '../../services/tokenService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      const token=response.data;
      TokenService.setToken(token)
      console.log(token);

      // Handle response here (e.g., redirect on success, show error on failure)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex items-center  text-black justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-8 sm:w-96 w-full">
        <h2 className="text-2xl font-semibold mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500 text-black' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/user/forgot" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-4">
  
          <Link to="/user/signup" className="text-blue-500 ml-1">
            <button  className="w-full bg-blue-500 text-white py-2 px-4 rounded">
       create Account
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
