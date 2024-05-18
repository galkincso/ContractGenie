import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import axios from 'axios';

const UploadContract = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [contractName, setContractName] = useState('');

    function handleBack(event) {
        navigate("/");
    }

    function handleContractName(event) {
        setContractName(event.target.value);
    }
    function handleUpload(event) {
        setFile(event.target.files[0]);
    }

    function handleSave(event) {
        const formData = new FormData();
        formData.append('file', file);

        // upload file
       axios.post('http://localhost:8080/upload', formData)
            .then(response => {
                console.log("Válasz: ", response);
            })

        // upload contract
        var id = crypto.randomUUID();
        var body = {
            "id": id,
            "name": contractName,
            "fileName": file.name
        }
        console.log("Body: ", body);
        axios.post('http://localhost:8080/contract/save', body)
            .then(response => {
                if (response.status === 200) {
                    navigate("/list");
                }
            })
    }

    return (
        <>
            <div className='header'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szerződés feltöltése
                    </Typography>
                </Box>
            </div>
            <form>
                <div className='list-table'>
                    <Paper sx={{ width: '70%', overflow: 'hidden' }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Szerződés neve</TableCell>
                                        <TableCell align="right">
                                            <TextField id="standard-basic" label="Példa szerződés" variant="standard" onChange={handleContractName} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Fotó feltöltése</TableCell>
                                        <TableCell align="right">
                                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Standard" variant="standard" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                <div className='btnBack options'>
                    <Button
                        onClick={handleSave}
                        variant="contained" size='large'
                        startIcon={<DoneIcon />}>Kész
                    </Button>
                    <Button
                        onClick={handleBack}
                        variant="contained" size='large'
                        startIcon={<ClearIcon />}>Mégsem</Button>
                </div>
            </form>
        </>
    )

};
export default UploadContract;