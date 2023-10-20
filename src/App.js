import React, {useEffect, useState} from 'react';
import {Box, Container, dark, light, ThemeProvider} from "@amboss/design-system";
import { useAppContext} from './context/AppContext';
import './styles/App.css';
import AudioRenderer from "./components/Pages/Episode/EpisodePage";
import {OpenAiProvider} from "./context/OpenAiContext";
import UploadEpisodeForm from "./components/Pages/Upload/UploadEpisode";
import Header from "./components/Header/Header";
import {Playground} from "./components/Pages/Playground/Playground";
import {PlaygroundProvider} from "./context/PlaygroundContext";
import {ElevenLabsProvider} from "./context/ElevenLabsContext";
import {StoreEpisodeProvider} from "./context/StoreEpisodeContext";
import StoreEpisode from "./components/Pages/StoreEpisode/StoreEpisode";

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
                    <ElevenLabsProvider>
                    <OpenAiProvider>
                        <Box className="App">
                            <Header />
                            {activeTab === 0 &&
                                <PlaygroundProvider>
                                    <Playground />
                                </PlaygroundProvider>
                            }
                            {activeTab === 1 &&
                                <StoreEpisodeProvider>
                                    <StoreEpisode />
                                </StoreEpisodeProvider>
                            }
                            {activeTab === 2 && <AudioRenderer />}
                        </Box>
                    </OpenAiProvider>
                    </ElevenLabsProvider>
                </div>
            </Container>
        </ThemeProvider>
  );
}

export default App;
