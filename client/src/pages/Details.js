import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Details = () => {

    const navigate = useNavigate();
    let { id } = useParams();
    const [file, setFile] = useState('');
    const [photo, setPhoto] = useState('');

    function handleBack(event) {
        navigate("/list");
    };

    useEffect(() => {
        var url = '/contract/' + {id}.id;
        axios.get(url)
            .then(response => {setFile(response.data); setPhoto("http://localhost:8080/files/"+response.data.fileName);});
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
            <div>
                <img width={450} height={500} src= {photo} alt='contract'/>
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