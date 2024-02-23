import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleMovie} from "../helpers/redux/movieDetails";
import {useNavigate, useParams} from "react-router-dom";
import {
    Backdrop,
    Card,
    CardContent,
    CardMedia, CircularProgress,
    Divider, IconButton, List,
    ListItem, ListItemIcon, ListItemText,
    Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {ArrowBack} from "@mui/icons-material";


function Details() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const moviesStatus = useSelector( state => state.movieData.status);
    const routeParams = useParams();
    const movieDetails = useSelector(state => state.movieData.movieDetails);
    console.log(movieDetails);
    useEffect(() => {
        if(moviesStatus === 'idle') {
            let getData = setTimeout(() => {
                dispatch(fetchSingleMovie(routeParams.id));
            }, 0)
            return () => clearTimeout(getData)
        }else if( moviesStatus === 'succeeded') {
            setLoading(false);
        }
    }, [dispatch, moviesStatus, routeParams.id]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/`);
    }

    if(loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return (
        <Card sx={{ margin: "50px"}}>
                <IconButton sx={{ display: "flex"}} aria-label="settings" onClick={handleBackClick}>
                    <ArrowBack />
                    <Typography variant="body2" >Back to page</Typography>
                </IconButton>
                <CardMedia
                    component="img"
                    height="140"
                    image = {`/assets/${routeParams.id}.png`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {movieDetails.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Director: {movieDetails.director}
                    </Typography>
                    <Typography  gutterBottom variant="h5" component="div">
                        Producer: {movieDetails.producer}
                    </Typography>
                    <Divider/>
                    <Typography variant="h6">Description: </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movieDetails.description}
                    </Typography>
                    <Divider/>
                    <Typography variant="h6">Characters: </Typography>
                    <List sx={{ width: '100%', height: 200, display: 'flex', flexFlow: 'column wrap' }}>
                        {movieDetails.characters.map((character) => (
                            <ListItem sx={{width: 'auto'}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={character}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Typography variant="h6">Planets: </Typography>
                    <List sx={{ width: '100%', height: 200, display: 'flex', flexFlow: 'column wrap' }}>
                        {movieDetails.planets.map((planet) => (
                            <ListItem sx={{width: 'auto'}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={planet}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Typography variant="h6">Species: </Typography>
                    <List sx={{ width: '100%', height: 200, display: 'flex', flexFlow: 'column wrap' }}>
                        {movieDetails.species.map((specie) => (
                            <ListItem sx={{width: 'auto'}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={specie}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Typography variant="h6">Vehicles: </Typography>
                    <List sx={{ width: '100%', height: 200, display: 'flex', flexFlow: 'column wrap' }}>
                        {movieDetails.vehicles.map((vehicle) => (
                            <ListItem sx={{width: 'auto'}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={vehicle}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Typography variant="h6">Starships: </Typography>
                    <List sx={{ width: '100%', height: 200, display: 'flex', flexFlow: 'column wrap' }}>
                        {movieDetails.starships.map((starship) => (
                            <ListItem sx={{width: 'auto'}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={starship}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
        </Card>
    );
}

export default Details;