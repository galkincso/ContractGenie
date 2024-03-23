import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { Table } from 'reactstrap';
import axios from 'axios';


const PersonalData = (props) => {

    const document = [];
    const tableRows = [];

    for (let i = 0; i < props.contract.subjects; i++) {

            switch (props.contract.documentId) {
            case 1:
                tableRows.push(
                <TableRow key={i+"adó"} >
                    <TableCell align="left">Adóigazolvány</TableCell>
                    <TableCell align="right">
                        <TextField onChange={handleUpload} type='file' id="standard-basic" label="Standard" variant="standard" />
                    </TableCell>
                </TableRow> )             
                break;
            case 2:
                document.push("Lakcímkártya");
                break;
            case 3:
                document.push("Személyi igazolvány");
                break;
            case 4:
                tableRows.push(
                    <TableRow key={i+"adó"} >
                        <TableCell align="left">Alany {i+1} Adóigazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Standard" variant="standard" />
                        </TableCell>
                    </TableRow> )  
                tableRows.push(
                    <TableRow key={i+"lakcím"} >
                        <TableCell align="left">Alany {i+1} Lakcímkártya</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Standard" variant="standard" />
                        </TableCell>
                    </TableRow> )  
                break;
            case 5:
                document.push("Adóigazolvány");
                document.push("Személyi igazolvány");
                break;
            default:
                document.push("Lakcímkártya");
                document.push("Személyi igazolvány");
                break;
        }
    };

function handleBack() {
    props.setFlow('SelectContract');
}
function handleClick() {
    props.setFlow('ContentModifier');
}
function handleUpload() {
}

return (
    <>

        <div className='center-text'>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4">
                    Szükséges adatok
                </Typography>
            </Box>
        </div>

        <form>
            <div className='list-table'>
                <Paper sx={{ width: '70%', overflow: 'hidden' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {tableRows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            <div className='btnBack options'>
                <Button
                    onClick={handleBack}
                    variant="contained" size='large'
                    startIcon={<ArrowBackIcon />}>Vissza</Button>
                <Button
                    onClick={handleClick}
                    variant="contained" size='large'
                    startIcon={<DoneIcon />}>Tovább
                </Button>

            </div>
        </form>


    </>
)
};
export default PersonalData;