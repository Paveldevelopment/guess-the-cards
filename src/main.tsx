import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // optional, if you have a global CSS

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode> 
    <App />
  </React.StrictMode> 
)


// PAV navrzeno AI ale ma to tak vazne byt?
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// // Create a custom theme (optional)
// const theme = createTheme({
//   // You can customize your theme here
// });

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );

