import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography, Card, CardContent, CardActions, TableContainer, Table, tableClasses, TableBody, TableRow, TableCell, Stepper, Step, StepLabel, StepContent, Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const Home = () => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))
            .catch(err => setOpenErrorDialog(true))
    }, [])

    const steps = [
        {
            label: 'Válaszd ki, hogy milyen szerződésre van szükséged',
            description: `Válaszd ki a számodra legmegfelelőbb szerződést a sokféle lehetőség közül!
             Legyen szó bármilyen igényről vagy speciális feltételről, nálunk biztosan megtalálod a neked való megoldást.
            Fedezd fel a különböző szerződéstípusokat, és találd meg azt, ami tökéletesen illik a szükségleteidhez!`,
        },
        {
            label: 'Töltsd fel a fotókat a szükséges iratokról',
            description: `Csak töltsd fel a szükséges dokumentumok fotóit, és a Mesterséges Intelligencia elvégzi a munkát helyetted! 
                Ez nemcsak egyszerűbbé és gyorsabbá teszi a folyamatot,
                de kevesebb hibalehetőséget is jelent az adatok kitöltésekor.
                Így biztos lehetsz benne, hogy minden adat pontosan és helyesen kerül a szerződésbe.`,
        },
        {
            label: 'Szabd személyre a szerződés tartalmát',
            description: `Szabd személyre a szerződés részleteit az igényeidnek megfelelően! 
            Adj hozzá olyan kikötéseket és feltételeket, amelyek számodra fontosak. Legyen szó speciális szolgáltatásokról, 
            egyedi árazásról vagy bármilyen egyéb feltételről, 
            a szerződés minden részletét a saját igényeidhez igazíthatod, hogy tökéletesen megfeleljen az elvárásaidnak.`,
        },
    ];

    function handleClick(id) {
        navigate('/create/' + id);
    };

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            {/** Top content */}
            <div className='center-text'>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: '85%',
                            height: 'auto',
                        },
                        justifyContent: 'center',
                    }}>
                    <Paper
                        square={false}
                        className='shadow-lg p-5 mb-2 bg-white rounded'
                        elevation={3}>
                        <Typography
                            className='paper-text'
                            variant="h5"
                            noWrap
                            sx={{
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: 30
                            }}>
                            Itt a <b>szerződéskötés</b> olyan élmény, mint sehol máshol!
                        </Typography>
                        <Divider variant="middle" />
                        <Typography
                            className='paper-text p-2'
                            variant="h6"
                            sx={{
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}>
                            Legyen szó bármilyen üzleti megállapodásról vagy jogi dokumentumról, nálunk minden szükséges eszköz és funkció kéznél van a gyors és hatékony kezeléshez.
                        </Typography>
                    </Paper>
                </Box>
            </div>

            {/** Stepper */}
            <Box
                className='mx-auto'
                sx={{ maxWidth: 800 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                {step.label}
                            </StepLabel>

                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }} >

                                            {index === steps.length - 1 ? 'Kész' : 'Következő'}
                                        </Button>
                                        <Button
                                            variant='outlined'
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}>
                                            Vissza
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>Kész is van a szerződésed</Typography>
                        <Button variant='outlined' onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Újra
                        </Button>
                    </Paper>
                )}
            </Box>

            {/** Contracts in Horizontal scrolling */}
            <div className='m-4 p-3'>
                <TableContainer style={{ width: '100%', marginLeft: 0 }}>
                    <Table className={tableClasses.table} aria-label="simple table">
                        <TableBody key='{row.name}'>
                            <TableRow key='{row.name}'>
                                {contracts.map((contract) => (
                                    <TableCell align="center">
                                        <Card key={contract.id} className='custom-card shadow p-3 mb-5 bg-white rounded' sx={{ width: 300, height: 220 }}>
                                            <CardContent>
                                                <Typography className='mb-2' variant="h5" component="div">
                                                    {contract.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <b>Szükséges iratok:</b>
                                                    <br />
                                                    személyi, lakcímkártya
                                                </Typography>
                                            </CardContent>
                                            <CardActions className='custom-button-container'>
                                                <Button
                                                    onClick={e => handleClick(contract.id)}
                                                    endIcon={<KeyboardArrowRightIcon />}
                                                    className="mt-auto"
                                                    size="medium"
                                                    variant="contained"><b>Kezdés</b></Button>
                                            </CardActions>
                                        </Card>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
export default Home;