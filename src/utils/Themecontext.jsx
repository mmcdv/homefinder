import React, { createContext, useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#284b63',
    },
    secondary: {
      main: '#3c6e71',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    success: {
      main: '#1d6921',
      dark: '#17561d',
    },
  },
  typography: {
    fontFamily: 'Bricolage Grotesque',
    button: {
      fontWeight: 600,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#284b63',
    },
    secondary: {
      main: '#3c6e71',
    },
    success: {
      main: '#1d6921',
      dark: '#17561d',
    },
  },
  typography: {
    fontFamily: 'Bricolage Grotesque',
    button: {
      fontWeight: 600,
    },
  },
});



const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
