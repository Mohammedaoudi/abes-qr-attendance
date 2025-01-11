import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import DataSeances from '../Data/DataSeances';

const Row = ({ rows }) => {
  return (
    <Paper>
      <Table aria-label="collapsible table">
        <TableHead>
          <DataSeances />
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <DataSeances key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Row;
