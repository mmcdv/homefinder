import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Carousel from 'react-bootstrap/Carousel';
import Scrollbars from 'react-custom-scrollbars-2';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';

import { isMobile } from '../utils';
import OverviewTab from '../pages/newhome/Overview';
import SchoolTab from '../pages/newhome/Schools';
import Taxinfo from '../pages/newhome/Taxinfo';
import PropertyHistory from '../pages/newhome/History';
import Payment from '../pages/newhome/Payment';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBookmark, BsBookmarkFill, BsDot, BsFillShareFill, BsThreeDotsVertical, BsFire, BsBuilding } from 'react-icons/bs';
import { BiSolidBath } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { MdConstruction, MdOutlineGarage } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";


const Housedisplay = ({ selectedHouse, houseView, handleCloseHouse }) => {

  const [activeTab, setActiveTab] = useState('overview')
  const [imageLoad, setImageLoad] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const [favorites, setFavorites] = useState(() => {
    const favoritesFromSession = JSON.parse(sessionStorage.getItem('favorites')) || [];
    return favoritesFromSession;
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleImageLoad = () => {
    setImageLoad(true);
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleToggleDescription = () => {
    setShowText(!showText);
  };

  const toggleFavorite = () => {
    if (favorites.some((house) => house.property_id === selectedHouse.property_id)) {
      // If it's already in favorites, remove it
      setFavorites((prevFavorites) =>
        prevFavorites.filter((house) => house.property_id !== selectedHouse.property_id)
      );
    } else {
      // If it's not in favorites, add it
      setFavorites((prevFavorites) => [...prevFavorites, selectedHouse]);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="">
      <Dialog
        fullScreen={fullScreen}
        open={houseView}
        onClose={handleCloseHouse}
        aria-labelledby="responsive-dialog-title"
        sx={{ overflow: 'hidden' }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end'}} id="responsive-dialog-title">
          <IconButton  onClick={handleCloseHouse}>
            <IoCloseSharp />
          </IconButton>
        </DialogTitle>
        <Carousel data-bs-theme="dark" >
          {selectedHouse.photos.map((option, index) => (
            <Carousel.Item key={index} className='carousel-cust'>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  height: '100%',
                  alignItems: 'center'
                }}
              >
                {!imageLoad && (
                  <Skeleton variant="rectangular" width="100%" height={195} />
                )}
                <img 
                  src={option.href} 
                  alt={<Skeleton variant="rounded" width='100%' height={195} />}
                  width='max-content'
                  height='100%'
                  style={{ display: imageLoad ? 'block' : 'none' }}
                  onLoad={handleImageLoad}
                />
              </div>                
            </Carousel.Item>  
          ))}    
        </Carousel>    
        <DialogContent 
          sx={{ 
            width: isMobile() ? '100%' : '600px',
            height: '100vh',
          }}
        >    
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
          >
            <Grid item >
              <Typography variant='h5'>
                {selectedHouse.list_price ? (
                  <>
                    ${selectedHouse.list_price.toLocaleString()}
                  </>
                ) : selectedHouse.list_price_min ? (
                  <>
                    {selectedHouse.list_price_min.toLocaleString()}+  
                  </>
                ) : 'Price not available'}
              </Typography>      
            </Grid>  
            <Grid item>
              <IconButton onClick={() => toggleFavorite()}> 
                {favorites.some((house) => house.property_id === selectedHouse.property_id) ? (
                  <BsBookmarkFill style={{ color: '#284b63' }} />
                ) : (
                  <BsBookmark />
                )}
              </IconButton>
            </Grid>
          </Grid>
            
          <Grid container direction='row'>
            <Typography variant='h6'>
              {selectedHouse.location.address.line}
            </Typography>
            <Typography variant='h6' px={1}>
              {selectedHouse.location.address.city} 
            </Typography>
            <Typography variant='h6'>
              {selectedHouse.location.address.state_code},
            </Typography>
            <Typography variant='h6' paddingLeft={1}>
              {selectedHouse.location.address.postal_code}
            </Typography>
          </Grid>     
          <Grid container direction='row' alignItems='center'>
        <Typography variant='body1' color=''>
          <span style={{ paddingRight: 8 }}>          
            {selectedHouse.description.beds ? (
              <>
                {selectedHouse.description.beds}
              </>
            ) : selectedHouse.description.beds_min ? (
              <>
                {selectedHouse.description.beds_min}
                <span>+</span>
              </>
            ) : (
              <>
                <span>--</span>
              </>
            )}            
          </span>
          <FaBed size={18} />
        </Typography>
        {<BsDot style={{ margin: '0 5px'}} />}
        <Typography variant='body1' color=''>
          <span style={{ paddingRight: 8 }}>
            {selectedHouse.description.baths_consolidated ? (
              <>
                {selectedHouse.description.baths_consolidated}
              </>
            ) : selectedHouse.description.baths_min ? (
              <>
                {selectedHouse.description.baths_min}
                <span>+</span>
              </>
            ): (
              <>
                <span>--</span>
              </>
            )}
          </span>
          <BiSolidBath size={18} />
        </Typography>
      </Grid>     
          <Tabs
            value={activeTab}
            sx={{ mt: 2, }}
            onChange={handleTabChange}
            aria-label="tab-stepper"
            variant={isMobile() ? 'scrollable' : 'fullWidth'}             
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab value="overview" label="Overview" />    
            <Tab value="payments" label="Payments" />          
            <Tab value="schools" label="Schools" />
            <Tab value="taxes" label="Tax Info" />
            <Tab value="history" label="Property History" />
          </Tabs>

            <Grid container mt={2}>

              {activeTab === 'overview' && (
                <OverviewTab 
                  selectedHouse={selectedHouse} 
                  showText={showText} 
                  handleToggleDescription={handleToggleDescription} 
                />              
              )}
              {activeTab === 'schools' && (
                <SchoolTab 
                  selectedHouse={selectedHouse}                   
                />              
              )}
              {activeTab === 'taxes' && (
                <Taxinfo 
                  selectedHouse={selectedHouse}                   
                />              
              )}
              {activeTab === 'history' && (
                <PropertyHistory 
                  selectedHouse={selectedHouse}                   
                />              
              )}
              {activeTab === 'payments' && (
                <Payment 
                  selectedHouse={selectedHouse}                   
                />              
              )}              
            </Grid>
          <DialogContentText>
            
          </DialogContentText>
          </Scrollbars>
        </DialogContent>  
      </Dialog>
    </div>
  )
}

export default Housedisplay;