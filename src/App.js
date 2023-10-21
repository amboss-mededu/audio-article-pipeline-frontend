import React, {useEffect, useRef, useState} from 'react';
import {Box, Container, dark, light, ThemeProvider} from "@amboss/design-system";
import { useAppContext} from './context/AppContext';
import './styles/App.css';
import {OpenAiProvider} from "./context/OpenAiContext";
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
    const boxRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('100vh');

    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight;
            const parentHeight = divRef.current ? divRef.current.childNodes[0].offsetHeight : 0;
            setMaxHeight(`${Math.max(vh, parentHeight)}px`);
            console.log(parentHeight)
        };

        // Initial call
        handleResize();

        // Setup event listener for window resize
        window.addEventListener('resize', handleResize);

        // Setup MutationObserver
        const observer = new MutationObserver(handleResize);
        if (boxRef.current) {
            observer.observe(boxRef.current, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
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
                        <div ref={boxRef}><Box className="App">
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
                        </Box></div>
                    </OpenAiProvider>
                    </ElevenLabsProvider>
                </div>
            </Container>
        </ThemeProvider>
  );
}

export default App;
