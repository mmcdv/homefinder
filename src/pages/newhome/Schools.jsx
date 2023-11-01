import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const SchoolTab = ({ selectedHouse }) => {

  return (
    <>
      <Grid container>
        <div className="">
          {selectedHouse.schools.schools ? (
            selectedHouse.schools.schools.map((option, index) => (
              <div key={index}>
                <Grid container direction='row' alignItems='center' gap={2} className="" >
                  <Typography variant='h6'>
                    {option.name ? option.name : 'Not available'}
                  </Typography>
                  <Typography variant='body1'>
                    {option.distance_in_miles} mi
                  </Typography>
                </Grid>
                <Grid container direction='row'>
                  <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                    Type: {option.funding_type ? option.funding_type : 'Not available'}
                  </Typography>
                </Grid>
                <Grid container direction='row'>
                  <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                    Education Levels: {option.education_levels ? option.education_levels.join(', ') : 'Not available'}
                  </Typography>
                </Grid>
                <Grid container direction='row'>
                  <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                    District: {option.district.name ? option.district.name : 'Not available'}
                  </Typography>
                </Grid>
                <Grid container direction='row'>
                  <Typography variant='body1'>
                    Rating: {option.rating ? option.rating : 'Not available'}
                  </Typography>
                </Grid>
                <Grid container direction='row'>
                  <Typography variant='body1'>
                    Student Count: {option.student_count ? option.student_count : 'Not available'}
                  </Typography>
                </Grid>
                <Divider sx={{ backgroundColor: '#000', my: 2 }} />
              </div>

            ))
          ) : ''}
        </div>
      </Grid>
    </>
  )
}

export default SchoolTab