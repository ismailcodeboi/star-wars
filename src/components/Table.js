import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../helpers/redux/movies";
import {
    Backdrop,
    Box, CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {visuallyHidden} from "@mui/utils";

export function MovieTable() {
    const dispatch = useDispatch();
    const [orderBy, setOrderBy] = useState('Title');
    const [order, setOrder] = React.useState('asc');
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const headCells = [
        {
            id: "title",
            label: "Title"
        },
        {
            id: "releaseDate",
            label: "Release Date"
        },
        {
            id: "director",
            label: "Director"
        }
    ]

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const moviesStatus = useSelector( state => state.data.status);

    const movies = useSelector(state => state.data);

    const sortedMovies = useMemo(
        () =>
            stableSort(movies.movies, getComparator(order, orderBy)),
        [getComparator, movies.movies, order, orderBy],
    );

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(moviesStatus === 'idle') {
            let getData = setTimeout(() => {
                dispatch(fetchMovies());
            }, 0);
            return () => clearTimeout(getData);
        }else if( moviesStatus === 'succeeded') {
            setLoading(false);
        }
    }, [dispatch, moviesStatus, setLoading]);

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
                    <TableContainer component={Paper} sx={{ margin: "50px", width: "auto"}}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headCell) =>(
                                        <TableCell
                                            key={headCell.id}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={handleRequestSort(headCell.id)}
                                            >
                                                {headCell.label}
                                                {orderBy === headCell.id ? (
                                                    <Box component="span" sx={visuallyHidden}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedMovies.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        onClick={() => handleClick(row.id)}
                                    >
                                        <TableCell >{row.title}</TableCell>
                                        <TableCell >{row.releaseDate}</TableCell>
                                        <TableCell >{row.director}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

    );
}