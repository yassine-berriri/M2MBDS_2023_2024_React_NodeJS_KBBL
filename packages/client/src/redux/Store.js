// store.js
import { configureStore } from '@reduxjs/toolkit';
import pxBoardReducer from './pxBoard/pxBoardSlice';

export const store = configureStore({
    reducer: {
        pxBoard: pxBoardReducer
    }
});