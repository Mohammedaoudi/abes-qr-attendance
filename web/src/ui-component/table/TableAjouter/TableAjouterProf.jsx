/* eslint-disable prettier/prettier */
// TableAjouterProf.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IconUserPlus } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Field from './fields/FieldProf';

const TableAjouterProf = ({ openAjouter, setOpenAjouter,addProfToTable  }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [selectedFilieres, setSelectedFilieres] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);

    const handleClose = () => {
        setOpenAjouter(false);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(selectedFilieres);
            console.log(selectedElements);
            console.log("hnaaaaaaa");

            const response = await axios.post('http://localhost:3001/api1/v1/professeurs/create', {
                ...formData,
                filieres: selectedFilieres,
                elements: selectedElements
            });
            addProfToTable(response.data);
            console.log('Object created:', response.data);
            // window.location.reload(); // Refresh the page after successful deletion

            handleClose();
        } catch (error) {
            console.error('Error creating object:', error);
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFilieres(filiere);
        setFormData({ ...formData, filieres: filiere }); 
    };

    const handleElementSelect = (element) => {
        setSelectedElements(element);
        setFormData({ ...formData, elements: element }); 
    };

    return (
        <Dialog
            open={openAjouter}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
        >
            <DialogTitle sx={{ fontSize: '16px', color: 'black' }}>
                <IconButton edge="start" sx={{ mr: 1 }}>
                    <IconUserPlus />
                </IconButton>
                Ajouter Un Enseignant
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Les champs marqués un astérisque (*) sont obligatoires.
                </DialogContentText>
                <Field 
                    handleInputChange={handleInputChange} 
                    onFiliereSelect={handleFiliereSelect} 
                    onElementSelect={handleElementSelect} 
                    filiereSelected={selectedFilieres}
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'grey' }} onClick={handleClose}>Annuler</Button>
                <Button type="submit" sx={{
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.dark,
                    color: 'white',
                    '&:hover': {
                        background: theme.palette.secondary.dark,
                        color: theme.palette.secondary.light
                    }
                }}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TableAjouterProf;
