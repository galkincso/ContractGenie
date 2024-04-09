import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { Table } from 'reactstrap';
import axios from 'axios';
import { createWorker } from 'tesseract.js';


const PersonalData = () => {

    const document = [];
    const tableRows = [];
    const [file, setFile] = useState([]);
    const [fileData, setFileData] = useState('');
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/contract/get/'+ {id}.id)
            .then(response => setContract(response.data))
    }, [])


    const worker = createWorker();

    const convertImageToText = async (toConvertImage) => {
        console.log("Átadva", toConvertImage);
        const worker = await createWorker('hun');
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

    for (let i = 0; i < contract.subjects; i++) {

            switch (contract.documentId) {
            case 1:
                tableRows.push(
                <TableRow key={i+"adó"} >
                    <TableCell align="left">Adóigazolvány</TableCell>
                    <TableCell align="right">
                        <TextField onChange={handleUpload} type='file' id="standard-basic" label="Adóigazolvány" variant="standard" />
                    </TableCell>
                </TableRow> )             
                break;
            case 2:
                tableRows.push(
                    <TableRow key={i+"lakcím"} >
                        <TableCell align="left">Alany {i+1} Lakcímkártya</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Lakcímkártya" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                break;
            case 3:
                tableRows.push(
                    <TableRow key={i+"személyi"} >
                        <TableCell align="left">Alany {i+1} Személyi igazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Személyi igazolvány" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                break;
            case 4:
                tableRows.push(
                    <TableRow key={i+"adó"} >
                        <TableCell align="left">Alany {i+1} Adóigazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Adóigazolvány" variant="standard" />
                        </TableCell>
                    </TableRow> )  
                tableRows.push(
                    <TableRow key={i+"lakcím"} >
                        <TableCell align="left">Alany {i+1} Lakcímkártya</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Lakcímkártya" variant="standard" />
                        </TableCell>
                    </TableRow> )  
                break;
            case 5:
                tableRows.push(
                    <TableRow key={i+"adó"} >
                        <TableCell align="left">Alany {i+1} Adóigazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Adóigazolvány" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                tableRows.push(
                    <TableRow key={i+"személyi"} >
                        <TableCell align="left">Alany {i+1} Személyi igazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Személyi igazolvány" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                break;
            default:
                tableRows.push(
                    <TableRow key={i+"lakcím"} >
                        <TableCell align="left">Alany {i+1} Lakcímkártya</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Lakcímkártya" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                tableRows.push(
                    <TableRow key={i+"személyi"} >
                        <TableCell align="left">Alany {i+1} Személyi igazolvány</TableCell>
                        <TableCell align="right">
                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Személyi igazolvány" variant="standard" />
                        </TableCell>
                    </TableRow> ) 
                break;
        }
    };

function handleBack() {
    navigate(-1);
}
function handleClick() {
    // itt kellene meghívni egy olyan függvényt, amelyik egy ciklusban beadja a fotókat az ai-nak, majd a szükséges datokat elmenti egy változóba
    // jelenleg handleUpload utolsó komment sora hívja
    navigate('/create/' + {id}.id + '/content');
}
function handleUpload(event) {
    file.push(event.target.files[0]);
    console.log("files: ", file);
    //convertImageToText(file[0]);
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