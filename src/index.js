import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {AppProvider } from "./context/AppContext";

import { BREAKPOINTS } from './helpers/constants';

document.documentElement.style.setProperty('--breakpoint-sm', BREAKPOINTS.sm);
document.documentElement.style.setProperty('--breakpoint-md', BREAKPOINTS.md);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <React.StrictMode>
      <AppProvider>
          <App />
      </AppProvider>
//  </React.StrictMode>
);
