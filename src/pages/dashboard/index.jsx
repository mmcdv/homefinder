import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, IconButton, Typography } from '@mui/material';
import { isMobile, fetchUserIP } from '../../utils';

const bgImg = '/bg_img.jpg';

const DashboardPage = () => {
  
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLocation = async () => {
      const userIP = await fetchUserIP();
      if (userIP) {
        sessionStorage.setItem('userIP', userIP);
      } 
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = bgImg;

    image.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  return (
    <Grid container>
      <div 
        className={`bg_img ${bgLoaded ? 'loaded' : ''}`}
        style={{ 
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          height: '100vh'          
        }}
      ></div>
      <Grid container px={3} textAlign='center' mt={isMobile() ? 10 : 0}>
        <Grid item xs={12} mb={3}>
          <Typography variant={isMobile() ? 'h5' : 'h3' } color='#fff'>Your Home Journey Begins Here</Typography>
        </Grid>
        <Grid container item direction='row' justifyContent='center' xs={12} gap={3}>
          <Button onClick={() => navigate('/newhome')} className='home_btn' variant='contained'>Start Your Home Search</Button>
          <Button onClick={() => navigate('/tools')} className='home_btn2' variant='outlined' sx={{ color: '#f9f9f9', borderColor: '#fff'}}>Explore Financial Tools</Button>
        </Grid>
      </Grid>
    </Grid>    
  )
}

export default DashboardPage;
