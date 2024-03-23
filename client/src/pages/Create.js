import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectContract from '../components/SelectContract';
import PersonalData from '../components/PersonalData';
import { Button } from '@mui/material';
import ContentModifier from '../components/ContentModifier';

const Create = () => {

    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [flow, setFlow] = useState('SelectContract');
    const [selectedContract, setSelectedContract] = useState('');

    useEffect(() => {
        axios
            .get('/contract/getall')
            .then(response => setContracts(response.data))

        setFlow('SelectContract');
    }, [])

    return (
        <>


            {flow === 'SelectContract' &&
                <SelectContract setFlow={setFlow} setContract={setSelectedContract}/>
            }
            {flow === 'PersonalData' &&
                <PersonalData setFlow={setFlow} contract={selectedContract} />
            }
            {flow === 'ContentModifier' &&
                <ContentModifier setFlow={setFlow} contract={selectedContract} />
            }

        </>
    )

};
export default Create;