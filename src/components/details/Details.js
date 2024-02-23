import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleMovie} from "../../helpers/redux/movieDetails";
import {useNavigate, useParams} from "react-router-dom";
import {
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import DetailsList from "./DetailsList";


function Details() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const moviesStatus = useSelector(state => state.movieData.status);
    const routeParams = useParams();
    const movieDetails = useSelector(state => state.movieData.movieDetails);
    console.log(movieDetails);
    useEffect(() => {
        if (moviesStatus === 'idle') {
            let getData = setTimeout(() => {
                dispatch(fetchSingleMovie(routeParams.id));
            }, 0)
            return () => clearTimeout(getData)
        } else if (moviesStatus === 'succeeded') {
            setLoading(false);
        }
    }, [dispatch, moviesStatus, routeParams.id]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/`);
    }

    if (loading) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }
    return (
        <Card sx={{margin: "50px"}}>
            <IconButton sx={{display: "flex"}} aria-label="settings" onClick={handleBackClick} color="secondary">
                <ArrowBack/>
                <Typography variant="body2">Back to list</Typography>
            </IconButton>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {movieDetails.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Director: {movieDetails.director}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Producer: {movieDetails.producer}
                </Typography>
                <Divider sx={{ margin: "10px 0px 10px 0px"}}/>
                <Typography variant="h6">Description: </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ margin: "0px 5px 25px 5px"}}>
                    {movieDetails.description}
                </Typography>
                <Divider/>
                <DetailsList props={{name: "Characters:", data: movieDetails.characters}}/>
                <Divider/>
                <DetailsList props={{name: "Planets:", data: movieDetails.planets}}/>
                <Divider/>
                <DetailsList props={{name: "Species:", data: movieDetails.species}}/>
                <Divider/>
                <DetailsList props={{name: "Vehicles:", data: movieDetails.vehicles}}/>
                <Divider/>
                <DetailsList props={{name: "Starships:", data: movieDetails.starships}}/>
            </CardContent>
        </Card>
    );
}

export default Details;