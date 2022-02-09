import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { AnimatePresence } from 'framer-motion';
import WrapContextProvider from '../context/WrapContext';
render(
  <AnimatePresence>
    <WrapContextProvider>
      <App />
    </WrapContextProvider>
  </AnimatePresence>,
  document.getElementById('popup'),
);
