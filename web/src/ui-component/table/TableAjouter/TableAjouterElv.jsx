/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Field from './fields/FieldElv';
import Button from '@mui/material/Button';
import { IconUserPlus } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const TableAjouterElv = ({ openAjouter, setOpenAjouter,addStudentToTable }) => {
    const theme = useTheme();

    const [formData, setFormData] = useState({});
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedIssueDe, setSelectedIssueDe] = useState('');
    const [selectedSemestre, setSelectedSemestre] = useState('');

    const handleClose = () => {
        setOpenAjouter(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api1/v1/students/createStudent', {
                ...formData,
                filieres: [selectedFiliere], // Convert selectedFiliere to an array
                issueDe: selectedIssueDe,
                semestre: selectedSemestre
            });
            console.log('Object created:', response.data);
            handleClose();
            addStudentToTable(response.data);
            // window.location.reload(); // Refresh the page after successful creation
        
        } catch (error) {
            console.error('Error creating object:' + error);
            alert('An error ' + error);
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFiliere(filiere);
    };

    const handleIssueDeSelect = (issueDe) => {
        setSelectedIssueDe(issueDe);
    };

    const handleSemestreSelect = (semestre) => {
        console.log('smstrhhhhhhh', selectedSemestre)

        setSelectedSemestre(semestre);
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
                Ajouter Un élève
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Les champs marqués un astérisque (*) sont obligatoires.
                </DialogContentText>
                <Field
                    handleInputChange={handleInputChange}
                    onFiliereSelect={handleFiliereSelect}
                    onIssueDeSelect={handleIssueDeSelect}
                    onSemestreSelect={handleSemestreSelect}
                    filiereSelected={selectedFiliere} // Pass selectedFiliere as prop
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

export default TableAjouterElv;
