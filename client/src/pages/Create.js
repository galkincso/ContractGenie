import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectContract from '../components/SelectContract';
import PersonalData from '../components/PersonalData';
import { Button } from '@mui/material';

const Create = () => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [flow, setFlow] = useState('SelectContract');

    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))

        setFlow('SelectContract');
    }, [])

    return (
        <>


            {flow === 'SelectContract' &&
                <SelectContract function={setFlow}/>
            }
            {flow === 'PersonalData' &&
                <PersonalData />
            }

        </>
    )

};
export default Create;