import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme';
import App from './app';

ReactDOM.createRoot(document.getElementById('app'))
  .render(<ChakraProvider theme={theme}><App/></ChakraProvider>);
