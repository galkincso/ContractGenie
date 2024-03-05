import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContract from './pages/ListContract';
import UploadContract from './pages/UploadContract';
import Details from './pages/Details';


function App() {


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
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

// {contracts.map((contract) => <p key={contract.id}>{contract.id}-{contract.name}</p>)}
