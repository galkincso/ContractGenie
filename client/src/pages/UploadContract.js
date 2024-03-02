import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UploadContract = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='header'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Szerződés feltöltése
                    </Typography>
                </Box>
            </div>

        </>
    )

};
export default UploadContract;