/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
let elementsF;
const SelectElements = ({params, onElementSelect, filiereSelected }) => {
  const [selectedElements, setSelectedElements] = useState();

  useEffect(() => {
    onElementSelect(elementsF);
  }, [selectedElements, onElementSelect]);

  return (
    <div>
      {filiereSelected.map((filiere) => (
        <div className="mt-1" key={filiere}>
          <SelectElement params={params} filiereId={filiere} selectedElements={selectedElements} setSelectedElements={setSelectedElements} />
        </div>
      ))}
    </div>
  );
};

const SelectElement = ({ filiereId, setSelectedElements }) => {
  //const elemArry = params.elements.map(ele => ele.libelleElement); // Extracting nomFiliere from each filiere object

  const [libelle, setLibelle] = useState([]);
  const [elements, setElements] = useState([]);
  const [filNom, setFilNom] = useState([]);
  


  
  useEffect(() => {
    const fetchElementsForFiliere = async () => {
      try {
        const token = localStorage.getItem('TOKEN');

        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filieresArry}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setFilNom(data.filiereInstance.nomFiliere);
      } catch (error) {
        console.error('Error fetching elements:', error);
      }
    };

    fetchElementsForFiliere();
  }, []);

  useEffect(() => {
    const fetchElementsForFiliere = async () => {
      try {
        const token = localStorage.getItem('TOKEN');

        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      
        const data = await response.json();
        const filiereElements = data.filiereInstance.elements;
        setFilNom(data.filiereInstance.nomFiliere);
        setElements(filiereElements);
      } catch (error) {
        console.error('Error fetching elements:', error);
      }
    };

    fetchElementsForFiliere();
  }, [filiereId]);

  const handleChange = (event) => {
    const selectedElements = event.target.value;
    setLibelle(selectedElements);
    console.log(selectedElements);
    console.log("iiiiiiiiiiooooooiiiiiiiii");
    // Extract IDs of selected elements
    const selectedElementIds = selectedElements.map((element) => element._id);

    
    // Update selected elements for the current filière immutably
    setSelectedElements((prevSelectedElements) => {
      // Clone the previous selected elements for the current filière
      const updatedSelectedElements = { ...prevSelectedElements };

      // Update the selected element IDs for the current filière
      updatedSelectedElements[filiereId] = selectedElementIds;
      elementsF = Object.values(updatedSelectedElements).flatMap((ids) => ids);
      setSelectedElements( Object.values(updatedSelectedElements).flatMap((ids) => ids));
      

      // Set selectedElementIds to newSelectedElementIds
      //setSelectedElements(newSelectedElementIds);
      console.log(libelle)
      console.log("kdyrrhhhhh")
    
      return updatedSelectedElements;
    });
    console.log(elementsF);
    console.log("mmmmmmmmmmmmmm");
};


  
  
  
  

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel id={`select-label-${filiereId}`}>Eléments de modules de {filNom}</InputLabel>
      <Select
        labelId={`select-label-${filiereId}`}
        id={`select-${filiereId}`}
        multiple
        value={libelle}
        onChange={handleChange}
        input={<OutlinedInput id={`select-input-${filiereId}`} label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value._id} label={value.libelleElement} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {elements.map((element) => (
          <MenuItem key={element._id} value={element}>
            {element.libelleElement}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectElements;
