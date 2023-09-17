import React, { useState } from 'react';
import TokenService from '../../../services/tokenService';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
function CreateProfile() {

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      phoneNumber: '',
      profilePicture: null, // For file upload (if applicable)
      userId: '', // Assuming you have a userId to link the profile to a user
    });
  
    const navigate = useNavigate();
    const userID = jwt_decode(TokenService.getToken())?.id;
  
    const handleChange = (e) => {
      if (e.target.type === 'file') {
        // Handle file upload separately
        setFormData({
          ...formData,
          profilePicture: e.target.files[0],
          userId: userID,
        });
      } else {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a FormData object for handling file uploads (if applicable)
      const formDataForFileUpload = new FormData();
      formDataForFileUpload.append('profilePicture', formData.profilePicture);
  
      // Remove profilePicture from the main formData
      const { profilePicture, ...combinedFormData } = formData;
  
      // Send a POST request to your backend API to create the user profile
      fetch('http://localhost:5003/profile/create', {
        method: 'POST',
        body: formDataForFileUpload, // Use the FormData object for file upload
        headers: {
          // 'Content-Type': 'multipart/form-data' should not be set manually here
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate('/massenger');
          // Handle success or error responses here
        })
        .catch((error) => {
          console.error(error);
        });
    };
  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4">Create User Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture:
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfile;
