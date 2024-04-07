import {createSlice} from '@reduxjs/toolkit';
import {fetchStat} from './statThunk';

export const statSlice = createSlice({
    name: 'stat',
    initialState: {
        stat: {},
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStat.fulfilled, (state, action) => {
            state.stat = action.payload;
             console.log('je suis stat', state.stat);
            state.error = null;
            state.loading = false;
        })
        .addCase(fetchStat.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(fetchStat.pending, (state) => {
            state.loading = true;
        })
        
    }
});

export default statSlice.reducer;