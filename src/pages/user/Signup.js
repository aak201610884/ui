import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-8 sm:w-96 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-black">Sign Up</h2>
<a href="/user/signup_email">
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4">
          Sign Up with Email
        </button>
</a>
          <a href="http://localhost:5003/auth/google">

        <button className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded mb-4">
          Sign Up with Google
        </button>
          </a>
        <div className="text-center">
          <span>Already have an account?</span>
          <Link to="/user/login" className="text-blue-500 ml-1">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
