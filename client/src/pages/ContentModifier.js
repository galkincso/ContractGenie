import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import TextareaAutosize from 'react-textarea-autosize';
import PDFfile from '../components/PDFfile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const ContentModifier = () => {
    const [content, setContent] = useState('');
    const [contract, setContract] = useState('');
    const [personalData, setPersonalData] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/contract/get/'+ {id}.id)
        .then(response => {
            formatText(response.data.content);
            setContract(response.data);
            })
        .catch(err => {
            alert('Hoppá.. Valami hiba történt');
        })
        
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) setPersonalData(items);  
    }, [])

    function handleBack() {
       navigate(-1);
    }
    
    /**
     * Formats and breaks the text received in the parameter according to the numbers in the text
     * @param {contract content} text 
     */
    function formatText(text) {
        var formattedText = '';

        for (let i = 0; i < text.length; i++) {
            if (text[i] >= '0' && text[i] <= '9' && text[i + 1] === '.') {
                formattedText += '\n\n';
                formattedText += text[i];
            } else {
                formattedText += text[i];
            }
        }
        setContent(formattedText.slice(2));
    }

    return (
        <>
            <div className='center-text m-5'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szerződés tartalma
                    </Typography>
                </Box>
            </div>

            <div className='center-text'>
                <TextareaAutosize type="text" className='custom-textarea shadow-lg p-3 mb-5 bg-white rounded' onChange={e => setContent(e.target.value)} defaultValue={content} />
            </div>

            <div className='btnBack options'>
                <Button
                    onClick={handleBack}
                    variant="contained" size='large'
                    startIcon={<ArrowBackIcon />}>Vissza</Button>
                
                <PDFDownloadLink document={<PDFfile name={contract.name} content={content} subjectNames={contract.namingConvention} data={personalData}/>} fileName='szerződés'>
                    <Button
                        variant="contained" size='large'
                        startIcon={<DoneIcon />}>PDF letöltése
                    </Button>
                </PDFDownloadLink>
            </div>
        </>
    )
};
export default ContentModifier;