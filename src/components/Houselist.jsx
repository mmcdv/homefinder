import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from '../utils';

import { BsBookmark, BsDot, BsFillShareFill, BsThreeDotsVertical, BsFire } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io';
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import '/image_not_found.png';
import Scrollbars from 'react-custom-scrollbars-2';


const Houselist = ({ houseInfo, handleListingItemClick, selectedHouseId, loadingHouse }) => {

  const houseInfoList = houseInfo; 
  const [imageLoad, setImageLoad] = useState(false);
  const [isClickLoading, setIsClickLoading] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const noImage = '/image_not_found.png';

  const handleImageLoad = () => {
    setImageLoad(true);
  };

  return (
    <>
      <div className="page-content-container">
      <Scrollbars style={{ width: '100%', height: 540 }}>
        <Grid
          container
          direction='row'
          spacing={3}
          p={4}
        >          
            {houseInfoList.length > 0 ? (            
              houseInfoList.map((property) => (   
                <Grid key={property.property_id} item lg={4} xs={12}>     
                  <Card 
                    sx={{ width: '100%' }}
                    raised
                  >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {!imageLoad && (
                        <Skeleton variant="rectangular" width="100%" height={195} />
                      )}
                      {path === '/savedlistings' ? (
                        <img
                          height="195"                
                          src={property.photos[0].href}
                          alt={<Skeleton variant="rounded" width='100%' height={195} />}
                          style={{ display: imageLoad ? 'block' : 'none' }}
                          onLoad={handleImageLoad}
                        />   
                      ) : property.primary_photo ? (                     
                        <img
                          height="195"                
                          src={property.primary_photo.href}
                          alt={<Skeleton variant="rounded" width='100%' height={195} />}
                          style={{ display: imageLoad ? 'block' : 'none' }}
                          onLoad={handleImageLoad}
                        />                    
                      ) : (
                        <img
                          height="195"  
                          src={noImage}                                        
                          alt={<Skeleton variant="rounded" width='100%' height={195} />}
                          style={{ display: imageLoad ? 'block' : 'none' }}
                          onLoad={handleImageLoad}
                        /> 
                      )}
                    </div>
                                                       
                    <CardContent>
                      <Typography variant='h6'>
                        {
                          property.list_price 
                          ? `$${property.list_price.toLocaleString()}`
                          : 'Price not available'
                        }    
                      </Typography>  
                      <Typography variant="body1" color="text.secondary">
                        <span>{property.location.address.line}</span>
                        <span> {property.location.address.city}</span>
                        <span> {property.location.address.state_code},</span>
                        <span> {property.location.address.postal_code}</span>
                      </Typography>
                      <div className="houselist-desc">                        
                        <Typography variant='' color='text.secondary'>
                          <span>
                            {property.description.beds ? (
                              <>
                                {property.description.beds}
                                <span> Beds</span>
                              </>
                            ) : property.description.beds_min ? (
                              <>
                                {property.description.beds_min}
                                <span>+ Beds</span>
                              </>
                            ): (
                              <>
                                <span>-- Beds</span>
                              </>
                            )}
                          </span>
                        </Typography>
                        {<BsDot style={{ margin: '0 5px'}} />}
                        <Typography variant='' color='text.secondary'>
                          <span>
                            {property.description.baths ? (
                              <>
                                {property.description.baths}
                                <span> Baths</span>
                              </>
                            ) : property.description.baths_min ? (
                              <>
                                {property.description.baths_min}
                                <span>+ Baths</span>
                              </>
                            ): (
                              <>
                                <span>-- Baths</span>
                              </>
                            )}
                          </span>
                        </Typography>
                      </div>                                                                  
                    </CardContent>
                    <CardActions disableSpacing>
                      <Grid
                        container
                        direction='row'      
                        justifyContent='space-between'                           
                      >                      
                        <Grid item >
                          {property.flags.is_new_listing ? (
                            <Chip color='secondary' icon={<BsFire />} label='New Listing' />
                          ) : property.flags.is_price_reduced ? (
                            <Chip color='error' icon={<MdOutlineMoneyOffCsred />} label='Price Reduced' />
                          ) : null}
                        </Grid>
                        <Grid item  >
                          
                          {property.loading ? (
                            <Button 
                              variant='outlined' 
                              color='primary' 
                              disabled
                            >
                              <CircularProgress size={22} />
                            </Button>                         
                            ) : (                              
                              <Button 
                                variant='outlined' 
                                color='primary' 
                                onClick={() => handleListingItemClick(property)}
                              >
                                View
                              </Button>  
                            )}
                        </Grid>       
                      </Grid>                                                                                    
                    </CardActions>            
                  </Card>  
                </Grid>          
              ))
            ) : null }
        </Grid>  
        </Scrollbars>      
      </div>
    </>
  )
}

export default Houselist