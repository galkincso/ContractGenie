import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Box, Divider, IconButton, Stack, Typography, Card, CardContent, CardActions, CardActionArea } from '@mui/material';
import Paper from '@mui/material/Paper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios
            .get('/contracts')
            .then(response => setContracts(response.data))
    }, [contracts])

    return (
        <>
            <div className='center-text'>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 1200,
                            height: 200,
                        },
                        justifyContent: 'center',
                    }}>
                    <Paper
                        elevation={3}>
                        <Typography
                            className='paper-text'
                            variant="h5"
                            noWrap
                            sx={{
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}>
                            Itt a szerződéskötés olyan élmény, mint sehol máshol!
                        </Typography>
                        <Divider variant="middle" />
                        <Typography
                            className='paper-text'
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

            <div className='center-text'>
                <Stack direction="row" spacing={2}>
                    {contracts.map((contract)=>(
                        <Card variant="outlined" sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {contract.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                3 sablon
                            </Typography>
                            <Typography variant="body2">
                                Szükséges iratok:
                                <br />
                                személyi, lakcímkártya
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Kezdés</Button>
                        </CardActions>
                    </Card>
                    ))}
                </Stack>
            </div>

            <div className='center-text'>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 1200,
                            height: 400,
                        },
                        justifyContent: 'center',
                    }}>
                    <Paper elevation={3}>
                        <Typography
                            className='paper-text'
                            variant="h5"
                            noWrap
                            sx={{
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}>
                            Szabd személyre, amennyire csak lehet!
                        </Typography>

                        <Divider className='custom-divider' variant="middle" />

                        <Stack direction="row" spacing={2}>
                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <IconButton><UploadFileIcon fontSize='large' /></IconButton>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography className='paper-text' variant="h5" component="div">
                                            Töltsd fel kedvenc sablonod!
                                        </Typography>
                                        <Typography variant="body2">
                                            Van egy jól bevált szerződés sablonod?
                                            <br />
                                            Töltsd fel és segíts másoknak is vele!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <IconButton><BorderColorIcon fontSize='large' /></IconButton>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography className='paper-text' variant="h5" component="div">
                                            Szabd személyre szerződésed!
                                        </Typography>
                                        <Typography variant="body2">
                                            Hiányzik még 1 mondtad a sablonból?
                                            <br />
                                            Semmi gond.
                                            <br />
                                            A sablon kiválasztása után lehetőséged van szerkeszteni a tartalmát!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Stack>
                    </Paper>
                </Box>
            </div>


            {/*
            <div className='options'>
                <Button onClick={handleClickList} variant="contained" size='large'>Szerződések listázása</Button>
                <Button onClick={handleClickUpload} variant="contained" size='large'>Szerződés feltöltése</Button>
            </div>
            */}
        </>
    )

};
export default Home;
