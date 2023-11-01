import React, { useState, useEffect, useRef } from 'react';
import { stateOption, searchLimit, minPrice, maxPrice, sortList, propTypes, minBeds, maxBeds, minBaths, maxBaths, purchaseOptions } from '../content';
import axios from 'axios';
import Loader from './Loader';
import { formatNumber, isMobile } from '../utils';

import { FiFilter } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { RxDividerHorizontal } from 'react-icons/rx';
import { BiUpArrow } from 'react-icons/bi';
import { IoCloseSharp } from "react-icons/io5";
import { BiSearchAlt2, BiErrorCircle } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';

import Grid from '@mui/material/Grid';
import { Button, IconButton, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const Filtermenu = ({ onSubmit }) => {

  const [loading, setLoading] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const [inputs, setInputs] = useState({
    address: '',
    city: '',
    state_code: '',
    postal_code: '',
    status: 'for_sale',
    limit: '25',
    type: '',
    list_price_min: '',
    list_price_max: '',    
    sort_field: '',
    sort_direction: '', 
    beds_min: '',
    beds_max: '',
    baths_min: '',
    baths_max: '',
    sqft_min: '',
    sqft_max: '',
    lot_sqft_min: '',
    lot_sqft_max: '',       
    no_hoa_fee: '',
    foreclosure: '',
    cats: '',
    dogs: '',
    is_new_construction: '',    
  });

  const handleMoreFilters = () =>  {
    setMoreFilters(!moreFilters);
  }

  const handleMultipleChange = (event) => {
    const {
      target: { value },
    } = event;
  };  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMoreFilters(false);
    onSubmit(inputs);    
  };
   

  return (
    <>      
    {loading && (        
      <>
        <div className="loading-container">
          <Grid 
            container 
            item
            direction='row' 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            xs={12} 
            sx={{ height: isMobile() ? '100vh' : '100%', width: '100%' }} >
            <Loader />
          </Grid>
        </div>        
      </>
    )}
      {!loading && (
        <div className="filtermenu-container">
          <form onSubmit={handleSubmit}>
            <Grid 
              container
              direction="row"
              spacing={3}
              p={3}
              justifyContent='start'
            >             
              <Grid item lg={3} xs={6}>
                <TextField
                  id="address"
                  label="Street Address"
                  type="search"
                  size="small"         
                  sx={{ width: '100%' }}         
                  name='address'
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={2} xs={6}>
                <TextField
                  id="address"
                  onChange={handleInputChange}
                  name='city'
                  label="City"
                  sx={{ width: '100%' }}  
                  type="search"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={2} xs={6} >
                <Autocomplete                  
                  id="combo-box-demo"
                  options={stateOption}
                  value={stateOption.find(option => option.value === inputs.state_code)}
                  sx={{ width: '100%' }}  
                  onChange={(event, newValue) => {
                    setInputs(prevInputs => {
                      return  {...prevInputs, 'state_code': newValue ? newValue.value : ''}
                    });                  
                  }}      
                  disableClearable
                  size="small"
                  renderInput={(params) => <TextField {...params} required label="State" />}
                />
              </Grid>
              <Grid item lg={2} xs={6}>
                <TextField
                  id="postal_code"
                  label="Zip Code"
                  sx={{ width: '100%' }} 
                  name='postal_code'
                  required
                  onChange={handleInputChange}
                  type="text"
                  variant="outlined"
                  value={inputs.postal_code}
                  size="small"
                />
              </Grid>
            </Grid>  
            <Grid 
              container
              direction='row'
              px={3}
              pb={3}
              spacing={3}
            >
              <Grid item lg={2} xs={7}>
                <FormControl sx={{ width: '100%' }} required size="small">
                  <CustomInputLabel id="status-label">Status</CustomInputLabel>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    label="Age"
                    required
                    onChange={(event) => {
                      setInputs(prevInputs => {
                        return  {...prevInputs, 'status': event.target.value}
                      });                  
                    }}  
                    value={inputs.status}
                  >                  
                    {purchaseOptions.map(option => (
                      <MenuItem key={option.value}  value={option.value}>{option.label}</MenuItem>
                    ))}                  
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2} xs={5}>
                <FormControl sx={{ width: '100%' }} required size="small">
                  <CustomInputLabel id="limit-label">Limit</CustomInputLabel>
                  <Select
                    labelId="limit-label"
                    id="limit-select"
                    label="limit"
                    required
                    onChange={(event) => {
                      setInputs(prevInputs => {
                        return  {...prevInputs, 'limit': event.target.value}
                      });                  
                    }}  
                    value={inputs.limit}
                  >                  
                    {searchLimit.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}                  
                  </Select>
                </FormControl>
              </Grid>     
              <Grid item lg='auto' xs={7}>
                <Button 
                  variant='outlined' 
                  size='large' 
                  color='primary' 
                  onClick={handleMoreFilters}
                  startIcon={<IoIosOptions />}
                >
                  More Filters
                </Button>
              </Grid>       
              <Grid item lg='auto' xs={5}>
                <Button 
                  variant='contained' 
                  type='submit' 
                  size='large' 
                  color='primary'
                  sx={{ width: '100%' }}
                  startIcon={<BiSearchAlt2 />}
                >
                  Search
                </Button>
              </Grid>                            
            </Grid>               
            <Drawer
              open={moreFilters}
              onClose={() => setMoreFilters(false)}
              anchor={isMobile() ? 'bottom' : 'right'}
              
            >
              <Scrollbars style={{ width: isMobile() ? '100vw' : 380, height: '100vh' }}>
                <div className="more-filters-box">
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleMoreFilters}>
                      <IoCloseSharp />
                    </IconButton>
                  </div>
                  <Typography variant='subtitle2' mb={1}>
                      Price Range
                    </Typography>
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    spacing={3}
                  >      
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="list_price_min-label">Min</CustomInputLabel>
                        <Select
                          labelId="list_price_min-label"
                          id="list_price_min-select"
                          label="list_price_min-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'list_price_min': event.target.value}
                            });                  
                          }}  
                          value={inputs.list_price_min}
                        >                  
                          {minPrice.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="list_price_max-label">Max</CustomInputLabel>
                        <Select
                          labelId="list_price_max-label"
                          id="list_price_max-select"
                          label="list_price_max-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'list_price_max': event.target.value}
                            });                  
                          }}  
                          value={inputs.list_price_max}
                        >                  
                          {maxPrice.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='subtitle2' mb={1}>
                      Bedrooms
                    </Typography>
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    spacing={3}
                  >                      
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="beds_min-label">Min</CustomInputLabel>
                        <Select
                          labelId="beds_min-label"
                          id="beds_min-select"
                          label="beds_min-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'beds_min': event.target.value}
                            });                  
                          }}  
                          value={inputs.beds_min}
                        >                  
                          {minBeds.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="beds_max-label">Max</CustomInputLabel>
                        <Select
                          labelId="beds_max-label"
                          id="beds_max-select"
                          label="beds_max-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'beds_max': event.target.value}
                            });                  
                          }}  
                          value={inputs.beds_max}
                        >                  
                          {maxBeds.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='subtitle2' mb={1} >
                      Bathrooms
                    </Typography>
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    spacing={3}
                  >                      
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="beds_min-label">Min</CustomInputLabel>
                        <Select
                          labelId="baths_min-label"
                          id="baths_min-select"
                          label="baths_min-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'baths_min': event.target.value}
                            });                  
                          }}  
                          value={inputs.baths_min}
                        >                  
                          {minBaths.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={5} xs={6}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <CustomInputLabel id="baths_max-label">Max</CustomInputLabel>
                        <Select
                          labelId="baths_max-label"
                          id="baths_max-select"
                          label="baths_max-label"                            
                          onChange={(event) => {
                            setInputs(prevInputs => {
                              return  {...prevInputs, 'baths_max': event.target.value}
                            });                  
                          }}  
                          value={inputs.baths_max}
                        >                  
                          {maxBaths.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                          ))}                  
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='subtitle2' mb={1} >
                    Building Size
                  </Typography>                    
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    spacing={3}
                  >                      
                    <Grid item lg={5} xs={6}>
                      <TextField
                        id="sqft_min"
                        label="Min (sqft)"
                        sx={{ width: '100%' }} 
                        name='sqft_min'
                        onChange={handleInputChange}
                        type="text"
                        variant="outlined"
                        value={inputs.sqft_min?.toLocaleString()}
                        size="small"
                      />
                    </Grid>
                    <Grid item lg={5} xs={6}>
                      <TextField
                        id="sqft_max"
                        label="Max (sqft)"
                        sx={{ width: '100%' }} 
                        name='sqft_max'
                        onChange={handleInputChange}
                        type="text"
                        variant="outlined"
                        value={inputs.sqft_max?.toLocaleString()}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='subtitle2' mb={1} >
                    Lot Size
                  </Typography>                    
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    spacing={3}
                  >                      
                    <Grid item lg={5} xs={6}>
                      <TextField
                        id="lot_sqft_min"
                        label="Min (sqft)"
                        sx={{ width: '100%' }} 
                        name='lot_sqft_min'
                        onChange={handleInputChange}
                        type="text"
                        variant="outlined"
                        value={inputs.lot_sqft_min?.toLocaleString()}
                        size="small"
                      />
                    </Grid>
                    <Grid item lg={5} xs={6}>
                      <TextField
                        id="lot_sqft_max"
                        label="Max (sqft)"
                        sx={{ width: '100%' }} 
                        name='lot_sqft_max'
                        onChange={handleInputChange}
                        type="text"
                        variant="outlined"
                        value={inputs.lot_sqft_max?.toLocaleString()}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />                                          
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    sx={{ marginTop: '5px' }}
                  >                      
                    <Grid item lg={12}>
                      <FormControlLabel 
                        control={<Switch />} 
                        label='New Construction' 
                        name='is_new_construction'
                        checked={Boolean(inputs.is_new_construction)}
                        onChange={handleInputChange}
                      />
                    </Grid>                          
                  </Grid>
                  <Divider sx={{ my: 2 }} />                                          
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    sx={{ marginTop: '5px' }}
                  >                      
                    <Grid item lg={12}>
                      <FormControlLabel 
                        control={<Switch />} 
                        label='Allows Dogs' 
                        name='dogs'
                        checked={Boolean(inputs.dogs)}
                        onChange={handleInputChange}
                      />
                    </Grid>                          
                  </Grid>
                  <Divider sx={{ my: 2 }} />                                          
                  <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    sx={{ marginTop: '5px' }}
                  >                      
                    <Grid item lg={12}>
                      <FormControlLabel 
                        control={<Switch />} 
                        label='Allows Cats' 
                        name='cats'
                        checked={Boolean(inputs.cats)}
                        onChange={handleInputChange}
                      />                          
                    </Grid>                          
                  </Grid>
                </div>
              </Scrollbars>
            </Drawer>            

          </form>
        </div>
      )}
    </>
  )
}

export default Filtermenu;