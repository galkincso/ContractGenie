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
    const [ocrData, setOcrData] = useState([]);
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();
    const [personalData, setPersonalData] = useState([]);
    const [updatePersonalData, setUpdatePersonalData] = useState(null);

    useEffect(() => {
        axios
            .get('/contract/get/' + { id }.id)
            .then(response => setContract(response.data))
            .catch(err => {
                alert('Hoppá.. Valami hiba történt');
            })
    }, [])

    /**
     * The upload is asynchronous and therefore the setting of personalData must also be asynchronous
     */
    useEffect(() => {
        if (updatePersonalData) {
            setPersonalData([...personalData, updatePersonalData]);
        }
    }, [updatePersonalData])

    /**
     * OCR API Call
     * @param {image} toConvertImage 
     * @returns text from the image
     */
    const convertImageToText = async (toConvertImage) => {
        const worker = await createWorker('hun');
        const ret = await worker.recognize(toConvertImage);
        await setOcrData([...ocrData, ret.data.text]);
        await worker.terminate();
        //console.log("Raw Text: ", ret.data.text);
        return ret.data.text;
    }

    /**
     * Create an array based on the persons involved and the necessary documents
     * @returns An array with the lines for upload documents
     */
    function createTable() {
        var table = [];
        for (let i = 0; i < contract.subjects; i++) {
            for (let k = 0; k < contract.documents.length; k++) {
                table.push(
                    <TableRow key={contract.id + i + k} >
                        <TableCell align="left">
                            <h5>
                            <b>{contract.namingConvention[i]}</b> : {contract.documents[k]}
                            </h5>
                            
                            </TableCell>
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

    /**
     * Question Ansering API Call
     * @param {context text} data 
     * @returns answer for the question
     */
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mcsabai/huBert-fine-tuned-hungarian-squadv2",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        )
        if (response.status !== 200) {
            alert('A képfeltöltés nem sikerült, próbáld újra!');
        }
        console.log("HF Error", response);
        const result = await response.json();
        return result;
    }

    const handleClick = async () => {
        await localStorage.setItem('items', JSON.stringify(personalData));
        navigate('/create/' + { id }.id + '/content');
    }

    /**
     * This function is handling the upload process
     * @param {*} event 
     * @param {naming conventions in the current contract} namingConv 
     * @param {required personal documents in the current contract} document 
     */
    const handleUpload = async (event, namingConv, document) => {
        /* Feltöltődik a kép */
        setFile([...file, event.target.files[0]]);

        /* OCR -> képből szöveg */
        var text = await convertImageToText(event.target.files[0]);

        /* QA -> szövegből adatok */
        var name;
        var answer;
        var data;
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
                        "question": "Okmányazonosító/Doc. No.?",
                        "context": text
                    }
                });
                console.log("Szem ig: ", answer.answer);
                data = {
                    "namingConvention": namingConv,
                    "info": answer.answer
                }
                break;
            default:
                // Hibakezelés
                alert('Hiba történt az igazolvány csomportosításakor, kérlek próbálj újra később!')
                break;
        }
        setUpdatePersonalData(data);
        //console.log("Personal Data: ", personalData);
    }

    return (
        <>
            <div className='center-text m-5'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szükséges adatok
                    </Typography>
                </Box>
            </div>

            <form>
                <div className='list-table'>
                    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
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
                        startIcon={<DoneIcon />}>{ 'Tovább'}
                    </Button>
                </div>
            </form>

        </>
    )
};
export default PersonalData;