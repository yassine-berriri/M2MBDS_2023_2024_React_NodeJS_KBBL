import { configureStore } from '@reduxjs/toolkit';
import pxBoardReducer from './pxBoard/pxBoardSlice';
import userReducer from './user/userSlice'


export const store = configureStore({
    reducer: {
        pxBoard: pxBoardReducer,
        user: userReducer,

    }
});