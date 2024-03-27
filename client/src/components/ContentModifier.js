import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';

const ContentModifier = (props) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        formatText(props.contract.content);
    }, [])

    function handleBack() {
        props.setFlow('PersonalData');
    }
    function handleClick() {
        console.log("Kinyerve: ", content);
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
                <textarea onChange={e => setContent(e.target.value)} defaultValue={content} className='custom-textarea' />
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
        </>
    )
};
export default ContentModifier;
