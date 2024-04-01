// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { signInUser } from './userThunk';
import { registerUser } from './userThunk';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem('token') ? true : false, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
     
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      });
  },
});
// userSlice.js
export const userStart = createAction('user/start');
export const userSuccess = createAction('user/success');
export const userFailure = createAction('user/failure');

export default userSlice.reducer;
