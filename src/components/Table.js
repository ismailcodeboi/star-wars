import React, {useEffect} from 'react';
//import DataTable, { createTheme } from "react-data-table-component";
//import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../helpers/movies";
import { TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export function Table(props) {
    const dispatch = useDispatch();

    /*const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };*/

    const moviesStatus = useSelector( state => state.data.status);

    const movies = useSelector(state => state.data);

    useEffect(() => {
        if(moviesStatus === 'idle') {
            let getData = setTimeout(() => {
                dispatch(fetchMovies());
            }, 0)
            return () => clearTimeout(getData)
        }
    }, [dispatch, moviesStatus]);

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Release Date',
            selector: row => row.releaseDate,
            sortable: true,
        },
        {
            name: 'Director',
            selector: row => row.director,
        },
    ]

    /*createTheme(
        'solarized',
        {
            text: {
                primary: '#ffffff',
                secondary: '#2aa198',
            },
            background: {
                default: '#000000',
            },
            context: {
                background: '#cb4b16',
                text: '#FFFFFF',
            },
            divider: {
                default: '#ffffff',
            }
        },
        'dark',
    );*/

    return (

        <TableContainer>
            {/*<DataTable
                columns={columns}
                data={movies.movies}
                onRowClicked={ (row, event) => {handleClick(row.id)}}
                theme="solarized"
            />*/}

            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((row) => (
                            <TableCell>{row.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.movies.map((row) => (
                        <TableRow key={row.id}
                        >
                            <TableCell> {row.title}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.releaseDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Table;