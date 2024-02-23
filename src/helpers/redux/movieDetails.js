import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSingleMovie} from "../api";

const initialState = {
    movieDetails: {},
    status: 'idle',
    error: null
}

const movieDetail = createSlice ({
    name: 'movieDetails',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
            .addCase(fetchSingleMovie.pending, (state, action) => {
            state.status = 'loading'
            })
            .addCase(fetchSingleMovie.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = state.movieDetails = action.payload
            })
            .addCase(fetchSingleMovie.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
        });
    }
});

export default movieDetail.reducer

export const fetchSingleMovie= createAsyncThunk('movies/fetchSingleMovie', async (id) => {
    return getSingleMovie(id)
});