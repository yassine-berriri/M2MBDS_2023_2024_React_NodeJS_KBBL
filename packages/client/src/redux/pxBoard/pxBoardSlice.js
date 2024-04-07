import {createSlice} from '@reduxjs/toolkit';
import {createPxBoard, fetchPxBoard, deletePxBoard, updatePxBoard, fetchPxBoardById, fetchPxBoardsByUserId} from './pxBoardThunk';

export const pxBoardSlice = createSlice({
    name: 'pxBoard',
    initialState: {
        pxBoards: [],
        pxBoard: {},
        pxBoardsByUserId: [],
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPxBoardsByUserId.fulfilled, (state, action) => {
            state.pxBoardsByUserId = action.payload;
            state.error = null;
            state.loading = false;
        })
        .addCase(fetchPxBoardsByUserId.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(fetchPxBoardsByUserId.pending, (state) => {
            state.loading = true;
        })
        
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
        })
        .addCase(deletePxBoard.fulfilled, (state, action) => {
            const index = state.pxBoards.findIndex(board => board.id === action.payload.id);
            if (index !== -1) {
                state.pxBoards = state.pxBoards.filter((board, i) => i !== index);
            }
            state.error = "";
            state.loading = false;
        })

        .addCase(deletePxBoard.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(deletePxBoard.pending, (state) => {
            state.loading = true;
        })
        
        .addCase(updatePxBoard.fulfilled, (state, action) => {
            // Trouver l'index du pxBoard mis à jour dans le tableau
            const index = state.pxBoards.findIndex(board => board.id === action.payload.id);
            // Si le pxBoard est trouvé, mettre à jour le tableau avec les nouvelles données
            console.log("Je suis dans le reducer de mise à jour", action.payload);
            console.log("Je suis dans le reducer de mise à jour index", index, state.pxBoards[index]);
            if (index !== -1) {
                state.pxBoards[index] = action.payload;
            }
            state.error = "";
            state.loading = false;
        })
        
        .addCase(updatePxBoard.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        
        .addCase(updatePxBoard.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchPxBoardById.fulfilled, (state, action) => {
            console.log("je suis dans le reducer fetchPxBoardById", action.payload);
            state.pxBoard = action.payload;
            state.error = "";
            state.loading = false;
        })

        .addCase(fetchPxBoardById.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(fetchPxBoardById.pending, (state) => {
            state.loading = true;
        })





    }
});

export default pxBoardSlice.reducer;