import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleMovie} from "../helpers/movieDetails";
import {useParams} from "react-router-dom";


function Details() {
    const dispatch = useDispatch();
    ///const movie = useSelector( state => state.movieDetails);
    const moviesStatus = useSelector( state => state.movieData.status);
    const routeParams = useParams();

    useEffect(() => {
        if(moviesStatus === 'idle') {

            let getData = setTimeout(() => {
                dispatch(fetchSingleMovie(routeParams.id));
            }, 0)
            return () => clearTimeout(getData)
        }
    }, [dispatch, moviesStatus, routeParams.id]);
    return (
        <div class='detail-wrapper'>

        </div>
    );
}

export default Details;