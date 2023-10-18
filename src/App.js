import React, {useEffect, useState} from 'react';
import { InputPage } from './components/Pages/Input/InputPage';
import {Box, Container, dark, light, ThemeProvider} from "@amboss/design-system";
import { useAppContext} from './context/AppContext';
import HeaderNavigation from "./components/Header/Navigation";
import './styles/App.css';
import AudioRenderer from "./components/Pages/Episode/EpisodePage";
import {OpenAiProvider} from "./context/OpenAiContext";
import {PrimaryInputProvider} from "./context/PrimaryInputContext";
import CreateEpisodeForm from "./components/Pages/Upload/CreateEpisodeForm";
import UploadEpisodeForm from "./components/Pages/Upload/UploadEpisode";
import Header from "./components/Header/Header";

function App() {
    const { activeTab } = useAppContext();
    const [isNightTime, setNightTime] = useState(false)

    useEffect(() => {
        const currentTime = new Date().getHours();
        setNightTime(currentTime >= 19 || currentTime <= 6);
    }, []);

    return (
        <ThemeProvider theme={isNightTime ? dark : light}>
            <Container>
                <div style={{height: "100vh"}}>
                <PrimaryInputProvider>
                    <OpenAiProvider>
                        <Box className="App">
                            <Header />
                            {activeTab === 0 && <InputPage />}
                            {activeTab === 1 && <UploadEpisodeForm />}
                            {activeTab === 2 && <AudioRenderer />}
                        </Box>
                    </OpenAiProvider>
                </PrimaryInputProvider>
                </div>
            </Container>
        </ThemeProvider>
  );
}

export default App;
