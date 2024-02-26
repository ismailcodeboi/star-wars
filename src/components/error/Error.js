import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeListStatus} from "../../helpers/redux/movies";
import {changeDetailStatus} from "../../helpers/redux/movieDetails";


export default function Error() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changeListStatus());
        dispatch(changeDetailStatus());
        navigate("/")
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '75vh',
            }}
        >
            <Typography variant="h6" style={{ color: 'white' }}>
                An error has occured
            </Typography>
            <Button variant="text" onClick={handleClick}>Back Home</Button>
        </Box>
    );
}