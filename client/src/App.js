import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContract from './pages/ListContract';
import UploadContract from './pages/UploadContract';
import Details from './pages/Details';
import Create from './pages/Create';
import Navigation from './components/Navigation';

function App() {

  return (
    <>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListContract />} />
          <Route path="/upload" element={<UploadContract />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

// {contracts.map((contract) => <p key={contract.id}>{contract.id}-{contract.name}</p>)}

/*
<div className='header'>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h1">
            Contract Genie
          </Typography>
        </Box>
      </div>
*/