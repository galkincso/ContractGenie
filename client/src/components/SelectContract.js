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

    function handleClick (id) {
        console.log(id);
        //props.function('PersonalData');
    }

    return (
        <>
            <div className='center-text'>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">
                        Milyen szerződésre van szükséged?
                    </Typography>
                </Box>
            </div>

            <Grid className='custom-grid' container spacing={3} columns={{ xs: 4, md: 12 }}>
                {contracts.map((contract) => (
                    <Grid key={contract.id} item xs={4}>
                        <Card  variant="outlined" sx={{ maxWidth: 400 }}>
                            <CardActionArea onClick={handleClick(contract.id)}>
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
        </>
    ) 

};
export default SelectContract;