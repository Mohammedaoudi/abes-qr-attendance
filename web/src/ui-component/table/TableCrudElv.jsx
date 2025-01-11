/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

//**********************import react*************************//
import { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus, IconFileTypeCsv } from '@tabler/icons-react';


//**********************import material ui*************************//
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


//**********************import project*************************//
import noFile from '../../assets/images/icons/noFile.png'
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader'
import { columns } from './Data/columns';

import Ajouter from '../../ui-component/table/TableAjouter/ButtonAjouter/AjouterElv';

import axios from 'axios';



const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3001/api1/v1/students/import', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Handle success response
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        refetch();
      }, 2000); // Display success message for 2 seconds before reloading

      console.log('File imported successfully');
    } else {
      // Handle error response
      console.error('Failed to import file:', response.statusText);
    }
  } catch (error) {
    console.error('Error importing file:', error);
  }
};


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <Grid item xs={12} sm={1}>
          <label htmlFor="file-input">
            <Button
              fullWidth
              component="span"
              variant="contained"
              color="primary"
              endIcon={<IconFileTypeCsv />} // Assuming you have an icon for CSV file
           
            >
              Import
            </Button>
          </label>
          <input
            id="file-input"
            type="file"
            accept=".csv" // Specify the file types allowed for import
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Grid>
    </GridToolbarContainer>
  );
}

const CustomNoRowsOverlay = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };
  const imgStyle = {
    width: '50px',
    height: '50px',
  };

  return <div style={containerStyle}>
    <img src={noFile} alt="Vide" style={imgStyle} />
    <div>Vide</div>
  </div>;
};






const TableCrudElv = () => {
//********************fetch data***************
  const [dataProfs, setDataProfs] = useState([])
  // const { data, loading, error, refetch } = useFetch("students/getStudents");
  // useEffect(() => {
  //   data && setDataProfs(data)
  // }, [data])
  // const rows = [];
  // dataProfs.map((elv) => {
  //   const tmp = { id: elv._id, col1: elv.cne, col2: elv.nom, col3: elv.prenom };
  //   rows.push(tmp);
  // });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api1/v1/students/getStudents');
          setDataProfs(response.data);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
  };

  const addStudentToTable = (newStudent) => {
      setDataProfs(prevData => [...prevData, newStudent]);
      fetchData();
  };

  const rows = dataProfs.map((elv, index) => ({
      id: elv._id || index, 
      col1: elv.cne,
      col2: elv.nom,
      col3: elv.prenom,
  }));
  console.log(rows)


  

  return (
    <> {loading ? <Loader /> : 
    <>
    <DataGrid
      sx={{
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        backgroundColor: 'white'
      }}
      rows={rows}
      columns={columns}
      checkboxSelection={true}
      density="comfortable"
      slotProps={{ pagination: { labelRowsPerPage: 'Lignes par page' } }}
      slots={{
        toolbar: CustomToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
      }}


    />
          <Ajouter addStudentToTable={addStudentToTable} />

    </>}
    </>

  )
}

export default TableCrudElv
