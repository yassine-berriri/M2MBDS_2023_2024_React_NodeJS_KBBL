import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
const { REACT_APP_API_URL } = process.env;

export const fetchPxBoard = createAsyncThunk(
    "pxBoard/fetchPxBoard",
    async () => {
        try {
            const response = await axios.get(REACT_APP_API_URL + "/api/allpxBoards");
            console.log('je suis dans le thunk', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching pxBoard:', error.message);
            throw error;
        }
    }
);

export const createPxBoard = createAsyncThunk(
    "pxBoard/createPxBoard",
    async (data) => {
        try {
            const response = await axios.post(REACT_APP_API_URL + "/api/createPxBoard", data);
            console.log('je suis dans le thunk', response.data);
            return response.data.pxBoard;
        } catch (error) {
            console.error('Error creating pxBoard:', error.message);
            throw error;
        }
    }
);
