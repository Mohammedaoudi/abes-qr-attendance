/* eslint-disable prettier/prettier */
import TableActions from '../TableActions/TableActions';


export const columns = [
  { field: 'col1', headerName: 'Matricule', width: 100, flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'col2', headerName: 'Nom', width: 100, flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'col3', headerName: 'Prénom', width: 100, flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'col4', headerName: 'Actions', type: 'actions', width: 130, headerAlign: 'center', align: 'center', renderCell: (params) => <TableActions {...{ params }} /> }
];