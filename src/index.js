import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {AppProvider, useAppContext} from "./context/AppContext";

import { BREAKPOINTS } from './helpers/constants';

document.documentElement.style.setProperty('--breakpoint-sm', BREAKPOINTS.sm);
document.documentElement.style.setProperty('--breakpoint-md', BREAKPOINTS.md);

const WrapperComponent = () => {
    const divRef = useRef(null);
    const boxRef = useRef(null);

    return (
        <AppProvider divRef={divRef} boxRef={boxRef}>
            <App divRef={divRef} boxRef={boxRef} />
        </AppProvider>
    )
};


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
//  <React.StrictMode>
    <WrapperComponent />
//  </React.StrictMode>
);
