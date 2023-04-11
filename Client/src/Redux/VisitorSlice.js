import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { url } from './Api';
import axios from 'axios';

export const getVisitor = createAsyncThunk('visitor/fetchVisitorCount', async () => {
    const response = await axios.get(`${url}/visitor`);
    return response.data.counter;
});

const visitorSlice = createSlice({
    name: 'visitor',
    initialState: { count: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVisitor.fulfilled, (state, action) => {
            state.count = action.payload;
        });
    },
});

export default visitorSlice.reducer;