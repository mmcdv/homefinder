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


const Taxinfo = ({ selectedHouse }) => {

  return (
    // <div> 
    //   <Grid container>
    //     {selectedHouse.tax_history.map((option, i) => (
    //       <Grid container key={i}>
    //         <Typography variant='body1'>

    //         </Typography>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </div>
    <TableContainer sx={{ width: '100%', height: 300 }}  component={Paper}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow sx={{ textTransform: 'uppercase' }}>
            <TableCell align='left'>Year</TableCell>
            <TableCell align="center">Tax</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedHouse.tax_history.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                {row.year}
              </TableCell>
              <TableCell align="center">${row.tax ? row.tax.toLocaleString() : '--'}</TableCell>
              <TableCell align="right">${row.assessment.total ? row.assessment.total.toLocaleString() : '--'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Taxinfo;