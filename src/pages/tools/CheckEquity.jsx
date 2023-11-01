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
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { BiSearchAlt2, BiErrorCircle } from 'react-icons/bi';
import { Alert } from '@mui/material';
import { isMobile } from '../../utils';
import { stateOption } from '../../content';

const creditOptions = [
  {value: 'excellent', label: 'Excellent (750+)'},
  {value: 'good', label: 'Good (700 - 749)'},
  {value: 'fair', label: 'Fair (650 - 699)'},
  {value: 'poor', label: 'Poor (Below 650)'}
];

const loanOptions = [
  {value: 'HELOC', label: 'Home Equity Line of Credit'},
  {value: 'HELOAN_FIXED_5YEARS', label: 'Home Equity Loan - Fixed Rate (5 Years)'},
  {value: 'HELOAN_FIXED_10YEARS', label: 'Home Equity Loan - Fixed Rate (10 Years)'},
  {value: 'HELOAN_FIXED_15YEARS', label: 'Home Equity Loan - Fixed Rate (15 Years)'},
  {value: 'HELOAN_FIXED_20YEARS', label: 'Home Equity Loan - Fixed Rate (20 Years)'},
  {value: 'HELOAN_FIXED_30YEARS', label: 'Home Equity Loan - Fixed Rate (30 Years)'}
]

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

const CheckEquity = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    creditScore: '',
    loanProduct: '',
    loanAmount: '',
    mortgageBalance: '',
    propertyValue: '',
    zip: '',
    state: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <>
      <Grid container item direction='row' gap={4} lg={12}>
        <Grid 
          container 
          item 
          direction='column' 
          lg={12}           
          p={3} 
        >
          <Alert sx={{ mb: 2 }} severity='error' >Sorry, this tool is currently unavailable. For more info, please visit the rapidAPI docs page.</Alert>
          <Typography variant='h5'>Check Equity Rates</Typography>
          <form>
            <Grid 
              container 
              item 
              spacing={2} 
              py={3} 
              direction='row' 
              justifyContent={isMobile() ? 'space-between' : 'start' }
            >  
              <Grid item xs={6} lg={2}>
                <FormControl sx={{ width: '100%' }} required size="small">
                  <CustomInputLabel id="creditScore-label">Credit Score</CustomInputLabel>
                  <Select
                    labelId="creditScore-label"
                    id="creditScore-select"
                    label="Credit Score"
                    required
                    onChange={(event) => {
                      setInputs(prevInputs => {
                        return  {...prevInputs, 'creditScore': event.target.value}
                      });                  
                    }}  
                    value={inputs.creditScore}
                  >                  
                    {creditOptions.map(option => (
                      <MenuItem key={option.value}  value={option.value}>{option.label}</MenuItem>
                    ))}                  
                  </Select>
                </FormControl>
              </Grid>  
              <Grid item xs={6} lg={2}>
                <FormControl sx={{ width: '100%' }} required size="small">
                  <CustomInputLabel id="loanProduct-label">Type of Loan</CustomInputLabel>
                  <Select
                    labelId="loanProduct-label"
                    id="loanProduct-select"
                    label="Type of Loan"
                    required
                    onChange={(event) => {
                      setInputs(prevInputs => {
                        return  {...prevInputs, 'loanProduct': event.target.value}
                      });                  
                    }}  
                    value={inputs.loanProduct}
                  >                  
                    {loanOptions.map(option => (
                      <MenuItem key={option.value}  value={option.value}>{option.label}</MenuItem>
                    ))}                  
                  </Select>
                </FormControl>
              </Grid>  
              <Grid item xs={6} lg={2}>
                <TextField
                    id="loanAmount"
                    label="Loan Amount"
                    type="search"             
                    required     
                    size="small"         
                    name='loanAmount'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
              </Grid>
              <Grid item xs={6} lg={2}>
                <TextField
                    id="mortgageBalance"
                    label="Mortgage Balance"
                    type="search"             
                    required     
                    size="small"         
                    name='mortgageBalance'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
              </Grid>
              <Grid item xs={7} lg={2}>
                <TextField
                    id="propertyValue"
                    label="Property Value"
                    type="search"             
                    required     
                    size="small"         
                    name='propertyValue'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
              </Grid>
              <Grid item xs={5} lg={1}>
                <TextField
                    id="zip"
                    label="Zip Code"
                    type="search"             
                    required     
                    size="small"         
                    name='zip'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
              </Grid>
              <Grid item lg={3} xs={8} >
                <Autocomplete                  
                  id="combo-box-demo"
                  options={stateOption}
                  value={stateOption.find(option => option.value === inputs.state_code)}
                  sx={{ width: '100%' }}  
                  onChange={(event, newValue) => {
                    setInputs(prevInputs => {
                      return  {...prevInputs, 'state': newValue ? newValue.value : ''}
                    });                  
                  }}      
                  disableClearable
                  size="small"
                  renderInput={(params) => <TextField {...params} required label="State" />}
                />
              </Grid>
              <Grid item xs={4} lg={2}>
                {isLoading ? (
                  <Button 
                    sx={{ width: '100%' }}
                    size='medium'                      
                    variant='contained' 
                    disabled
                    startIcon={<CircularProgress size={22} />}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button 
                    type='submit' 
                    sx={{ width: '100%' }}
                    size='medium'
                    disabled
                    variant='contained' 
                    startIcon={<BiSearchAlt2 />}
                  >
                    Search
                  </Button> 
                )}
                  
              </Grid>
            </Grid>  
          </form>
        </Grid>
        
      </Grid>
      <Divider sx={{ border: '1px solid #93978828', opacity: 1 }} />
    </>
  )
}

export default CheckEquity