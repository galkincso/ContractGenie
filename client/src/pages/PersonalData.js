import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { Table } from 'reactstrap';
import axios from 'axios';
import { createWorker } from 'tesseract.js';
import OpenAI from "openai";

const PersonalData = () => {

    const [file, setFile] = useState([]);
    const [ocrData, setOcrData] = useState([]);
    let { id } = useParams();
    const [contract, setContract] = useState('');
    const navigate = useNavigate();
    const [personalData, setPersonalData] = useState([]);
    const [updatePersonalData, setUpdatePersonalData] = useState(null);
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const other_schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "info": {
                "type": "string"
            }
        }
    }
    const address_schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "address": {
                "type:": "string"
            }
        }
    }

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
        console.log("Raw Text: ", ret.data.text);
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
     * ChatGPT API Call
     */
    async function question_answer(command, text, schema) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: command },
                { role: "user", content: text }
            ],
            functions: [{ 
                name: "personal_data", 
                description: "Írd le a kért adatot a megadott igazolványból kinyert szöveg alapján helyesen.", 
                parameters: schema }],
            function_call: { name: "personal_data" },
            temperature: 0.8,
            top_p: 1,
        });

        console.log(completion.choices[0]);
        return JSON.parse(completion.choices[0].message.function_call.arguments);
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
        var data;
        var response;
        switch (document) {
            case "Lakcímkártya":
                // Név és Lakóhely
                response = await question_answer(
                                    "Egy lakcímkártya képéből kinyert szövegét fogod megkapni, ami sok hibát tartalmaz. A feladatod, hogy írd le a személy teljes nevét és a laakóhelyét kijavítva a hibákat.",
                                    text,
                                    address_schema
                                )
                data = {
                    "namingConvention": namingConv,
                    "name": response.name,
                    "info": response.address
                }
                console.log("Data: ", data);
                break;
            case "Adóigazolvány":
                // Adószám
                response = await question_answer(
                                    "Egy adóigazolvány képéből kinyert szövegét fogod megkapni, ami sok hibát tartalmaz. A feladatod, hogy írd le az adóazonosító jelet kijavítva a hibákat.",
                                    text,
                                    other_schema
                                )
                data = {
                    "namingConvention": namingConv,
                    "info": response.info
                }
                break;
            case "Személyi igazolvány":
                // Személyi igazolvány szám
                response = await question_answer(
                                    "Egy személyi igazolvány képéből kinyert szövegét fogod megkapni, ami sok hibát tartalmaz. A feladatod, hogy írd le az okmányazonosító számot (Doc. No.) kijavítva a hibákat.",
                                    text,
                                    other_schema
                                )
                data = {
                    "namingConvention": namingConv,
                    "info": response.info
                }
                break;
            default:
                // Hibakezelés
                alert('Hiba történt az igazolvány csomportosításakor, kérlek próbáld újra később!')
                break;
        }
        setUpdatePersonalData(data);
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
                        startIcon={<DoneIcon />}>{'Tovább'}
                    </Button>
                </div>
            </form>

        </>
    )
};
export default PersonalData;