import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import MortgageRate from './MortgageRate';
import Toolmenu from './Toolmenu';
import AffordCalc from './AffordCalc';
import CheckEquity from './CheckEquity';
import FindAgents from './FindAgents';
import { isMobile } from '../../utils';
import ScrollableTabsButtonAuto from '@mui/material/TabScrollButton';

import Scrollbars from 'react-custom-scrollbars-2';
import { Typography } from '@mui/material';

const TabPanel = ({ value, index, children }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        minHeight: '100%', 
      }}
    >
      {value === index && children}
    </Box>
  );
};

const ToolsPage = () => {

  const [activeTool, setActiveTool] = useState('mortgage-calc');
  const [isLoading, setIsLoadin ] = useState(false);
  const [mortgageRates, setMortgageRates] = useState([]);
  const [activeTab, setActiveTab] = useState('mortgage-calc');

  const handleToolClick = (toolName) => {
    setActiveTool(toolName)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }

  return (
    <>
      <div className='page-layout'>
        {isMobile() ? (
          <>
            <Toolmenu activeTool={activeTool} handleTool={handleToolClick} />
            
            <Divider sx={{ border: '1px solid #93978828', opacity: 1 }} />
            
            {activeTool === 'mortgage-calc' && (
              <MortgageRate />
            )}
            {activeTool === 'agent-search' && (
              <FindAgents />
            )}
            {activeTool === 'equity-checker' && (
              <CheckEquity />
            )}
            {activeTool === 'afford-calc' && (
              <AffordCalc />
            )}
          </>
        ) : (
          <>
            <Tabs
              value={activeTab}
              sx={{ pt: 2, width: '100%', overflowX: 'auto', maxWidth: '100%'  }}
              onChange={handleTabChange}
              aria-label="tab-stepper"
              variant='fullWidth'
            >
              <Tab label={isMobile() ? 'Mortgage Est.' : 'Mortgage Calculator'} value='mortgage-calc' />
              <Tab label='Find Agents' value='agent-search' />
              <Tab label={isMobile() ? 'Rate Check' : 'Equity Rate Checker'}  value='equity-checker' />
              <Tab label='Budget Estimator' disabled  value='afford-calc' />
            </Tabs>

            <Divider sx={{ border: '1px solid #93978828', opacity: 1 }} />

            <TabPanel value={activeTab} index='mortgage-calc'>
              <MortgageRate />
            </TabPanel>

            <TabPanel value={activeTab} index='equity-checker'>
              <CheckEquity />
            </TabPanel>

            <TabPanel value={activeTab} index='afford-calc'>
              <AffordCalc />
            </TabPanel>

            <TabPanel value={activeTab} index='agent-search'>
              <FindAgents />
            </TabPanel>
          </>
        )}          
      </div>
    </>
  )
}

export default ToolsPage