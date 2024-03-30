import {createSlice} from '@reduxjs/toolkit';
import {createPxBoard, fetchPxBoard} from './pxBoardThunk';

export const pxBoardSlice = createSlice({
    name: 'pxBoard',
    initialState: {
        pxBoards: [],
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(fetchPxBoard.fulfilled, (state, action) => {
            state.pxBoards = action.payload;
            state.error = null;
            state.loading = false;
        })

        .addCase(fetchPxBoard.rejected, (state, action) => {
            state.error = action.error.message;
        })

        .addCase(fetchPxBoard.pending, (state) => {
            state.loading = true;
        })

        .addCase(createPxBoard.fulfilled, (state, action) => {
            state.pxBoards.push(action.payload);
            state.error = "";
            state.loading = false;
        })

        .addCase(createPxBoard.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(createPxBoard.pending, (state) => {
            state.loading = true;
        });

    }
});

export default pxBoardSlice.reducer;