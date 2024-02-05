import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ChartProovider } from './Context/ChartProovider.jsx';
import { ChakraProvider } from '@chakra-ui/react';
export const server="http://127.0.0.1:1754/api/v1";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ChartProovider>
 <ChakraProvider>
  <App />
  </ChakraProvider>
  </ChartProovider>
  </BrowserRouter>,
 
)
