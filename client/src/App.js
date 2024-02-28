import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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
      
      <div className='options'>
        <Button variant="contained" size='large'>Szerződések listázása</Button>
        <Button variant="contained" size='large'>Szerződés feltöltése</Button>
      </div>
    </>
  );
}

export default App;

// {contracts.map((contract) => <p key={contract.id}>{contract.id}-{contract.name}</p>)}
