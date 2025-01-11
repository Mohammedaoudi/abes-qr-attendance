/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import Field from './Field';
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

const TableModElv = ({ params, openAjouter, setOpenAjouter }) => {
    const theme = useTheme();

    const [formData, setFormData] = useState({});
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedIssueDe, setSelectedIssueDe] = useState('');
    const [selectedSemestre, setSelectedSemestre] = useState('');

    const [studentData, setStudentData] = useState(null);
    //const [isModified, setIsModified] = useState(false);
    const initialFormData = useRef({}); // Store initial form data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('TOKEN');

                const response =  await axios.get(`http://localhost:3001/api1/v1/students/getStudent/${params.row.id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
                setStudentData(response.data.student);
                setFormData(response.data.student);
                initialFormData.current = formData; // Store initial form data
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData();
    }, [params]);

    const handleClose = () => {
        setOpenAjouter(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('TOKEN');

            const response = await axios.put(`http://localhost:3001/api1/v1/students/updateStudent/${params.row.id}`, {
                ...formData,
                filieres: selectedFiliere,
                issueDe: selectedIssueDe,
                semestre: selectedSemestre
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            console.log('Object updated:', response.data);
            window.location.reload(); // Refresh the page after successful deletion
            handleClose();
        } catch (error) {
            console.error('Error updating object:' + error);
            alert('An error ' + error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
       
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFiliere(filiere);
       
    };

    const handleIssueDeSelect = (issueDe) => {
        setSelectedIssueDe(issueDe);
       
    };
    const handleSemestreSelect = (semestre) => {
        setSelectedSemestre(semestre);
    };
    const isFormModified = () => {
        // Check if formData is modified
        const formDataModified = JSON.stringify(formData) !== JSON.stringify(initialFormData.current);
        console.log("formDataModified:", formDataModified);
    

        const checkFiliereNomFiliere = () => {
            if (initialFormData.current.filieres && initialFormData.current.filieres.nomFiliere) {
                // Filieres object is populated, proceed with your logic
                const filiereModified = selectedFiliere !== initialFormData.current.filieres.nomFiliere;
                console.log("filiereModified:", selectedFiliere);
                console.log("filiereModified:", filiereModified);
            } else {
                // Filieres object is not fully populated yet, wait and check again
                setTimeout(checkFiliereNomFiliere, 1000); // Check again after 1 second
            }
        };
        
        // Start the initial check
        const filiereModified =  checkFiliereNomFiliere();
        


    
        // Check if selectedIssueDe is modified
        const issueDeModified = selectedIssueDe !== initialFormData.current.issueDe;
        console.log("issueDeModified:", issueDeModified);
    
        // Return true if any of the fields are modified
        return formDataModified || filiereModified || issueDeModified;
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
                Modifier
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Les champs marqués un astérisque (*) sont obligatoires.
                </DialogContentText>
                <Field params={studentData} 
                handleInputChange={handleInputChange}
                 onFiliereSelect={handleFiliereSelect} 
                onIssueDeSelect={handleIssueDeSelect}                     
                onSemestreSelect={handleSemestreSelect}
                filiereSelected={selectedFiliere}/>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'grey' }} onClick={handleClose}>Annuler</Button>
                <Button type="submit" disabled={!isFormModified()} sx={{
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.dark,
                    color: 'white',
                    '&:hover': {
                        background: theme.palette.secondary.dark,
                        color: theme.palette.secondary.light
                    }
                }}>Modifier</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TableModElv;
