/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { EditRounded } from '@mui/icons-material';
import Confirmation from '../Confirmation/Confirmation'; // Import the Confirmation dialog
import TableModElv from '../ModificationElv/TableModElv';
import { Link } from 'react-router-dom'; // Import Link

const Action = ({ Action, params }) => {
    const [open, setOpen] = useState(false); // State for confirmation dialog
    const [openAjouter, setOpenAjouter] = useState(false);
    const handleClickOpen = () => {
      setOpenAjouter(true);
    };
    // Function to toggle showing/hiding profile
    
    

    return (
        <div>
            {(() => {
                switch (Action) {
                    case "plus d'informations":
                        return (
                            <>
                                <Tooltip title={Action}>
                                    <IconButton>
                                        {/* Link to the ProfilEleve component */}
                                        <Link to={`/admin/Elèves/${params.row.id}`}>
                                            <IconInfoCircle />
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                                {/* Show ProfilProf component if showProfile is true */}
                            </>
                        );
                    
                    case "Modifier les informations":
                        return (
                            <Tooltip title={Action}>
                                <IconButton onClick={handleClickOpen}>
                                    <EditRounded />
                                </IconButton>
                                {/* Show TableModElv component if showTable is true */}
                                <TableModElv params={params} openAjouter={openAjouter} setOpenAjouter={setOpenAjouter} />
                            </Tooltip>
                        );
                    case "Supprimer":
                        return (
                            <Tooltip title={Action}>
                                <IconButton onClick={() => setOpen(true)} sx={{
                                    '&:hover': {
                                        background: 'red',
                                        color: 'white'
                                    }
                                }}>
                                    <IconTrash />
                                </IconButton>
                            </Tooltip>
                        );
                    default:
                        return <h6>Erreur: action non reconnue!</h6>;
                }
            })()}
            {/* Confirmation dialog for deleting item */}
            <Confirmation open={open} setOpen={setOpen} params={params} />
        </div>
    );
}

export default Action;
