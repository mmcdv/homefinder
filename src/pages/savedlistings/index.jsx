import React, { useState } from 'react';
import Houselist from '../../components/Houselist';
import { BsBookmark, BsBookmarkFill, BsDot, BsFillShareFill, BsThreeDotsVertical, BsFire, BsBuilding } from 'react-icons/bs';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Loader';
import Housedisplay from '../../components/Housedisplay';
import { isMobile } from '../../utils';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Filtermenu from '../../components/Filtermenu';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

const SavedListingsPage = () => {

  const favoritesFromSession = JSON.parse(sessionStorage.getItem('favorites')) || [];
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [houseView, setHouseView] = useState(false);
  const [loadingHouse, setLoadingHouse] = useState(false);

  const handleListingItemClick = (property) => {

    setSelectedHouseId(property.property_id);
    setSelectedHouse(property);    
    setHouseView(true);

  };

  const handleCloseHouse = () => {
    setHouseView(false);
    setSelectedHouse(null);
    setSelectedHouseId(null);
  }

  return (
    <>      
      <div className="page-layout" >                   
        <div>      
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
          ) : '' }
          {favoritesFromSession < 1 && (
            <div 
              style={{ 
                height: '100vh', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <Typography variant='body1'>
                You have no saved listings available.
              </Typography>
            </div>            
          )}
          {!selectedHouse && (            
            <div style={{ padding: '0', height: '100vh', width: '100vw' }}>
              <Houselist 
                houseInfo={favoritesFromSession} 
                handleListingItemClick={handleListingItemClick} 
                selectedHouseId={selectedHouseId}
              /> 
            </div>            
          )}       
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

export default SavedListingsPage