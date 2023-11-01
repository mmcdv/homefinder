import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Divider, IconButton, Typography, inputClasses } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BiSearchAlt2, BiErrorCircle } from 'react-icons/bi';
import { isMobile } from '../../utils';
import axios from 'axios';
import { rapidApiKey } from '../../content';
import Scrollbars from 'react-custom-scrollbars-2';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import { FiMail, FiPhone } from "react-icons/fi";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export const CustomInputLabel = ({children, id}) => {
  return(
    <InputLabel id={id} sx={{
      backgroundColor: '#f9f9f9',
      paddingRight: '2px'

    }} >
      {children}
    </InputLabel>
  )  
}

const FindAgents = () => {

  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    postal_code: '',
    agent_name: '',
    limit: ''
  });
  const [showMore, setShowMore] = useState(false);
  
  const [availableAgents, setAvailableAgents] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAgentSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get('https://realtor.p.rapidapi.com/agents/list', {
        params: {
          postal_code: inputs.postal_code,
          types: 'agent',
          sort: 'recent_activity_high', 
        },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'realtor.p.rapidapi.com',
        },
      });

      console.log(response.data.agents);
      setAvailableAgents(response.data.agents);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        <Grid 
          container 
          item 
          direction={isMobile() ? 'row' : 'column' } 
          lg={12}           
        >
          <form onSubmit={handleAgentSearch}>
            <Grid container item mt={2} px={3} direction='column' xs={12} >
              <Grid item>
                <Typography variant='h6' mt={1}>Enter a zip code to see available agents</Typography>
              </Grid>
              <Grid 
                item         
                container                  
                direction='row'
                justifyContent='start' 
                mt={2}        
                lg={12}
                gap={2}
              >
                <Grid item xs={4} lg={2}>
                  <TextField
                    id="postal_code"
                    label="Zip Code"
                    type="search"                  
                    size="small"         
                    required
                    name='postal_code'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                    value={inputs.postal_code}
                  />
                </Grid>
                <Grid item xs={4} lg={2}>
                  <TextField
                    id="agent_name"
                    label="Agent Name"
                    type="search"                  
                    size="small"         
                    name='agent_name'
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                    variant="outlined"
                    value={inputs.agent_name || ''}                
                  />
                </Grid>
                <Grid item xs={1} lg={2}>
                  {isLoading ? (
                    <Button 
                      sx={{ width: '100%' }}
                      size='medium'                      
                      variant='contained' 
                      disabled
                      startIcon={<CircularProgress size={22} />}
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button 
                      type='submit' 
                      sx={{ width: '100%' }}
                      size='large'
                      variant='contained' 
                      startIcon={isMobile() ? '' : <BiSearchAlt2 />}
                    >         
                    {isMobile() ? <BiSearchAlt2 size={22} /> : 'Search'}             
                    </Button> 
                  )}
                </Grid> 
              </Grid>                                       
            </Grid>
          </form>
          <Divider sx={{ border: '1px solid #93978828', opacity: 1, my: 3 }} />
          {availableAgents && !isLoading && (
            <Scrollbars style={{ width: '100%', height: 500 }}>   
              {availableAgents.length > 0 && (
                <Typography variant='h6' px={3} mt={3}>Available Agents</Typography>
              )}           
              <Grid container item direction='row' mt={4} justifyContent='space-between' gap={3} px={3}>                
                {availableAgents.map((agent, i) => (    
                    <Card key={i} sx={{ width: 420 }}>
                      <CardHeader
                        avatar={
                          <Avatar 
                            src={agent.photo.href} 
                            sx={{ height: 64, width: 64}} 
                            aria-label="profile"
                          />                            
                        }                        
                        title={agent.nick_name ? agent.nick_name : agent.full_name}
                        subheader={agent.office.name ? agent.office.name : agent.broker.name}
                      />                      
                      <CardContent>
                        <div>
                          <IconButton aria-label="Cell">
                            <FiPhone size={18} />                          
                          </IconButton>
                          <span style={{ paddingLeft: 10 }}>:</span>
                          <span style={{ paddingLeft: 10 }}>
                            {agent.phones.find(phone => phone.type === 'Mobile')?.number 
                            ? (
                                agent.phones.find(phone => phone.type === 'Mobile')?.number
                              ) 
                            : agent.phones[0].number 
                            ? (
                                agent.phones[0].number
                              ) 
                            : 'Not available'}
                          </span>
                        </div>
                        <div>
                          <IconButton aria-label="Email">
                            <FiMail size={18} />                          
                          </IconButton>
                          <span style={{ paddingLeft: 10 }}>:</span>
                          <span style={{ paddingLeft: 10 }}>
                            {agent.email}
                          </span>
                        </div>        
                        <Button variant='contained' sx={{ mt: 2 }}>View Listings</Button>                                   
                      </CardContent>
                      {/* <CardActions disableSpacing>                        
                        <Typography variant='body1'>{agent.slogan}</Typography>
                      </CardActions> */}
                    </Card>
                ))}
              </Grid>
            </Scrollbars>            
          )}
          
        </Grid>  
    </>
    
  )
}

export default FindAgents;

  {/* <Grid container item direction='row' lg={12} alignItems='center' py={2}>
                      <Avatar src={agent.photo.href} sx={{ height: 54, width: 54}} />
                      <Grid item paddingLeft={2}>
                        <Typography variant='body1'>{agent.nick_name ? agent.nick_name : agent.name}</Typography>
                        <Typography variant='body2'>{agent.office.name ? agent.office.name : agent.broker.name}</Typography>
                      </Grid>                    
                    </Grid>                            
                    <Divider sx={{ border: '1px solid #000' }} /> */}