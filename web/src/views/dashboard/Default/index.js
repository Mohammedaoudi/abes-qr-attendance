/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalProfesseurs from './TotalProfesseurs';
//import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalStudents';
//import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './StudentsAttendance';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalProfesseurs isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
         
<Grid item lg={4} md={6} sm={6} xs={12}>
            
              
              
                <TotalIncomeLightCard isLoading={isLoading} />
              
            
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
          <Grid item xs={12} md={12}>
            <TotalGrowthBarChart isLoading={isLoading} />
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
