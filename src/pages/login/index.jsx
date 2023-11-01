import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../components/Loader';
import Grid from '@mui/material/Grid';
import { isMobile } from '../../utils';

function LoginPage() {

  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
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

  )
}

export default LoginPage