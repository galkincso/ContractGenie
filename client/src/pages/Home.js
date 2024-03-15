import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    function handleClickList (event) {
        navigate("/list");
    }
    function handleClickUpload (event) {
        navigate("/upload");
    }

    return (
        <>
            <div className='options'>
                <Button onClick={handleClickList} variant="contained" size='large'>Szerződések listázása</Button>
                <Button onClick={handleClickUpload} variant="contained" size='large'>Szerződés feltöltése</Button>
            </div>
        </>
    )

};
export default Home;