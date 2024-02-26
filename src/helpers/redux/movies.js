import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllMovie} from "../api";

const initialState = {
    movies: [],
    status: 'idle',
    error: null
}

const movies = createSlice ({
    name: 'movies',
    initialState,
    reducers : {
        changeListStatus: state => {
            state.status = "idle";
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
        })
    }
});

export default movies.reducer

export const {changeListStatus} = movies.actions

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    return getAllMovie();
});