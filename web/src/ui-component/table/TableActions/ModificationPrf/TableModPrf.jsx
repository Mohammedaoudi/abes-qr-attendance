/* eslint-disable prettier/prettier */
// TableAjouterProf.js
import React, { useState, useEffect } from 'react';
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
import Field from './Field';

const TableModPrf = ({ params, openAjouter, setOpenAjouter }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [selectedFilieres, setSelectedFilieres] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);
    const [profData, setProfData] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('TOKEN');

                const response = await axios.get(`http://localhost:3001/api1/v1/professeurs/getOne/${params.row.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('professeur data:', response.data);

                setProfData(response.data.professeurInstance);
                const filieresArry = profData.filieres.map(filiere => filiere._id); // Extracting nomFiliere from each filiere object
                setSelectedFilieres(filieresArry)
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


            const response = await axios.put(`http://localhost:3001/api1/v1/professeurs/update/${params.row.id}`, {
                ...formData,
                filieres: selectedFilieres,
                issueDe: selectedElements
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Object updated:', response.data);

            handleClose();
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload();
            }, 2000); // Display success message for 7 seconds before reloading // Refresh the page after successful deletion


        } catch (error) {
            console.error('Error updating object:' + error);
            // Handle error here, such as displaying a message to the user
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
        setSelectedFilieres(filiere);
        setFormData({ ...formData, filieres: filiere });
    };

    const handleElementSelect = (element) => {
        setSelectedElements(element);
        setFormData({ ...formData, elements: element });
    };

    return (
        <>
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
                    params={profData}
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
                }}>modifier</Button>
            </DialogActions>
        </Dialog>
        {showSuccessMessage && (
               <div className="alert alert-success text-center" role="alert" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', fontSize: '18px' }}>
               Modification réussie !
           </div>
           
            )}
        </>
    );
};

export default TableModPrf;
