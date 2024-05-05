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
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();
    const [personalData, setPersonalData] = useState([]);

    useEffect(() => {
        axios
            .get('/contract/get/' + { id }.id)
            .then(response => setContract(response.data))
    }, [])

    const worker = createWorker();

    const convertImageToText = async (toConvertImage) => {
        const worker = await createWorker('hun');
        const ret = await worker.recognize(toConvertImage);
        console.log(ret.data.text);
        await setOcrData([...ocrData, ret.data.text]);
        await worker.terminate();
        return ret.data.text;
    }

    function createTable() {
        var table = [];
        for (let i = 0; i < contract.subjects; i++) {
            for (let k = 0; k < contract.documents.length; k++) {
                table.push(
                    <TableRow key={contract.id + i + k} >
                        <TableCell align="left">{contract.namingConvention[i]}: {contract.documents[k]}</TableCell>
                        <TableCell align="right">
                            <TextField onChange={(e) => handleUpload(e, contract.namingConvention[i], contract.documents[k])} type='file' id="standard-basic" label={contract.documents[k]} variant="standard" />
                        </TableCell>
                    </TableRow>)
            }
        }
        return table;
    }

    function handleBack() {
        navigate(-1);
    }

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

    const handleClick = async () => {
        // itt kellene meghívni egy olyan függvényt, amelyik egy ciklusban beadja a fotókat az ai-nak, majd a szükséges datokat elmenti egy változóba
        // jelenleg handleUpload utolsó komment sora hívja
        //console.log("ocrData: ", ocrData);
        /*for (let i = 0; i < ocrData.length; i++) {
            query({
                "inputs": {
                    "question": "Név?",
                    "context": ocrData[i]
                }
            }).then((response) => {
                console.log(JSON.stringify(response));
            });
        }*/
        console.log("átadva: ", personalData);
        await localStorage.setItem('items', JSON.stringify(personalData));
        navigate('/create/' + { id }.id + '/content');

    }

    const handleUpload = async (event, namingConv, document) => {
        /* Feltöltődik a kép */
        setFile([...file, event.target.files[0]]);

        /* OCR -> képből szöveg */
        console.log("Elinduk");
        var text = await convertImageToText(event.target.files[0]);
        console.log("Vége");

        /* QA -> szövegből adatok */
        var name;
        var answer;
        var data;
        console.log("Switch előtt");
        switch (document) {
            case "Lakcímkártya":
                // Név
                name = await query({
                    "inputs": {
                        "question": "Név?",
                        "context": text
                    }
                });
                // Lakóhely
                answer = await query({
                    "inputs": {
                        "question": "Lakóhely?",
                        "context": text
                    }
                });
                data = {
                    "namingConvention": namingConv,
                    "name": name.answer,
                    "info": answer.answer
                }
                break;
            case "Adóigazolvány":
                // Adószám
                answer = await query({
                    "inputs": {
                        "question": "ADÓAZONOSÍTÓ JEL?",
                        "context": text
                    }
                });
                data = {
                    "namingConvention": namingConv,
                    "info": answer.answer
                }
                break;
            case "Személyi igazolvány":
                // Személyi igazolvány szám
                answer = await query({
                    "inputs": {
                        "question": "Személyi igazolvány szám?",
                        "context": text
                    }
                });
                break;
            default:
                // Hibakezelés
                break;
        }
        console.log("Switch után");
        console.log("előtte fgv: ", personalData.length);
        setPersonalData([...personalData, data]);
        console.log("utána fgv: ", personalData.length);

    }
    const timer = (event, namingConv, document) => {
        setTimeout(() => {
            handleUpload(event, namingConv, document);
        }, 3000);
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
                        disabled={contract.subjects * contract.documents?.length !== personalData?.length}
                        onClick={handleClick}
                        variant="contained" size='large'
                        startIcon={<DoneIcon />}>{contract.subjects * contract.documents?.length !== personalData?.length ? 'Loading...' : 'Tovább'}
                    </Button>
                </div>
            </form>

        </>
    )
};
export default PersonalData;

/*
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
    */