import React, {useEffect, useRef, useState} from 'react';
import {Box, Container, dark, light, ThemeProvider} from "@amboss/design-system";
import {AppProvider, useAppContext} from './context/AppContext';
import './styles/App.css';
import {OpenAiProvider} from "./context/OpenAiContext";
import Header from "./components/Header/Header";
import {Playground} from "./components/Pages/Playground/Playground";
import {PlaygroundProvider} from "./context/PlaygroundContext";
import {ElevenLabsProvider} from "./context/ElevenLabsContext";
import {StoreEpisodeProvider} from "./context/StoreEpisodeContext";
import StoreEpisode from "./components/Pages/StoreEpisode/StoreEpisode";
import Inventory from "./components/Pages/Inventory/Inventory";
import {InventoryProvider} from "./context/InventoryContext";

function App({boxRef, divRef}) {
    const { activeTab, isDarkMode, setIsDarkMode, innerHeight, maxWidth } = useAppContext();

    return (
        <ThemeProvider theme={isDarkMode ? dark : light}>
            <Container borderRadius={0}>
                <div ref={divRef} style={{ height: innerHeight, borderRadius: 0 }}>
                    <ElevenLabsProvider>
                    <OpenAiProvider>
                    <InventoryProvider>
                    <StoreEpisodeProvider>
                            <Header />
                        <div ref={boxRef} style={{maxWidth: maxWidth, margin: "0 auto"}}>
                            <Box tSpace={"zero"} className="App">
                                {activeTab === 0 &&
                                    <PlaygroundProvider>
                                        <Playground />
                                    </PlaygroundProvider>
                                }
                                {activeTab === 1 &&
                                    <>
                                        <StoreEpisode />
                                    </>
                                }
                                {activeTab === 2 &&
                                    <>
                                        <Inventory />
                                    </>
                                }
                            </Box>
                        </div>
                    </StoreEpisodeProvider>
                    </InventoryProvider>
                    </OpenAiProvider>
                    </ElevenLabsProvider>
                </div>
            </Container>
        </ThemeProvider>
  );
}

export default App;
