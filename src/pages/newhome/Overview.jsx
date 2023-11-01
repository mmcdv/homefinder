import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { TbRulerMeasure } from 'react-icons/tb';
import { BsBookmark, BsDot, BsFillShareFill, BsThreeDotsVertical, BsFire, BsBuilding } from 'react-icons/bs';
import { MdConstruction, MdOutlineGarage } from "react-icons/md";

const OverviewTab = ({ selectedHouse, showText, handleToggleDescription }) => {

  return (
    <>
    
      <Typography variant='body1' my={2} >
        {showText && selectedHouse.description.text ? (
          selectedHouse.description.text
        ) : (
          selectedHouse.description.text.slice(0, 150) + ' ...'
        )}
        <Button color='primary' onClick={handleToggleDescription}>
          {showText ? 'Hide' : 'More'}
        </Button>
      </Typography>      
      <Grid container direction='row' gap={1} alignItems='center' mb={1}>
        <TbRulerMeasure size={18} />
        <Typography variant='body1' paddingRight={1} color=''>
          Building Size: 
        </Typography>
        <Typography variant='body1' color=''>                
          {selectedHouse.description.sqft ? (
            <>
              {selectedHouse.description.sqft.toLocaleString()} sqft
            </>
          ) : selectedHouse.description.sqft_min ? (
            <>
              {selectedHouse.description.sqft_min.toLocaleString()} sqft
            </>
          ) : '-- sqft' }
        </Typography>
      </Grid>
      <Grid container direction='row' gap={1} alignItems='center' mb={1}>
        <BsBuilding size={18} />
        <Typography variant='body1'>
          {selectedHouse.description.type === 'single_family' && 'Single Family Residence'}
          {selectedHouse.description.type === 'multi_family' && 'Multi Family Residence'}
          {selectedHouse.description.type === null && 'Not available'}

        </Typography>
      </Grid>
      <Grid container direction='row' gap={1} alignItems='center' mb={1}>
        <MdConstruction size={18} />
        <Typography variant='body1'>
          {selectedHouse.description.year_built && (
            <>
              Built in  {selectedHouse.description.year_built}
            </>
          )}
        </Typography>
      </Grid>
      <Grid container direction='row' gap={1} alignItems='center' mb={1}>
        <MdOutlineGarage size={18} />
        <Typography variant='body1'>
          {selectedHouse.description.garage ? (
            <>
              {selectedHouse.description.garage}
            </>
          ) : '--'}
          <span style={{ paddingLeft: 5 }}>Garage spaces</span>
        </Typography>
      </Grid>
      {selectedHouse.days_on_market && (
        <Grid container direction='row'>
          <Typography variant='body1'>
            Days on the market: 
              selectedHouse.days_on_market
          
          </Typography>
        </Grid>      
      )}
      <Grid container direction='row' mt={2}>
        <Typography variant='body1'>
          <span style={{ paddingRight: 5 }}>Flood Factor Score:</span> 
          {selectedHouse.local.flood.flood_factor_score && selectedHouse.local.flood.flood_factor_score}
        </Typography>
      </Grid>
      <Grid container direction='row'>
        Noise Score: {selectedHouse.local.noise.score ? selectedHouse.local.noise.score : 'Not available'}        
      </Grid>
    </>
  )
}

export default OverviewTab