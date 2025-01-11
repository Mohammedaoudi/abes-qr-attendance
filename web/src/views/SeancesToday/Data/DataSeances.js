/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Link from '@mui/material/Link';
import { IconQrcode } from '@tabler/icons-react';

const DataSeances = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" style={{ color: row.state === 'close' ? 'red' : 'green' }}>{row.state}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Salle</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Heure</TableCell>
                    {row.state === 'open' && <TableCell>LanceQR</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.infos.map((infoRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{infoRow.salle}</TableCell>
                      <TableCell>{infoRow.section}</TableCell>
                      <TableCell>{infoRow.heure}</TableCell>
                      {row.state === 'open' && <TableCell><Link href="/scan"><IconQrcode /></Link></TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DataSeances;
