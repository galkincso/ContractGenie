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
import { createWorker } from 'tesseract.js';
import OpenAI from "openai";
import { useId } from 'react';

const UploadContract = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [contractName, setContractName] = useState('');
    const [ocrData, setOcrData] = useState('');
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const id = useId();
    const [newContract, setNewContract] = useState('');
    const contractSchema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "content": {
                "type": "string"
            },
            "summary": {
                "type": "string"
            },
            "subjects": {
                "type": "number"
            },
            "documents": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            },
            "namingConventions": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            }
        }
    }
    const systemCommand = "Egy képből kinyert szerződés szövegét fogod megkapni, ami helytelen. A feladatod, hogy írd le a szerződés tartalmi részét általános szerződéssablonként úgy, hogy a felek ne szerepeljenek benne, se az elején, se a végén, nem kell az aláírásoknak hely és az egész tartalmi részt tartalmazza. Továbbá írj egy max 3 mondatos összefoglalót, hogy mire jó az adott szerződés, írd le hány fél köti a szerződést, milyen személyes dokumentumok kellenek (ezek közül válaszd ki a szükségeseket: Személyi igazolvány, Lakcímkártya, Adóigazolvány) és hogyan hívod a feleket, milyen elnevezési konvenció van."

    function handleBack(event) {
        navigate("/");
    }

    function handleContractName(event) {
        setContractName(event.target.value);
    }


    /**
     * OCR API Call
     * @param {image} toConvertImage 
     * @returns text from the image
     */
    const convertImageToText = async (toConvertImage) => {
        const worker = await createWorker('hun');
        const ret = await worker.recognize(toConvertImage);
        await setOcrData(ret.data.text);
        await worker.terminate();
        //console.log("Raw Text: ", ret.data.text);
        return ret.data.text;
    }

    /**
     * ChatGPT API Call
     */
    async function question_answer(text) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemCommand },
                { role: "user", content: text }
            ],
            functions: [{ name: "contract", description: "Írd le a szerződés tartalmát, összegzését, felek számát, szükséges dokumentumokat és elnevezési konvenciókat.", parameters: contractSchema }],
            function_call: { name: "contract" },
            temperature: 0.5,
            top_p: 1,
        });

        console.log(completion.choices[0]);
        return JSON.parse(completion.choices[0].message.function_call.arguments);
    }

    /**
     * This function is handling the upload process
     * @param {*} event 
     */
    async function handleUpload(event) {
        /* Feltöltődik a kép */
        setFile(event.target.files[0]);

        /* OCR -> képből szöveg */
        var text = await convertImageToText(event.target.files[0]);
        console.log("Image text: ", text);

        /*  ChatGPT -> szerződéssablon */
        var contract_data = await question_answer(text);
        console.log("Contract data: ", contract_data);

        /* var mix = await question_answer(
            text,
            "Egy képből kinyert szerződés szövegét fogod megkapni. 1. Írj egy max 3 mondatos összegzőt, összefoglalót, hogy mire jó. 2. Egy számmal írd le, hogy hány fél köti a szerződést? pl: 2 2. Vesszővel elválasztva írd le, hogy a szerződés megkötéséhez milyen személyes dokumentumok kellenek: személyi igazolvány, lakcímkártya, adóigazolvány, stb. 3. Vesszővel elválasztva írd le a szerződő felek neveit, az elnevezési konvenciókat. Pl szállító, megrendelő"
        );
        console.log("Mix: ", mix); */

        /*  ChatGPT -> tartalom */
        /* var content = await question_answer(
            text,
            "Egy képből kinyert szerződés szövegét fogod megkapni. Írd le a szerződés tartalmi részét általános szerződéssablonként úgy, hogy a felek ne szerepeljenek benne, se az elején, se a végén, nemm kell az aláírásoknak hely. "
        );
        console.log("Content: ", content); */

        /*  ChatGPT -> összegzés */
        /* var summary = await question_answer(
            contractName,
            "Egy szerződésfajta nevét kapod meg. Írj egy max 3 mondatos összefoglalót, hogy mire jó az adott szerződés."
        );
        console.log("summary: ", summary); */

        /*  ChatGPT -> felek az elnevezési konvenciókből kiszámolom */
        /* var subjects = await question_answer(
            contractName,
            "Egy szerződésfajtának a nevét fogod megkapni. Hány fél köti? Csak a számot írd le."
        );
        console.log("subjects: ", subjects); */

        /*  ChatGPT -> dokumentumok */
        /*  var documents = await question_answer(
             contractName,
             "Egy szerződésfajta nevét kapod meg. Milyen személyes dokumentumok kellene egy ilyen szerződés megkötéséhez? Vesszővel elválasztva csak a nevüket írd le, ezek közül válassz: személyi igazolvány, lakcímkártya, adóigazolvány"
         );
         console.log("documents: ", documents); */

        /*  ChatGPT -> elnevezések */
        /* var namingConventions = await question_answer(
            contractName,
            "Egy szerződésfajta nevét kapod meg. Hogyan hívod a feleket? Mi az elnevezési konvenció? Csak a neveket írd le, vesszővel elválasztva, pl: bérlő, bérbeadó."
        );
        console.log("namingConventions: ", namingConventions);

        var contract_data = {
            "content": content,
            "summary": summary,
            "subjects": 2,
            "documents": documents,
            "namingConvention": namingConventions
        } */
        setNewContract(contract_data);


    }

    async function handleSave() {

        /* Create body */
        var id = crypto.randomUUID();
        var body = {
            "id": id,
            "name": contractName,
            "content": newContract.content,
            "summary": newContract.summary,
            "subjects": newContract.subjects,
            "documents": newContract.documents,
            "namingConvention": newContract.namingConventions
        }
        console.log("Body: ", body);

        /* Upload contract */
        axios.post('http://localhost:8080/contract/create', body)
            .then(response => {
                if (response.status === 200) {
                    navigate("/");
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
                                            <TextField onChange={handleUpload} type='file' id="standard-basic" label="Standard" variant="standard" disabled={contractName?.length === 0} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                <div className='btnBack options'>
                    <Button
                        disabled={newContract?.length === 0 || contractName?.length === 0}
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