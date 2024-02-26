import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSingleMovie} from "../api";

const initialState = {
    movieDetails: {},
    status: 'idle',
    error: null,
    movieId: null
}

const movieDetail = createSlice ({
    name: 'movieDetails',
    initialState,
    reducers : {
            changeDetailStatus: state => {
                state.status = "idle";
            }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSingleMovie.pending, (state, action) => {
            state.status = 'loading'
            })
            .addCase(fetchSingleMovie.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movieDetails = action.payload
            })
            .addCase(fetchSingleMovie.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
        });
    }
});

export default movieDetail.reducer


export const {changeDetailStatus} = movieDetail.actions

export const fetchSingleMovie= createAsyncThunk('movies/fetchSingleMovie', async (id) => {
    return getSingleMovie(id)
});