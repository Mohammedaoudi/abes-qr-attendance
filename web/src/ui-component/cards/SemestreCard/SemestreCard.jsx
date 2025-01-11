/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets





const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| Semestre Card||=========================== //

const SemestreCard = ({ isLoading, title, id }) => {

  let tableau = ["PFE 2ITE", "PFE ISIC", "PFE CCN", "PFE GEE", "PFE GC", "PFE GI"];



  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (

        <CardWrapper border={false} content={false}>

          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">

              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{title}</Typography>
                    <br />

                  </Grid>


                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>


                <ul style={{ listStyle: 'disc', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                  {!tableau.includes(title) ?
                    <>
                      <li style={{ minWidth: '200px', fontSize: "18px", }}><Link to={id} style={{ color: 'white' }}>Emploi du temps</Link></li>
                      <li style={{ minWidth: '200px', fontSize: "18px" }}><Link to={`elements/${id}`} style={{ color: 'white' }}>Structure Modulaire</Link></li>                     
                      <li style={{ minWidth: '200px', fontSize: "18px" }}><Link to={`absences/${id}`} style={{ color: 'white' }}>Listes des absences</Link></li>
                      <li style={{ minWidth: '200px', fontSize: "18px" }}><Link to='Listes-des-absences' style={{ color: 'white' }}>Evaluations</Link></li>
                    </> :
                    <>           
                      <li style={{ minWidth: '200px', fontSize: "18px" }}><Link to='Listes-des-absences' style={{ color: 'white' }}>Soutenances PFE</Link></li></>


                  }




                </ul>


              </Grid>
            </Grid>

          </Box>

        </CardWrapper>
      )}
    </>
  );
};

SemestreCard.propTypes = {
  isLoading: PropTypes.bool
};

export default SemestreCard;
