import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { isMobile } from '../../utils';

const Toolmenu = ({ activeTool, handleTool }) => {

  const handleToolClick = (toolName) => {
    handleTool(toolName);
  }

  return (
    <div style={{ width: '100%' }}>
      <Grid 
        container 
        p={2}
        spacing={2} 
        direction='row' 
        justifyContent={isMobile() ? 'space-between' : 'flex-start'}
      >
        <Grid item xs={6} lg='auto'>
          <Button
            variant='outlined'
            sx={{ py: 1, width: '100%' }}
            onClick={() => handleToolClick('mortgage-calc')}
            className={`tool-btn ${activeTool === 'mortgage-calc' ? 'active-tool-btn' : '' }`}
          >
            {isMobile() ? 'Mortgage Rate' : 'Mortgage Calculator' }
          </Button>
        </Grid>
        <Grid item xs={6} lg='auto'>
          <Button
            variant='outlined'
            sx={{ py: 1, width: '100%' }}
            onClick={() => handleToolClick('agent-search')}
            className={`tool-btn ${activeTool === 'agent-search' ? 'active-tool-btn' : '' }`}
          >
            Find Agents
          </Button>
        </Grid>
        <Grid item xs={6} lg='auto'>
          <Button
            variant='outlined'
            sx={{ py: 1, width: '100%' }}
            onClick={() => handleToolClick('equity-checker')}
            className={`tool-btn ${activeTool === 'equity-checker' ? 'active-tool-btn' : '' }`}
          >
            Equity Checker
          </Button>
        </Grid>
        <Grid item xs={6} lg='auto'>
          <Button
            variant='outlined'
            sx={{ py: 1, width: '100%' }}
            onClick={() => handleToolClick('afford-calc')}
            className={`tool-btn ${activeTool === 'afford-calc' ? 'active-tool-btn' : '' }`}
          >
            {isMobile() ? 'Budget Est.' : 'Budget Estimator'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Toolmenu