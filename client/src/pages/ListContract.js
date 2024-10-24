import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const ListContract = () => {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))
            .catch(err => console.log(err))
    }, [])

    const columns = [
        { id: 'name', label: 'Név' },
        { id: 'analize', label: 'Tartalom szerkesztése' },
        { id: 'delete', label: 'Törlés' },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function handleBack() {
        navigate("/");
    };
    function handleEdit(id) {
        navigate("/details/" + id);
    }

    function handleDelete(id) {
        // Delete contract
        axios.delete('http://localhost:8080/contract/delete/' + id)
            .then(res => console.log("Contract: ", res))

        setContracts(c => c.filter(item => item.id !== id));
    }


    return (
        <>
            <div className='center-text'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szerződések listázása
                    </Typography>
                </Box>
            </div>

            <div className='list-table'>
                <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contracts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                <TableCell key={row.id}>{row.name}</TableCell>
                                                <TableCell key={row.name + 'analize'}><Button
                                                    onClick={e => { handleEdit(row.id); }}
                                                    variant="contained"
                                                    color="primary">Szerkesztem</Button></TableCell>
                                                <TableCell key={row.name + 'delete'}><Button
                                                    onClick={e => { handleDelete(row.id); }}
                                                    variant="contained"
                                                    color="primary">Törlöm a szerződést</Button></TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={contracts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </Paper>
            </div>
            <div className='btnBack'>
                <Button
                    onClick={handleBack}
                    variant="contained" size='large'
                    startIcon={<ArrowBackIcon />}>Vissza</Button>
            </div>
        </>
    )

};
export default ListContract;