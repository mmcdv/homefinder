import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import SavedListingsPage from './pages/savedlistings';
import ToolsPage from './pages/tools';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import Newhome from './pages/newhome';
import Sidenav from './components/Sidenav';
import Mobilenav from './components/Mobilenav';
import Loader from './components/Loader';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './utils/Themecontext';

const isMobile = () => {
  return window.innerWidth <= 500; 
};

function App() {

  const [sideOpen, setSideOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSideOpen = () => {
    setSideOpen(!sideOpen);
  };

  const handleSideClose = () => {
    setSideOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            
          >        
              {isMobile() ? (
                <Grid item>
                  <Mobilenav />
                </Grid>
              ) : (
                <Grid item lg={sideOpen ? 2 : 1}>
                  <Sidenav 
                    extendSide={handleSideOpen} 
                    minimizeSide={handleSideClose} 
                    sideOpen={sideOpen} 
                  />  
                </Grid>              
              )}
            <Grid item lg={sideOpen ? 10 : 11}>                
              <Routes>
                <Route index element={<DashboardPage />} />
                <Route path='/newhome' element={<Newhome />} />
                <Route path='/tools' element={<ToolsPage />} />
                <Route path='/savedlistings' element={<SavedListingsPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Routes>
            </Grid>            
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
