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
export const deletePxBoard = createAsyncThunk(
    "pxBoard/deletePxBoard",
    async (id) => {
        try {
            const response = await axios.delete(REACT_APP_API_URL + `/api/deletePxBoard/${id}`);
            console.log('je suis dans le thunk', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting pxBoard:', error.message);
            throw error;
        }
    }
);

export const updatePxBoard = createAsyncThunk(
    "pxBoard/updatePxBoard",
    async (   updateData ) => { // Notez que nous attendons ici un objet avec id et updateData
        try {
            console.log('Je suis dans le thunk de mise à jour:', updateData._id, updateData);
            const response = await axios.put(`${REACT_APP_API_URL}/api/updatePxBoard/${updateData._id}`, updateData);
            console.log('Réponse du thunk de mise à jour:', response.data);
            return response.data.pxBoard;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du pxBoard:', error.message);
            throw error;
        }
    }
);


export const fetchPxBoardById = createAsyncThunk(
    "pxBoard/fetchPxBoardById",
    async (id) => {
        try {
            const response = await axios.get(REACT_APP_API_URL + `/api/pxBoard/${id}`);
            console.log('je suis dans le thunk', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching pxBoard:', error.message);
            throw error;
        }
    }
);



