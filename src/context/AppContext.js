import React, {createContext, useState, useContext, useEffect} from 'react';

// Create the context
const AppContext = createContext();

const AppProvider = ({ children }) => {
    // Deployed:
    const [activeTab, setActiveTab] = useState(0); // default to the first tab
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    const maxWidth = "960px"

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setIsDarkMode(mediaQuery.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Not yet reviewed
    const [resultScript, setResultScript] = useState(null);
    const [audioFilePath, setAudioFilePath] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [canProceedToElevenLabs, setCanProceedToElevenLabs] = useState(false);
    const [openAiCallId, setOpenAiCallId] = useState(null);

    return (
        <AppContext.Provider
            value={{
                activeTab, setActiveTab,
                isDarkMode, setIsDarkMode,
                innerWidth, innerHeight, maxWidth,

                // not deployed (yet)
                resultScript, setResultScript,
                audioFilePath, setAudioFilePath,
                loading, setLoading,
                error, setError,
                progress, setProgress,
                canProceedToElevenLabs, setCanProceedToElevenLabs,
                openAiCallId, setOpenAiCallId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext and ensure it's used within an AppProvider
const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext };
