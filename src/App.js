import React, {useEffect, useRef, useState} from 'react';
import {Box, Container, dark, light, ThemeProvider} from "@amboss/design-system";
import { useAppContext} from './context/AppContext';
import './styles/App.css';
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
    const divRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('100vh');

    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight;
            const parentHeight = divRef.current ? divRef.current.parentElement.offsetHeight : 0;
            setMaxHeight(`${Math.max(vh, parentHeight)}px`);
        };

        handleResize(); // Call it once to set initial state

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const currentTime = new Date().getHours();
        setNightTime(currentTime >= 19 || currentTime <= 6);
    }, []);

    return (
        <ThemeProvider theme={isNightTime ? dark : light}>
            <Container borderRadius={0}>
                <div ref={divRef} style={{ height: maxHeight, borderRadius: 0 }}>
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
                            {activeTab === 2 && <>{"Hello World"}</>}
                        </Box>
                    </OpenAiProvider>
                    </ElevenLabsProvider>
                </div>
            </Container>
        </ThemeProvider>
  );
}

export default App;
