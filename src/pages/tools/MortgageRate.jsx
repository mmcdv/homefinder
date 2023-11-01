import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField';
import { BiSearchAlt2, BiErrorCircle } from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Loader from '../../components/Loader';
import { isMobile } from '../../utils';
import Scrollbars from 'react-custom-scrollbars-2';

import { fetchMortgageRate } from '../../api/fetchMortgageRate';

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

const MortgageRate = () => {

  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState('');
  const [selectedRateInfo, setSelectedRateInfo] = useState('');
  const [mortgageRates, setMortgageRates] = useState([]);
  const [rateOptions, setRateOptions] = useState([]);

  const handlePostalChange = (event) => {
    setPostalCode(event.target.value); 
  }
  
  const handleMortgage = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const mortgageData = await fetchMortgageRate(postalCode);
      
      const newRateOptions = mortgageData.map((rate) => ({
        value: rate.loan_type.loan_id,
        label: rate.loan_type.display_name
      }));

      setRateOptions(newRateOptions);
      setMortgageRates(mortgageData);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
    setSelectedRateInfo(mortgageRates.find(rate => rate.loan_type.loan_id === event.target.value));
  }

  return (
    <>
      <Grid 
        container 
        item 
        direction='column'
        gap={4} 
        lg={12}
      >
        <Grid 
          container 
          item 
          direction='column' 
          lg={12}           
          px={3} 
          sx={{ 
            height: isMobile() ? '' : '100vh' ,
          }}
        >
          <form onSubmit={handleMortgage}>
            <Grid container item mt={2} lg={11} direction='column' >
              <Grid item>
                <Typography variant='h6' mt={1}>Enter a zip code to see your rates</Typography>
              </Grid>
              <Grid 
                container 
                justifyContent='start' 
                direction='row'
                gap={2} 
                mt={2}                
              >
                <Grid item xs={5} lg={3}>
                  <TextField
                    id="postal_code"
                    label="Zip Code"
                    type="search"             
                    required     
                    size="small"         
                    name='postal_code'
                    sx={{ width: '100%' }}
                    onChange={handlePostalChange}
                    variant="outlined"
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
                      variant='contained' 
                      startIcon={<BiSearchAlt2 />}
                    >
                      Search
                    </Button> 
                  )}
                  
                </Grid> 
              </Grid>                                       
            </Grid>
          </form>
          
        </Grid>      
        <Divider sx={{ border: '1px solid #93978828', opacity: 1 }} />
        {mortgageRates.length > 0 && (
          <Grid container item direction='column' px={3}>
            <Grid item lg={2}>
              <Typography variant='h6'>Select a rate to see more:</Typography>
              <FormControl sx={{ width: '100%', mt: 2 }} size="small">
                <CustomInputLabel id="rates-label">Rates</CustomInputLabel>
                <Select
                  labelId="rates-label"
                  id="rates-select"
                  label="Rates"                  
                  onChange={handleRateChange}
                  value={selectedRate}
                >                  
                  {rateOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}                  
                </Select>
              </FormControl>
            </Grid>
            
            {selectedRate && (
              <>
                  <Grid container item mt={2}  direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>Type:</Typography>
                    <Typography variant='body1'>{selectedRateInfo.loan_type.display_name}</Typography>
                  </Grid>
                  <Divider sx={{ mt: 2, opacity: 1 }} />
                  <Grid container item mt={2} direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>Rate:</Typography>
                    <Typography variant='body1'>{(selectedRateInfo.rate * 100).toFixed(2) }%</Typography>
                  </Grid>
                  <Divider sx={{ mt: 2, opacity: 1 }} />
                  <Grid container item mt={2} direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>Term:</Typography>
                    <Typography variant='body1'>{selectedRateInfo.loan_type.term} years</Typography>
                  </Grid>
                  <Divider sx={{ mt: 2, opacity: 1 }} />
                  <Grid container item mt={2} direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>Fixed Rate:</Typography>
                    <Typography variant='body1'>{selectedRateInfo.loan_type.is_fixed ? 'True' : 'False' }</Typography>
                  </Grid>
                  <Divider sx={{ mt: 2, opacity: 1 }} />
                  <Grid container item mt={2} direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>VA Loan:</Typography>
                    <Typography variant='body1'>{selectedRateInfo.loan_type.is_va_loan ? 'True' : 'False' }</Typography>
                  </Grid>
                  <Divider sx={{ mt: 2, opacity: 1 }} />
              </>
            )} 
          </Grid>
        )}            
      </Grid>
      
    </>
  )
}

export default MortgageRate