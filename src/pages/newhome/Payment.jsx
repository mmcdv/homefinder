import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Payment = ({ selectedHouse }) => {
  const propertyTaxRate = (selectedHouse.mortgage.property_tax_rate * selectedHouse.list_price).toLocaleString();

  return (
    <>
      <Typography variant='subtitle2' color='text.secondary' mb={2}>
        * Values are estimated & for educational purposes only.
      </Typography>
      <Grid container direction='row' justifyContent='space-between' gap={2} >
        <Typography variant='body1'>
          Monthly Payment: 
        </Typography>
        <Typography variant='body1'>
          ${selectedHouse.mortgage.estimate.monthly_payment.toLocaleString()}
        </Typography>
      </Grid>   
      <Grid container direction='row' justifyContent='space-between' gap={2} >
        <Typography variant='body1'>
          Down Payment: 
        </Typography>
        <Typography variant='body1'>
          ${selectedHouse.mortgage.estimate.down_payment ? selectedHouse.mortgage.estimate.down_payment.toLocaleString() : 'Not available'}
        </Typography>
      </Grid> 
      <Grid container direction='row' justifyContent='space-between' gap={2} >
        <Typography variant='body1'>
          Loan Amount: 
        </Typography>
        <Typography variant='body1'>
          ${selectedHouse.mortgage.estimate.loan_amount ? selectedHouse.mortgage.estimate.loan_amount.toLocaleString() : 'Not available'}
        </Typography>
      </Grid> 
      <Grid container direction='row' justifyContent='space-between' gap={2} >
        <Typography variant='body1'>
          Property Tax: 
        </Typography>
        <Typography variant='body1'>
          ${propertyTaxRate} / year
        </Typography>
      </Grid>     
      <Grid container mt={2}>
        <Typography variant='h6'>
          Payment Breakdown
        </Typography>
          {selectedHouse.mortgage.estimate.monthly_payment_details ? (
            selectedHouse.mortgage.estimate.monthly_payment_details.map((option, i) => (
              <Grid container key={i}>
                <Grid container direction='row' justifyContent='space-between'>
                  <Typography variant='body1'>
                    {option.display_name}:
                  </Typography>
                  <Typography variant='body1'>
                    ${option.amount.toLocaleString()}
                  </Typography>                
                </Grid>
                <Divider sx={{ backgroundColor: '#000', my: 1 }} />
              </Grid>
            ))
          ) : 'Not Available'}
      </Grid>
    </>

  )
}

export default Payment