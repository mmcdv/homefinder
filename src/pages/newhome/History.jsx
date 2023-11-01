import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PropertyHistory = ({ selectedHouse }) => {

  return (
    <TableContainer sx={{ width: '100%', height: 300 }}  component={Paper}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow sx={{ textTransform: 'uppercase' }}>
            <TableCell align='left'>Date</TableCell>
            <TableCell align="center">Event</TableCell>
            <TableCell align="center">Source</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedHouse.property_history.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>{row.date}</TableCell>
              <TableCell align="center">{row.event_name ? row.event_name : '--'}</TableCell>
              <TableCell align="center">{row.source_name ? row.source_name : '--'}</TableCell>
              <TableCell align="right">${row.price ? row.price.toLocaleString() : ' --'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PropertyHistory;