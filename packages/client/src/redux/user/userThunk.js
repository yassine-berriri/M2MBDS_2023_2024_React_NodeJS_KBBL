// userThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userStart, userSuccess, userFailure } from './userSlice';


// Thunk action for user sign-in
export const signInUser = createAsyncThunk(
  'user/signIn',
  async (userData, { dispatch }) => {
    try {
      dispatch(userStart());
      const response = await axios.post('http://localhost:3001/api/login', userData);
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


