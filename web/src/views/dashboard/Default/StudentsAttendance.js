import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import MainCard from 'ui-component/cards/MainCard';
import PerIcon from 'assets/images/icons/perLight.svg';
import { useState, useEffect } from 'react';

const lightBlue = {
  50: '#274a8d', // Light blue shade
  100: '#223f79', // Original light blue shade
  200: '#64B5F6', // Original light blue shade
};
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: lightBlue[50], // Lightest shade of blue
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    backgroundColor: lightBlue[100], // Original light blue shade
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    backgroundColor: lightBlue[100], // Original light blue shade
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

const TotalOrderLineChartCard = ({ isLoading }) => {
  const theme = useTheme();
  const [attend, setAttend] = useState(null);

  useEffect(() => {
    const fetchProfessorsCount = async () => {
      try {
        const token = localStorage.getItem('TOKEN');

        const response = await fetch('http://localhost:3001/api1/v1/liste/absence-percentage', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAttend(data.absencePercentage);
        } else {
          console.error('Failed to fetch professors count');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfessorsCount();
  }, []); // Run once on component mount


  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: lightBlue[50], // Lightest shade of blue
                        mt: 1,
                        width: '80px',
                      }}
                    >
                      <img src={PerIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        color: "white", // Original light blue shade
                        fontSize: '2.125rem',
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {attend !== null ? attend : 'Loading...'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: "white" }}>Taux d&apos;absentéisme</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalOrderLineChartCard;
