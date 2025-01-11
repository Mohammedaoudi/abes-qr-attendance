import { useState } from 'react';
import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus} from '@tabler/icons-react'; // Assuming you have an icon for CSV file
import { useTheme } from '@mui/material/styles';
import TableAjouterProf from '../TableAjouterProf';

const AjouterProf = ({ addProfToTable }) => {
  const theme = useTheme();
  const [openAjouter, setOpenAjouter] = useState(false);

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
            Ajouter Enseignant
          </Button>
        </Grid>
  
      </Grid>
      <TableAjouterProf openAjouter={openAjouter} setOpenAjouter={setOpenAjouter} addProfToTable={addProfToTable} />
    </Box>
  );
};

export default AjouterProf;
