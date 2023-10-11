import React, {useState} from 'react';
import { TextSubmissionForm } from './components/TextSubmissionForm';
import {Box, dark, light, ThemeProvider} from "@amboss/design-system";
import { AppProvider } from './context/AppContext';
import HeaderNavigation from "./components/Header/Navigation";
import './styles/App.css';

function App() {
    const [theme, setTheme] = useState(false)

    const handleTabChange = (selectedIndex) => {
        // Handle tab change based on selectedIndex
        console.log(`Tab ${selectedIndex + 1} selected`);
    };

    return (
        <ThemeProvider theme={theme ? dark : light}>
            <AppProvider>
                <Box className="App">
                    <HeaderNavigation onTabChange={handleTabChange} />
                    <TextSubmissionForm />
                </Box>
            </AppProvider>
        </ThemeProvider>
  );
}

export default App;
