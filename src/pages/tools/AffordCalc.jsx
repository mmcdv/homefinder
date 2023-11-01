import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Loader from '../../components/Loader';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { BiSearchAlt2, BiErrorCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';


export const CustomInputLabel = ({children, id}) => {
  return(
    <InputLabel id={id} sx={{
      backgroundColor: '#f9f9f9',
      paddingRight: '2px'

    }} >
      {children}
    </InputLabel>
  )  
}

const AffordCalc = () => {

  const [inputs, setInputs] = useState({
    annual_income: '',
    debt_to_income_ratio: '',
    down_payment: '',
    homeowner_insurance_rate: '',
    interest_rate: '',
    loan_term: '',
    monthly_debt: '',
    tax_rate: '',
    hoa_fees: '',
    is_pmi_included: ''
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAfford = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <Grid container item direction='row' gap={4} lg={12}>
        <Grid 
          container 
          item 
          direction='column' 
          lg='auto'           
          p={3} 
          sx={{ borderRight: '2px solid #93978828', height: '100vh'  }}
        >
          <Typography variant='h5'>Affordability Estimator</Typography>
          <form onSubmit={handleAfford}>
            <Grid container gap={2} direction='column'>  
              <Grid item mt={4}>
                <TextField
                  id="annual_income"
                  label="Annual Income"
                  type="text"                              
                  size="small"         
                  name='annual_income'
                  sx={{ width: '100%' }}
                  value={inputs.annual_income}                    
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>  
              <Divider sx={{ my: 1 }}/>
              <Grid container item direction='row' gap={1} alignItems='center'>
                <BsInfoCircle />
                <Typography variant='body2'>(Monthly Debt ÷ Monthly Income) x 100</Typography>
              </Grid>
              <Grid item >
                <TextField
                  id="debt_to_income_ratio"
                  label="Debt to Income Ratio"
                  type="number"                  
                  size="small"         
                  name='debt_to_income_ratio'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>   
              <Divider sx={{ my: 1 }}/>
              <Grid item >
                <TextField
                  id="down_payment"
                  label="Down Payment"
                  type="number"                  
                  size="small"         
                  name='down_payment'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>              
              <Divider sx={{ my: 1 }}/>
              <Grid item >
                <TextField
                  id="homeowner_insurance_rate"
                  label="Home Insurance Rate"
                  type="number"                  
                  size="small"         
                  name='homeowner_insurance_rate'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"                  
                />
              </Grid> 
              <Divider sx={{ my: 1 }}/>
              <Grid item >
                <TextField
                  id="interest_rate"
                  label="Interest Rate"
                  type="number"                  
                  size="small"         
                  name='interest_rate'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"                  
                />
              </Grid> 
              <Divider sx={{ my: 1 }}/>
              <Grid item >
                <TextField
                  id="loan_term"
                  label="Loan Term"
                  type="number"                  
                  size="small"         
                  name='loan_term'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"                  
                />
              </Grid>    
              <Divider sx={{ my: 1 }}/>
              <Grid item >
                <TextField
                  id="loan_term"
                  label="Loan Term"
                  type="number"                  
                  size="small"         
                  name='loan_term'
                  sx={{ width: '100%' }}
                  onChange={handleInputChange}
                  variant="outlined"                  
                />
              </Grid> 
              <Grid item>
                <Button type='submit' size='medium' variant='contained' startIcon={<BiSearchAlt2 />}>
                  Search
                </Button>
              </Grid>                                      
            </Grid>
          </form>
        </Grid>
      </Grid>          
    </>
  )
}

export default AffordCalc