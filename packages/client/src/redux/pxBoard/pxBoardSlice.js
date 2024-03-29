import {createSlice} from '@reduxjs/toolkit';
import {fetchPxBoard} from './pxBoardThunk';

export const pxBoardSlice = createSlice({
    name: 'pxBoard',
    initialState: {
        pxBoards: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPxBoard.fulfilled, (state, action) => {
            state.pxBoards = action.payload;
            state.error = "";
        });
    }
});

export default pxBoardSlice.reducer;