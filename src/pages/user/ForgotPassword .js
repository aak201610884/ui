import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/user/forgot', { email });
      setSubmitted(true);
      toast.success('An email  sent to your inbox.', {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-8 sm:w-96 w-full">
        <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            Reset Password
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/user/login" className="text-blue-500">
            Back to Log In
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
