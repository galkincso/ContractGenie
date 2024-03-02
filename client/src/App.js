import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContract from './pages/ListContract';
import UploadContract from './pages/UploadContract';



function App() {

  const [contracts, setContracts] = useState([]);
  /*
  useEffect(() => {
    axios
      .get('/findall')
      .then(response => {
        setContracts(response.data);
        console.log(response);
      })

  }, [])
  */

  return (
    <>
      <div className='header'>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h1">
            Contract Genie
          </Typography>
        </Box>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListContract />} />
          <Route path="/upload" element={<UploadContract />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

// {contracts.map((contract) => <p key={contract.id}>{contract.id}-{contract.name}</p>)}
