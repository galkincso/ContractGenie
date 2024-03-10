import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createWorker } from 'tesseract.js';

const Details = () => {

    const navigate = useNavigate();
    let { id } = useParams();
    const [file, setFile] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoData, setPhotoData] = useState('');

    const worker = createWorker();

    const convertImageToText = async (toConvertImage) => {
        console.log("Átadva", toConvertImage);
        const worker = await createWorker('hun');
        const ret = await worker.recognize(toConvertImage);
        console.log(ret.data.text);
        setPhotoData(ret.data.text);
        await worker.terminate();

        //console.log(fileData);
        //await worker.loadLanguage("hun");
        //await worker.initialize("hun");
        //const {data} = await worker.recognize(photo);
        //console.log(data);
    }

    function handleBack(event) {
        navigate("/list");
    };

    /*const getData = async () => {
        var url = '/contract/' + { id }.id;
        const response = await axios.get(url);
        setFile(response.data); 
        setPhotoUrl("http://localhost:8080/files/" + response.data.fileName);
              
        const res = await axios.get("http://localhost:8080/files/" + response.data.fileName);
        setPhotoData(res.data);
        convertImageToText(res.data);
    }*/

    useEffect(() => {
        var url = '/contract/' + { id }.id;
        axios.get(url)
            .then(response => {
                setFile(response.data);
                setPhotoUrl("http://localhost:8080/files/" + response.data.fileName);
                convertImageToText("http://localhost:8080/files/" + response.data.fileName);
            })

        //getData();
        //console.log(photoData);

    }, [])

    return (
        <>
            <div className='center-text'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        {file.name}
                    </Typography>
                </Box>
            </div>
            <div className='content'>
                <div>
                    <img width={450} height={500} src={photoUrl} alt='contract' />
                </div>
                <div>
                    <p>{photoData}</p>
                </div>
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
export default Details;