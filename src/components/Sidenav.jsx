import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { createTheme, styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
 
import { CgDarkMode } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { BsHouses, BsTools, BsBookmarks, BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";
import { RiAccountPinBoxFill } from 'react-icons/ri';


const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 16,
    padding: '5px 15px'
  },  
}));

function ConditionalTooltip({ title, condition, children }) {
  return condition ? (
    children
  ) : (
    <CustomTooltip title={title} placement='right'>
      {children}
    </CustomTooltip>
  );
}

const Sidenav = ({ extendSide, sideOpen, minimizeSide }) => {

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const [activeNav, setActiveNav] = useState('');
  const navigate = useNavigate();
  const location = useLocation();  
  
  const handleNavButtonClick = (name) => {
    setActiveNav(name);
    navigate(name);
  };

  const handleLogin = () => {
    if(isAuthenticated) {
      navigate('/profile');
    } else {
      loginWithRedirect();
    }
  };

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
    <div style={{ padding: 20, height: '100vh' }}>
      <aside>
        <Stack 
          spacing={3}      
          direction='column'
          justifyContent='flex-start'
          alignItems={sideOpen ? 'flex-start' : ' center'}
          mt={3}
          position='relative'
          sx={{
            height: '100%'
          }}
        >
          <Button
            variant='outlined' 
            onClick={extendSide}     
            className='extend-btn'                            
          >
            {sideOpen ? (
              <BsArrowLeftSquare size={20}/>
              ) : (
                <BsArrowRightSquare size={20} />
              )}
          </Button>
          <ConditionalTooltip title='Dashboard' condition={sideOpen}>
            <Button 
              className={`sidenav-btn ${activeNav === '/' ? 'active' : ''}`}
              onClick={() => handleNavButtonClick('/')}
              variant='outlined'   
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: sideOpen?'flex-start':'center'
              }}                               
            >
              <RxDashboard size={20} />
              {sideOpen ? <span className='inner-sidenav-btn'>Dashboard</span> : null }
            </Button>
          </ConditionalTooltip>
          <ConditionalTooltip title='Properties' condition={sideOpen}>
            <Button 
              variant='outlined'
              className={`sidenav-btn ${activeNav === '/newhome' ? 'active' : ''}`}
              onClick={() => handleNavButtonClick('/newhome')} 
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: sideOpen?'flex-start':'center'
              }}              
            >
              <BsHouses size={20} />
              {sideOpen && ( <span className='inner-sidenav-btn'>Properties</span> )}
            </Button>
          </ConditionalTooltip>
          <ConditionalTooltip title='Financial Tools' condition={sideOpen}>
            <Button 
              variant='outlined'
              className={`sidenav-btn ${activeNav === '/tools' ? 'active' : ''}`}
              onClick={() => handleNavButtonClick('/tools')} 
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: sideOpen?'flex-start':'center'
              }}      
            >
              <BsTools size={20} />
              {sideOpen ? <span className='inner-sidenav-btn'>Calculator</span> : null }
            </Button>
          </ConditionalTooltip>
          <ConditionalTooltip title='Favorites' condition={sideOpen}>
            <Button 
              variant='outlined'
              className={`sidenav-btn ${activeNav === '/savedlistings' ? 'active' : ''}`}
              onClick={() => handleNavButtonClick('/savedlistings')} 
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: sideOpen?'flex-start':'center'
              }}              
            >
              <BsBookmarks size={20} />
              {sideOpen && ( <span className='inner-sidenav-btn'>Favorites</span> )}
            </Button>     
          </ConditionalTooltip>
          <ConditionalTooltip title={isAuthenticated ? 'Account' : 'Sign In'} condition={sideOpen}>
            <Button
              variant='outlined'
              className='sidenav-btn'
              onClick={handleLogin}
              sx={{
                display: 'flex',
                position: 'absolute',
                width: sideOpen?'100%' : '',
                bottom: 30,
                justifyContent: sideOpen?'flex-start':'center',                
              }}        
            >
              <RiAccountPinBoxFill size={25} />
              {sideOpen && ( <span className='inner-sidenav-btn'>{isAuthenticated ? 'Account' : 'Sign In'}</span> )}
            </Button>
          </ConditionalTooltip>
        </Stack>
      </aside>
    </div>
  )
}

export default Sidenav;