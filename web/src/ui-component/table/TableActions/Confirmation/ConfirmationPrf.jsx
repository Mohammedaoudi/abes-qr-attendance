/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const Confirmation = ({ open, setOpen, params, deleteProfFromTable }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const deplacerVersCorbeille = () => {
        const token = localStorage.getItem('TOKEN');

        axios.delete(`http://localhost:3001/api1/v1/professeurs/deleteOne/${params.row.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Item deleted:', response.data);
            setOpen(false);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                
            }, 2000); // Display success message for 7 seconds before reloading
        })
        .catch(error => {
            console.error('Error deleting item:', error);
            // Handle error here, such as displaying a message to the user
        });
        deleteProfFromTable(params.row.id);
        handleClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Supprimer définitivement cet élément"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir supprimer définitivement cet élément ? Cette action est irréversible et toutes les données associées seront perdues.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={deplacerVersCorbeille} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            {showSuccessMessage && (
                <div className="alert alert-success text-center" role="alert" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Suppression réussie !
                </div>
            )}
        </>
    );
}

export default Confirmation;
