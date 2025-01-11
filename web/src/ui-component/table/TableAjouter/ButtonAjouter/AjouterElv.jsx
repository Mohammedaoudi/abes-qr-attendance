/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

//**********************import react*************************//
import { useState } from 'react';

//**********************import mui*************************//
import { Button, Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus, IconFileTypeCsv } from '@tabler/icons-react'; // Assuming you have an icon for CSV file
import { useTheme } from '@mui/material/styles';

//**********************import project*************************//
import TableAjouterElv from '../TableAjouterElv';

const AjouterElv = ({addStudentToTable}) => {
  const theme = useTheme();
  const [openAjouter, setOpenAjouter] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleClickOpen = () => {
    setOpenAjouter(true);
  };


  return (
    <Box textAlign="center" marginTop="18px">
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
          >
            Ajouter un Elève
          </Button>
        </Grid>
    
      </Grid>
      <TableAjouterElv openAjouter={openAjouter} setOpenAjouter={setOpenAjouter} addStudentToTable={addStudentToTable}/>
      {showSuccessMessage && (
                <div className="alert alert-success text-center" role="alert" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Ajout réussie !
                </div>
            )}
    </Box>
  );
};

export default AjouterElv;
