import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { isMobile } from '../../utils';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from '../../components/Loader';
import { inputClasses } from '@mui/material';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';


function ProfilePage() {
  
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    full_name: '',
    email_address: '',
    picture: '',
    password: ''
  })

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setInputs({
        full_name: user.name,
        email_address: user.email,
        picture: user.picture,
        password: ''
      });
    }
  }, [isLoading, isAuthenticated, user]);

  if(isLoading) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
      </div>
    )
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      name: inputs.full_name,
      email: inputs.email_address,   
      picture: inputs.picture   
    };

    const userId = user.sub;

    const getAuthToken = async () => {
      try {
        const token = await getAccessTokenSilently();
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    try {
      const accessToken = getAuthToken();

      if (!accessToken) {
        console.error('Access token is undefined');
        return;
      }

      await updateUser(userId, userInfo);

    } catch (error) {
      console.error('Failed to update user:', error);
    }

  };

  return (
    <div className='page-layout'>
      <Grid container pt={4} direction='column' justifyContent='center' alignItems='center'>   
        {!isAuthenticated && (
          <Alert severity='error'>You need to be logged in to view this page. <Link onClick={() => loginWithRedirect()} sx={{ '&:hover' : { cursor: 'pointer' }}}>Login here</Link></Alert>
        )}     
        <Paper 
          elevation={3} 
          sx={{ 
            mr: 2, 
            p: 4, 
            width: isMobile() ? '100%' : '40%',
            borderRadius: '20px',
            textAlign: 'center',    
            height: 500,
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar 
              src={isAuthenticated ? user.picture : ''}
              sx={{ height: 70, width: 70 }}          
            />
          </div>          
          <Typography variant='h5' sx={{ textAlign: 'center', mt: 1 }}>Profile Settings</Typography>  
          <form method='POST' onSubmit={handleFormSubmit}>
            <Grid
              container
              gap={3}
              sx={{
                width: '100%',                
              }}
              mt={4}
            >              
              <Grid item lg={12}>
                <TextField
                  id="full_name"
                  label='Full Name'
                  type="text"                  
                  size="small"         
                  disabled
                  value={inputs.full_name}       
                  onChange={handleInputChange}           
                  name='full_name'
                  sx={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid> 
              <Grid item lg={12}>
                <TextField
                  id="email_address"
                  label='Email Address'
                  type="text"                  
                  size="small"         
                  disabled
                  onChange={handleInputChange}           
                  value={inputs.email_address}
                  name='email_address'
                  sx={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>  
              <Grid item lg={12}>
                <TextField
                  id="password"
                  label='Password'
                  type="password"           
                  disabled       
                  size="small"                           
                  value={inputs.email_address}
                  name='password'
                  sx={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>   
              <Grid item lg={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link 
                  sx={{ 
                    textAlign: 'right',
                    marginTop: '-15px',
                    textDecoration: 'none',
                    '&:hover': {
                      cursor: 'pointer'
                    } 
                  }} 
                >
                  Change Password              
                </Link>   
              </Grid>                  
            </Grid> 
            <div>        
              <Grid 
                container               
                direction='row'
                justifyContent='space-between'
                sx={{
                  position: 'absolute',
                  bottom: 30,
                  left: 20,
                  width: '93%'            
                }}
              >
                <Grid item>
                  <Button 
                    type='button' 
                    variant='contained' 
                    color='error'
                    onClick={() => {
                      logout({
                        returnTo: window.location.origin + '/'
                      });
                    }}
                  >
                    Log Out
                  </Button> 
                </Grid>                
              </Grid>          
            </div>   
          </form>             
        </Paper>
      
      </Grid>
    </div>
  )
}

export default ProfilePage