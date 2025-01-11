import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSemestre = ({ params, onSemestreSelect, filiereSelected }) => {
   
    const [selectedSemestre, setSelectedSemestre] = useState(params.semestre.nomSemestre);

    const [semestres, setSemestres] = useState([]);
    console.log(selectedSemestre)
    console.log('hhhfggg99999999ghhhh')
    useEffect(() => {
      const fetchSemestresForFiliere = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereSelected}`);
          const data = await response.json();
          const filiereSemestres = data.filiereInstance.semestres;
          console.log(filiereSemestres)
          console.log('hhhhhhh')
          setSemestres(filiereSemestres);
        } catch (error) {
          console.error('Error fetching semestres:', error);
        }
      };
  
      fetchSemestresForFiliere();
    }, [filiereSelected]);
  
    const handleSemestreChange = (event) => {
      const semestreId = event.target.value;
      setSelectedSemestre(semestreId);
      onSemestreSelect(semestreId);
    };
  
    return (
        <div style={{ width: '100%', maxWidth: 400 }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id={`select-label-${filiereSelected}`}>Semestres</InputLabel>
        <Select
          labelId={`select-label-${filiereSelected}`}
          id={`select-${filiereSelected}`}
          value={selectedSemestre}
          onChange={handleSemestreChange}
          input={<OutlinedInput id={`select-input-${filiereSelected}`} label="Semestres" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250,
              },
            },
          }}
        >
          {semestres.map((semestre) => (
            <MenuItem key={semestre._id} value={semestre._id}>
              {semestre.nomSemestre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
    );
  };
  
  export default SelectSemestre;
  