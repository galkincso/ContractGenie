import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from "@material-ui/core";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#D2E9E9" 
    },
    secondary: {
      main: "#E3F4F4" 
    },
    third: {
      main: "#C4DFDF"
    }
  },
  fontFamily: 'Roboto'
});
/*
Colors of the palette:
#F8F6F4 -> background
#E3F4F4  -> primary
#D2E9E9 -> secondary
#C4DFDF -> third
*/ 

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
