import React, {useEffect, useState} from 'react';
import { InputPage } from './components/Pages/Input/InputPage';
import {Box, dark, light, ThemeProvider} from "@amboss/design-system";
import { useAppContext} from './context/AppContext';
import HeaderNavigation from "./components/Header/Navigation";
import './styles/App.css';
import AudioRenderer from "./components/Pages/Episode/EpisodePage";
import {OpenAiProvider} from "./context/OpenAiContext";
import {PrimaryInputProvider} from "./context/PrimaryInputContext";

function App() {
    const { activeTab } = useAppContext();
    const [isNightTime, setNightTime] = useState(false)

    const handleTabChange = (selectedIndex) => {
        // Handle tab change based on selectedIndex
        console.log(`Tab ${selectedIndex + 1} selected`);
    };

    useEffect(() => {
        const currentTime = new Date().getHours();
        setNightTime(currentTime >= 19 || currentTime <= 6);
    }, []);

    return (
        <ThemeProvider theme={isNightTime ? dark : light}>
            <PrimaryInputProvider>
                <OpenAiProvider>
                    <Box className="App">
                        <HeaderNavigation onTabChange={handleTabChange} />
                        {activeTab === 0 && <InputPage />}
                        {activeTab === 2 && <AudioRenderer />}
                    </Box>
                </OpenAiProvider>
            </PrimaryInputProvider>
        </ThemeProvider>
  );
}

export default App;
