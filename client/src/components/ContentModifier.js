import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import TextareaAutosize from 'react-textarea-autosize';
import PDFfile from './PDFfile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const ContentModifier = () => {
    const [content, setContent] = useState('');
    const [contract, setContract] = useState('');
    const [personalData, setPersonalData] = useState([
        {
          namingConvention: "Bérbeadó",
          name: "GÁL KINCSŐ DÓRA",
          info: "2022 TAHITÓTFALU"
        },
        {
          namingConvention: "Bérbeadó",
          info: "9493783218"
        },
        {
          namingConvention: "Bérlő",
          name: "TESZT Elek",
          info: "1162 Buadpest"
        }
      ]);
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/contract/get/'+ {id}.id)
        .then(response => {
            formatText(response.data.content);
            setContract(response.data);
            })
        /*
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) setPersonalData(items);  
        console.log("Items: ", items);    
        */

    }, [])

    function handleBack() {
       navigate(-1);
    }
    function handleClick() {
        console.log("Adat: ", personalData[0]);
    }
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
            <div className='center-text'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szerződés tartalma
                    </Typography>
                </Box>
            </div>

            <div className='center-text'>
                <TextareaAutosize type="text" className='custom-textarea' onChange={e => setContent(e.target.value)} defaultValue={content} />
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
