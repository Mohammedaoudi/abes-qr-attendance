import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../../hooks/useFetch';

export default function SelectFiliere({ onFiliereSelect }) {
    const [filiere, setFiliere] = useState('');
    const [dataFiliere, setDataFiliere] = useState([]);

    const handleChange = (event) => {
        const selectedFiliereName = event.target.value;
        setFiliere(selectedFiliereName);
        // Find the selected filiere object
        const selectedFiliere = dataFiliere.find(item => item.nomFiliere === selectedFiliereName);
        // Pass only the _id of the selected filiere to the parent component
        if (selectedFiliere) {
            onFiliereSelect(selectedFiliere._id);
        }
    };

    const { data} = useFetch("filieres/getAll");

    useEffect(() => {
        if (data) setDataFiliere(data.filiereList);
    }, [data]);

    return (
        <div style={{ width: '100%', maxWidth: 400 }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Filiere</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={filiere}
                    onChange={handleChange}
                    label="Filiere"
                    name="walid"
                >
                  
                    {dataFiliere.map((filiere) => (
                        <MenuItem value={filiere.nomFiliere} key={filiere._id}>{filiere.nomFiliere}</MenuItem>
                    ))}
                </Select>
            </FormControl>
          
        </div>
    );
}
