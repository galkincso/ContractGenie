import { Height } from '@mui/icons-material';
import { Box, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'reactstrap';

const SelectContract = (props) => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))
    }, [])

    function handleClick(id) {
        navigate('/create/' + id);
    }

    return (
        <>
            <div className='center-text m-5'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Milyen szerződésre van szükséged?
                    </Typography>
                </Box>
            </div>

            <div className='mx-4 p-2'>
                <Grid className='custom-grid' container spacing={5} columns={{ xs: 4, md: 12 }}>
                    {contracts.map((contract) => (
                        <Grid key={contract.id} item xs={3}>
                            <Card className='custom-card h-100' sx={{ Height: '100%' }}>
                                <CardActionArea className='my-auto' onClick={() => handleClick(contract.id)}>
                                    <CardContent>
                                        <Typography className='paper-text' variant="h5" component="div">
                                            {contract.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {contract.summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )

};
export default SelectContract;