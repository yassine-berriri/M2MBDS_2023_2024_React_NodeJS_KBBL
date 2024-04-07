import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
const { REACT_APP_API_URL } = process.env;

export const fetchStat= createAsyncThunk(
    "stat/getstats",
    async () => {
        try {
            const response = await axios.get(REACT_APP_API_URL + "/api/getstat");
            console.log('je suis dans le thunk stat', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching pxBoard:', error.message);
            throw error;
        }
    }
);




