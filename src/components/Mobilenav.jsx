import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from '@auth0/auth0-react';

import { RxDashboard } from "react-icons/rx";
import { BsHouses, BsTools, BsBookmarks } from "react-icons/bs";
import { MdMenu } from 'react-icons/md';



const Mobilenav = () => {
  
  const [openNav, setOpenNav] = useState(false);
  const [activeNav, setActiveNav] = useState('');

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavButtonClick = (name) => {
    setActiveNav(name);
    setOpenNav(false);
    navigate(name);
  };

  const handleLogin = () => {
    if(isAuthenticated) {
      navigate('/profile');
    } else {
      loginWithRedirect();
    }
  };

  const handleNavClose = () => {
    setOpenNav(false);
  }

  useEffect(() => {
    const path = location.pathname;
    setActiveNav(path);
    sessionStorage.setItem('activeBtn', path);
  }, [location.pathname]);

  useEffect(() => {
    const storedActiveBtn = sessionStorage.getItem('activeBtn');
    if (storedActiveBtn) {
      setActiveNav(storedActiveBtn);
    }
  }, []);


  return (
    <>    
      <AppBar position="sticky" sx={{ width: '100vw', top: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenNav(true)}
            sx={{ mr: 2 }}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HomeFinder
          </Typography>
          <Button 
            color="inherit" 
            type='button'
            onClick={handleLogin}
          >
            {isAuthenticated ? 'Account' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer 
        open={openNav}
        onClose={handleNavClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#284b63'
          }
        }}
      >
        <Stack
          spacing={3}
          direction='column'
          alignItems='flex-start'
          justifyContent='start'
          p={3}
        >
          <Button 
            className={`sidenav-btn ${activeNav === '/' ? 'active' : ''}`}
            onClick={() => handleNavButtonClick('/')}
            variant='outlined'   
            startIcon={<RxDashboard />} 
            sx={{ 
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >
            Dashboard
          </Button>
          <Button 
            variant='outlined'
            className={`sidenav-btn ${activeNav === '/newhome' ? 'active' : ''}`}
            onClick={() => handleNavButtonClick('/newhome')}
            startIcon={<BsHouses />}                    
            sx={{ 
              width: '100%',
              justifyContent: 'flex-start'
            }}          
          >          
            Properties
          </Button>
          <Button 
            variant='outlined'
            className={`sidenav-btn ${activeNav === '/tools' ? 'active' : ''}`}
            onClick={() => handleNavButtonClick('/tools')}
            startIcon={<BsTools />}      
            sx={{ 
              width: '100%',
              justifyContent: 'flex-start'
            }}          
          >
            Financial Tools
          </Button>
          <Button 
            variant='outlined'
            className={`sidenav-btn ${activeNav === '/savedlistings' ? 'active' : ''}`}
            onClick={() => handleNavButtonClick('/savedlistings')}
            startIcon={<BsBookmarks />}      
            sx={{ 
              width: '100%',
              justifyContent: 'flex-start'
            }}          
          >
            Favorites
          </Button> 
        </Stack>
      </Drawer>
    </>
  )
}

export default Mobilenav;