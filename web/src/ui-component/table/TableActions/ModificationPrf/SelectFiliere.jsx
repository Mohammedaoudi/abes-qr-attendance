/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../hooks/useFetch';

export default function SelectFiliere({ params, onFiliereSelect }) {
    const filieresArry = params.filieres.map(filiere => filiere.nomFiliere); // Extracting nomFiliere from each filiere object
    const [filieres, setFilieres] = useState(filieresArry); // Setting the initial state with filieresArry
    const [dataFiliere, setDataFiliere] = useState([]);

    const handleChange = (event) => {
        const selectedFiliereNames = event.target.value; // Changed from selectedFiliereName to selectedFiliereNames
        setFilieres(selectedFiliereNames); // Changed from setFiliere to setFilieres
        // Find the selected filiere objects
        const selectedFiliereIds = dataFiliere
            .filter(item => selectedFiliereNames.includes(item.nomFiliere))
            .map(item => item._id);
        // Pass the _ids of the selected filieres to the parent component
        onFiliereSelect(selectedFiliereIds);
    };

    const { data } = useFetch("filieres/getAll");

    useEffect(() => {
        if (data) setDataFiliere(data.filiereList);
    }, [data]);

    return (
        <div style={{ width: '100%' }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Filieres</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={filieres}
                    onChange={handleChange}
                    label="Filieres"
                    multiple // Enable multiple selection
                    name="walid"
                   
                >
                    {dataFiliere.map((filiere) => (
                        <MenuItem value={filiere.nomFiliere} key={filiere._id} sx={{ backgroundColor: filieres.includes(filiere.nomFiliere) ? '#003366' : 'inherit', color: filieres.includes(filiere.nomFiliere) ? '#6EC6FF' : 'inherit' }}>{filiere.nomFiliere}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
