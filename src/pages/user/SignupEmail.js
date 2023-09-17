import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TokenService from '../../services/tokenService';
import{useNavigate} from 'react-router-dom'

const SignupEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate=useNavigate();

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
      const response = await axios.post('http://localhost:5003/user/signup', formData);
      
      // Handle response here (e.g., redirect on success, show error on failure)
      const token=response.data;
      console.log('Sign up successful:', token.accessToken);
      TokenService.setToken(token.accessToken)
      navigate('/profile')

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white shadow-md rounded px-8 py-8 sm:w-96 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border rounded text-stone-900 ${errors.email ? 'border-red-500' : ''}`}
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
              className={`w-full p-2 border rounded text-stone-900${errors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4">


            Sign Up with Email
         
          
          </button>
        </form>
          <p className='text-center'>Or</p>
  
          <a href="http://localhost:5000/auth/google" className='mt-5'>

<button  className="w-full bg-red-500 text-white mt-3 font-semibold py-2 px-4 rounded mb-4">
  Sign Up with Google
</button>
</a>

        <div className="text-center text-gray-600 ">
          <span>Already have an account?</span>
          <Link to="/user/login" className="text-blue-500 ml-1">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupEmail;
