import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.patch('http://localhost:5000/user/reset', { resetToken, newPassword });
      setSubmitted(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white shadow-md rounded px-8 py-8 sm:w-96 w-full">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
        {submitted ? (
          <p className="text-green-500 mb-4">Password reset successful.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full p-2 border rounded"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
