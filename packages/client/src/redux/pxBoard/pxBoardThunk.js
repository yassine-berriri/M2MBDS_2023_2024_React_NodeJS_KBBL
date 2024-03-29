import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchPxBoard = createAsyncThunk(
    "pxBoard/fetchPxBoard",
    async () => {
        const response = await fetch("http://localhost:8010/api/pxBoards");
        const data = await response.json();
        console.log('je suis dans le thunk', data);
        return data; 
    }
);

