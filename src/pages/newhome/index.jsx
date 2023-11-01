import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { rapidApiKey } from '../../content';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Filtermenu from '../../components/Filtermenu';
import Houselist from '../../components/Houselist';
import Housedisplay from '../../components/Housedisplay';
import Loader from '../../components/Loader';
import Alert from '@mui/material/Alert';
import { isMobile } from '../../utils';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Newhome = () => {

  const [houseInfo, setHouseInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHouse, setLoadingHouse] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [houseView, setHouseView] = useState(false);
  
  const [errorInfo, setErrorInfo] = useState({
    msg: '',
    type: '',
  });

  const handleFormSubmit = async (inputs) => {
    setIsLoading(true);
    
    const statusArray = [inputs.status];

    const generateSubObject = (inputs, prefix) => {
      const subObject = {};
    
      if (inputs[`${prefix}_min`]) {
        subObject.min = inputs[`${prefix}_min`];
      }
    
      if (inputs[`${prefix}_max`]) {
        subObject.max = inputs[`${prefix}_max`];
      }
    
      // Only return the subObject if it has properties (min or max)
      return Object.keys(subObject).length > 0 ? subObject : null;
    };
    
    const createNonEmptyInputs = (inputs) => {
      const nonEmptyInputs = {};
    
      // Iterate through the inputs object and include non-empty values
      for (const key in inputs) {
        if (inputs[key] !== '' && key !== 'sort_direction' && key !== 'sort_field') {
          nonEmptyInputs[key] = inputs[key];
        }
      }
    
      return nonEmptyInputs;
    };

    const limitValue = parseInt(inputs.limit, 10);
    const nonEmptyInputs = createNonEmptyInputs(inputs);

    const formOptions = {
      method: 'POST',
      url: 'https://realtor.p.rapidapi.com/properties/v3/list',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
      },
      data: {
        offset: '0',
        ...nonEmptyInputs,
        list_price: {
          min: generateSubObject(inputs, 'list_price_min'),
          max: generateSubObject(inputs, 'list_price_max'),
        },
        sqft: {
          min: generateSubObject(inputs, 'sqft_min'),
          max: generateSubObject(inputs, 'sqft_max'),
        }, 
        lot_sqft: {
          min: generateSubObject(inputs, 'lot_sqft_min'),
          max: generateSubObject(inputs, 'lot_sqft_max'),
        }, 
        no_hoa_fee: inputs.no_hoa_fee,
        foreclosure: inputs.foreclosure,
        is_new_construnction: inputs.is_new_construnction,
        sort: [{
          direction: inputs.sort_direction,
          field: inputs.sort_field
        }],
        limit: limitValue,
        status: statusArray
      },
    };

    if (inputs.status === 'for_rent') {
      formOptions.data.cats = inputs.cats;
      formOptions.data.dogs = inputs.dogs;
    }

    try {
      const response = await axios.request(formOptions);
        setHouseInfo(response.data.data.home_search.results.map(property => ({
          ...property,
          loading: false, // Initially set loading to false for each property
        })));              
    } catch (error) {
        setErrorInfo('Something went wrong');
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  const handleListingItemClick = async (property) => {
    const updatedHouseInfo = houseInfo.map(item => ({
      ...item,
      loading: item.property_id === property.property_id, // Set loading to true for the selected property
    }));
    setHouseInfo(updatedHouseInfo);

    try {
      const response = await axios.get('https://realtor.p.rapidapi.com/properties/v3/detail', {
        params: {
          property_id: property.property_id,
        },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'realtor.p.rapidapi.com',
        },
      });

      setSelectedHouseId(property.property_id);
      setSelectedHouse(response.data.data.home);
    } catch (error) {
      console.error(error);
    } finally {
      setHouseView(true);
      setHouseInfo(updatedHouseInfo.map(item => ({
      ...item,
      loading: false, // Set loading back to false for all properties
    })));   
    }
  };



  const handleCloseHouse = () => {
    setHouseView(false);
    setSelectedHouse(null);
    setSelectedHouseId(null);
  }

  return (
    <>
      <div className="page-layout">
        <Filtermenu onSubmit={handleFormSubmit} /> 
        <Divider sx={{ border: '1px solid #93978828', opacity: 1 }} />
        <div>
          {errorInfo.type === 'filter' && (
            <>
              <Alert severity='error'>{errorInfo.msg}</Alert>
            </>
          )}    
          {isLoading ? (
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
          ) : !selectedHouse ? (
            <div style={{ padding: '0'}}>
              <Houselist 
                houseInfo={houseInfo} 
                handleListingItemClick={handleListingItemClick} 
                selectedHouseId={selectedHouseId}
                loadingHouse={loadingHouse}
              /> 
            </div>
            
          ) : ''}                    
          {selectedHouse && !loadingHouse && (
            <>            
              <Housedisplay 
                selectedHouse={selectedHouse} 
                houseView={houseView} 
                handleCloseHouse={handleCloseHouse}
              />
            </>
          )}      
        </div>
      </div>
    </>
  )
}

export default Newhome;
