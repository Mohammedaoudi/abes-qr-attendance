/* eslint-disable prettier/prettier */


//**********************import material ui*************************//


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


//**********************import project*************************//
import MainCard from '../../ui-component/cards/MainCard';
import Row from '../../ui-component/Rows/Row';
import { rows } from './Data/DataContact';




// ==============================|| ContactPage ||============================== //

const ContactPage = () => (
  <MainCard title="Contact">
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nom de professeur</TableCell>
            <TableCell align="right">Rôle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </MainCard>
);

export default ContactPage;

