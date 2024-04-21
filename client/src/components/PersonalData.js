import { Box, Button, Input, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { Table } from 'reactstrap';
import axios from 'axios';
import { createWorker } from 'tesseract.js';


const PersonalData = () => {

    const [file, setFile] = useState([]);
    const [ocrData, setOcrData] = useState([]);
    const [fileData, setFileData] = useState('');
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/contract/get/' + { id }.id)
            .then(response => setContract(response.data))
    }, [])

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mcsabai/huBert-fine-tuned-hungarian-squadv2",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    const worker = createWorker();

    const convertImageToText = async (toConvertImage) => {
        const worker = await createWorker('hun');
        const ret = await worker.recognize(toConvertImage);
        console.log(ret.data.text);
        setFileData(ret.data.text);
        await setOcrData([...ocrData, ret.data.text]);
        await worker.terminate();
    }

    function createTable() {
        var table = [];
        for (let i = 0; i < contract.subjects; i++) {
            for (let k = 0; k < contract.documents.length; k++) {
                table.push(
                    <TableRow key={contract.id + i + k} >
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
        console.log("ocrData: ", ocrData);
        for (let i = 0; i < ocrData.length; i++) {
            query({
                "inputs": {
                    "question": "Név?",
                    "context": ocrData[i]
                }
            }).then((response) => {
                console.log(JSON.stringify(response));
            });
        }

        navigate('/create/' + { id }.id + '/content');
    }
    function handleUpload(event) {
        setFile([...file, event.target.files[0]]);

        //console.log("files: ", file);
        convertImageToText(event.target.files[0]);
    }

    //const qna = require('@tensorflow-models/qna');

    const handleAnswear = async () => {
        console.log("OCR Data: ", ocrData);
        query({
            "inputs": {
                "question": "Melyik folyó szeli ketté Budapestet?",
                "context": "Magyarország fővárosát, Budapestet a Duna folyó szeli ketté. A XIX. században épült Lánchíd a dimbes-dombos budai oldalt köti össze a sík Pesttel. A Várdomb oldalában futó siklóval juthatunk fel a budai Óvárosba, ahol a Budapesti Történeti Múzeum egészen a római időkig visszavezetve mutatja be a városi életet. A Szentháromság tér ad otthont a XIII. századi Mátyás-templomnak és a Halászbástya lőtornyainak, amelyekből messzire ellátva gyönyörködhetünk a városban."
            }
        }).then((response) => {
            console.log(JSON.stringify(response));
        });
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
                    <Button
                        onClick={handleAnswear}
                        variant="contained" size='large'
                        startIcon={<DoneIcon />}>Kérdések
                    </Button>
                </div>
            </form>

        </>
    )
};
export default PersonalData;