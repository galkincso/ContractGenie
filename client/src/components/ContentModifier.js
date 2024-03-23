import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';

const ContentModifier = (props) => {

    function handleBack() {
        props.setFlow('PersonalData');
    }
    function handleClick() {

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
        <div className='custom-textfield'>
        <TextField
                id="outlined-multiline-static"
                label="Tartalom"
                multiline
                fullWidth
                defaultValue={props.contract.content}
            />
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