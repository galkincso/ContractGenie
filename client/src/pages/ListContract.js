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


const ListContract = () => {

    const navigate = useNavigate();

    const columns = [
        { id: 'name', label: 'Név' },
        { id: 'analize', label: 'Kifejtés' },
    ];
    const rows = [
        createData('Megbízási szerződés', 'Kérem az adatokat'),
        createData('Vállalkozási ', 'Kérem az adatokat'),
        createData('Letéti szerződés', 'Kérem az adatokat'),
        createData('Ajándékozási szerződés', 'Kérem az adatokat'),
        createData('Bérleti szerződés', 'Kérem az adatokat'),
        createData('Meghatalmazás', 'Kérem az adatokat'),
        createData('Adásvételi szerződés', 'Kérem az adatokat'),
        createData('Munkaszerződés', 'Kérem az adatokat')
    ];


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function createData(name, analize) {
        return { name, analize };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function handleBack(event) {
        navigate("/");
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
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={rows.length}
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
