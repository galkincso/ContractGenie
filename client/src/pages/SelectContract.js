import { Box, Button, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'reactstrap';

const SelectContract = () => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))
            .catch(err => {
                setOpenErrorDialog(true)
            })
    }, [])

    function handleClick(id) {
        navigate('/create/' + id);
    }
    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
        navigate('/');
    };

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
                <Grid className='custom-grid' container spacing={5} columns={{ xs: 4, sm: 6,  md: 9, lg: 12 }}>
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

            {/** Error */}
            <Dialog
                open={openErrorDialog}
                onClose={handleCloseErrorDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Hoppá.. Valami hiba történt!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Kérlek töltsd újra az oldalt vagy gyere vissza később.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleCloseErrorDialog} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

};
export default SelectContract;