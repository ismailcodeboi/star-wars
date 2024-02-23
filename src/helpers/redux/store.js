import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './movies';
import movieDetails from "./movieDetails";

export default configureStore({
    reducer: {
        data: moviesReducer,
        movieData: movieDetails
    },
})