/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

//**********************import react*************************//
import { useEffect, useState } from 'react';


//**********************import material ui*************************//
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


//**********************import project*************************//
import noFile from '../../assets/images/icons/noFile.png'
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader'
import { columns } from './Data/columnsPrf';
import AjouterProf from '../../ui-component/table/TableAjouter/ButtonAjouter/AjouterProf';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus, IconFileTypeCsv } from '@tabler/icons-react';

import axios from 'axios';



const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3001/api1/v1/professeurs/import', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Handle success response
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






const TableCrudProf = () => {
  //********************fetch data***************
  const [dataProfs, setDataProfs] = useState([])
  // const { data, loading, error } = useFetch("professeurs/getAll");
  // useEffect(() => {
  //   data && setDataProfs(data)
  // }, [data])
  // const rows = [];
  // dataProfs.map((prof) => {
  //   const tmp = { id: prof._id, col1: prof.cin, col2: prof.nom, col3: prof.prenom };
  //   rows.push(tmp);
  // });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api1/v1/professeurs/getAll');
      setDataProfs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addProfToTable = (newProf) => {
    setDataProfs((prevData) => [...prevData, newProf]);
    fetchData();
  };

  const deleteProfFromTable = (id) => {
    console.log('Deleting professor from table with ID:', id);
    setDataProfs((prevData) => prevData.filter((prof) => prof._id !== id));
  };

  const rows = dataProfs.map((prof, index) => ({
    id: prof._id || index,
    col1: prof.cin,
    col2: prof.nom,
    col3: prof.prenom,
  }));




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
          // columns={columns}
          columns={columns(deleteProfFromTable)}
          checkboxSelection={true}
          density="comfortable"
          slotProps={{ pagination: { labelRowsPerPage: 'Lignes par page' } }}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}


        />
        <AjouterProf addProfToTable={addProfToTable} />
      </>}
    </>

  )
}

export default TableCrudProf

