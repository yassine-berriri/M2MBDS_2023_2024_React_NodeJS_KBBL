// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { registerUser, signInUser,updateUserProfile } from './userThunk';

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
      })
      .addCase(userSuccess, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload; 
        state.successMessage = action.meta; 
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = null;
        state.successMessage = action.meta; 
      });
  },
});
// userSlice.js
export const userStart = createAction('user/start');
export const userSuccess = createAction('user/success');
export const userFailure = createAction('user/failure');

export default userSlice.reducer;
