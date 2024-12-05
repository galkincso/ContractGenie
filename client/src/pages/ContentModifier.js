import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import VerifiedIcon from '@mui/icons-material/Verified';
import TextareaAutosize from 'react-textarea-autosize';
import PDFfile from '../components/PDFfile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SignatureCanvas from 'react-signature-canvas'

const ContentModifier = () => {
    const [content, setContent] = useState('');
    const [contract, setContract] = useState('');
    const [personalData, setPersonalData] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [digitalSign, setDigitalSign] = useState(false);
    const [signatures, setSignatures] = useState([])
    const sigPad_0 = useRef(null);
    const sigPad_1 = useRef(null);
    const [signatureButtons, setSignatureButtons] = useState(true);

    useEffect(() => {
        axios
            .get('/contract/get/' + { id }.id)
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

    function handleAVDH() {
        window.open("https://magyarorszag.hu/szuf_avdh_feltoltes", "_blank")
    }

    function handleDigitalSign() {
        if (digitalSign) setDigitalSign(false);
        else setDigitalSign(true);
    }

    function handleDigitalSignData() {
        // aláírások mentése
        setSignatures([sigPad_0.current.getTrimmedCanvas().toDataURL('image_0/png'), sigPad_1.current.getTrimmedCanvas().toDataURL('image_1/png')]);

        // gombok kikapcsolás
        setSignatureButtons(false);

        // aláítás padok kikapcsolása
        sigPad_0.current.off();
        sigPad_1.current.off();
    }

    function handleDownloadDigital() {
        //handleClose();
    }

    function handleClear(ref) {
        ref.clear();
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setSignatureButtons(true);
        setDigitalSign(false);
    }
    const handleClose = () => setOpen(false);

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

                <Button
                    onClick={handleOpen}
                    variant="contained" size='large'
                    startIcon={<VerifiedIcon />}>Hitelesítés</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Hitelesítsd a szerződésed
                        </Typography>

                        <div className='modal-verification'>
                            <PDFDownloadLink document={<PDFfile name={contract.name} content={content} subjectNames={contract.namingConvention} data={personalData} type={"avdh"} />} fileName='szerződés'>
                                <Button
                                    onClick={handleAVDH}
                                    variant="contained" size='large'
                                    startIcon={<TaskAltIcon />}>AVDH</Button>
                            </PDFDownloadLink>
                            <Typography variant="button" gutterBottom>
                                (Ügyfélkapus hitelesítés)
                            </Typography>
                        </div>

                        <div className='modal-verification'>
                            <Button
                                onClick={handleDigitalSign}
                                variant="contained" size='large'
                                startIcon={<TaskAltIcon />}>Digitális aláírás</Button>
                        </div>

                        {digitalSign &&
                            <div>
                                <div className='modal-verification'>
                                    <div className='digitalSign'>
                                        <Typography variant="button" gutterBottom>
                                            {contract.namingConvention[0]}
                                        </Typography>
                                        <div className='sigContainer'>
                                            <SignatureCanvas penColor='black' canvasProps={{ className: 'sigCanvas' }} ref={sigPad_0} />
                                        </div>
                                        <div className='clearButtons'>
                                            <Button
                                                disabled={!signatureButtons}
                                                variant='contained'
                                                onClick={() => handleClear(sigPad_0.current)}>Újra</Button>
                                        </div>

                                    </div>
                                    <div className='digitalSign'>
                                        <Typography variant="button" gutterBottom>
                                            {contract.namingConvention[1]}
                                        </Typography>
                                        <div className='sigContainer'>
                                            <SignatureCanvas penColor='black' canvasProps={{ className: 'sigCanvas' }} ref={sigPad_1} />
                                        </div>
                                        <div className='clearButtons'>
                                            <Button
                                                disabled={!signatureButtons}
                                                variant='contained'
                                                onClick={() => handleClear(sigPad_1.current)}>Újra</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className='digitalSignButtons'>
                                    <Button
                                        onClick={handleDigitalSign}
                                        variant="contained" size='large'>Mégsem</Button>

                                    <Button
                                        onClick={handleDigitalSignData}
                                        variant="contained" size='large'>Kész</Button>
                                    {signatureButtons === false &&
                                        <PDFDownloadLink document={<PDFfile name={contract.name} content={content} subjectNames={contract.namingConvention} data={personalData} type={"digital"} signatures={signatures} />} fileName='szerződés'>
                                            <Button
                                                onClick={handleDownloadDigital}
                                                variant="contained" size='large'>Letöltés</Button>
                                        </PDFDownloadLink>
                                    }

                                </div>
                            </div>
                        }

                    </Box>
                </Modal>

                <PDFDownloadLink document={<PDFfile name={contract.name} content={content} subjectNames={contract.namingConvention} data={personalData} type={"pdf"} />} fileName='szerződés'>
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