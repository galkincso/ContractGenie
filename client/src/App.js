import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios
    .get('/findall')
    .then(response => {
      setContracts(response.data);
      console.log(response);
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
        {contracts.map((contract)=><p key={contract.id}>{contract.id}-{contract.name}</p>
        )}
      </div>
    </>
  );
}

export default App;
