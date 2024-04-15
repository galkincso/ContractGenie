import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { Table } from 'reactstrap';
import axios from 'axios';
import { createWorker } from 'tesseract.js';


const PersonalData = () => {

    const [file, setFile] = useState([]);
    const [fileData, setFileData] = useState('');
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/contract/get/' + { id }.id)
            .then(response => setContract(response.data))
    }, [])


    const worker = createWorker();

    const convertImageToText = async (toConvertImage) => {
        console.log("image ", toConvertImage);
        const worker = await createWorker('hun');
        console.log("utána ", toConvertImage);
        const ret = await worker.recognize(toConvertImage);
        console.log(ret.data.text);
        setFileData(ret.data.text);
        await worker.terminate();

        //console.log(fileData);
        //await worker.loadLanguage("hun");
        //await worker.initialize("hun");
        //const {data} = await worker.recognize(photo);
        //console.log(data);
    }

    function createTable() {
        var table = [];
        for (let i = 0; i < contract.subjects; i++) {
            for (let k = 0; k < contract.documents.length; k++) {
                table.push(
                    <TableRow key={contract.id + contract.documents[k]} >
                        <TableCell align="left">{contract.namingConvention[i]}: {contract.documents[k]}</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label={contract.documents[k]} variant="standard" />
                        </TableCell>
                    </TableRow>)
            }
        }
        return table;
    }


    function handleBack() {
        navigate(-1);
    }
    function handleClick() {
        // itt kellene meghívni egy olyan függvényt, amelyik egy ciklusban beadja a fotókat az ai-nak, majd a szükséges datokat elmenti egy változóba
        // jelenleg handleUpload utolsó komment sora hívja
        navigate('/create/' + { id }.id + '/content');
    }
    function handleUpload(event) {
        setFile([...file, event.target.files[0]]);

        //console.log("files: ", file);
        convertImageToText(event.target.files[0]);
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
                                    {createTable()}
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