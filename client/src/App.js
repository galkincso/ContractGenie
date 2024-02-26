import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios
    .get('/api/contracts')
    .then(response => {
      setContracts(response.data._embedded.contracts);
      console.log(response.data._embedded.contracts);
    })

  }, [])

  return (
    <>
      <div>
        <p>
          Upload your contracts here.
        </p>
      </div>
      <div>
        <p>Contract patterns:</p>
        {contracts.map((contract)=><p key={contract.name}>{contract.name}</p>
        )}
      </div>
    </>
  );
}

export default App;
