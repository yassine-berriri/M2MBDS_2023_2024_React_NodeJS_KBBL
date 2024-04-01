// userThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userStart, userSuccess, userFailure } from './userSlice';
const { REACT_APP_API_URL } = process.env;



// Thunk action for user sign-in
export const signInUser = createAsyncThunk(
  'user/signIn',
  async (userData, { dispatch }) => {
    try {
      dispatch(userStart());
      const response = await axios.post(`http://localhost:3001/api/login`, userData);
      //const response = await axios.post(REACT_APP_API_URL + '/api/login', userData);
      console.log(response);
      // Save token to localStorage instead of Redux store
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role || '');
      localStorage.setItem('id', response.data.user._id || '');
      dispatch(userSuccess(response.data)); 
    } catch (error) {
      localStorage.setItem('token', null);
      dispatch(userFailure(error.message));
    }
  }
);

// Thunk action for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { dispatch }) => {
    try {
      dispatch(userStart());
      const response = await axios.post(`http://localhost:3001/api/register`, userData);
      //const response = await axios.post(REACT_APP_API_URL + '/api/register', userData);
      dispatch(userSuccess(response.data)); // Dispatch userSuccess action on successful registration
    } catch (error) {
      dispatch(userFailure(error.message)); // Dispatch userFailure action if registration fails
    }
  }
);
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId, { dispatch }) => {
    try {
      dispatch(userStart());
      const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
      //const response = await axios.get(REACT_APP_API_URL + '/api/user/${userId}');
      //console.log(response.data);
      dispatch(userSuccess(response.data)); 
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { dispatch }) => {
    try {
      dispatch(userStart());
      console.log(userData.userId);
      const response = await axios.put(`http://localhost:3001/api/user/${userData.userId}`, userData.updatedData);
            //const response = await axios.put(REACT_APP_API_URL + '/api/user/${userData.userId}', userData.updatedData);
      const updatedUserData = response.data; 
      dispatch(userSuccess(updatedUserData, "Profile updated successfully"));
      return updatedUserData; 
    } catch (error) {
      dispatch(userFailure(error.message)); 
      throw error; 
    }
  }
);

