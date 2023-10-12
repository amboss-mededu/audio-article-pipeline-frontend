import React, {useState} from 'react';
import { InputPage } from './components/Pages/Input/InputPage';
import {Box, dark, light, ThemeProvider} from "@amboss/design-system";
import {AppProvider, useAppContext} from './context/AppContext';
import HeaderNavigation from "./components/Header/Navigation";
import './styles/App.css';

function App() {
    const [theme, setTheme] = useState(false)
    const { activeTab } = useAppContext();

    const handleTabChange = (selectedIndex) => {
        // Handle tab change based on selectedIndex
        console.log(`Tab ${selectedIndex + 1} selected`);
    };

    return (
        <ThemeProvider theme={theme ? dark : light}>
                <Box className="App">
                    <HeaderNavigation onTabChange={handleTabChange} />
                    {activeTab === 0 && <InputPage />}

                </Box>
        </ThemeProvider>
  );
}

export default App;
