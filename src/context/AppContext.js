import React, {createContext, useState, useContext, useEffect} from 'react';

// Create the context
const AppContext = createContext();

const AppProvider = ({ children, divRef, boxRef }) => {
    // Deployed:
    const [activeTab, setActiveTab] = useState(0); // default to the first tab
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [divRefHeight, setDivRefHeight] = useState(0);
    const [boxRefWidth, setBoxRefWidth] = useState(0);

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
        console.log(boxRef, divRef, document.body.scrollHeight, window.innerHeight )
        const handleResize = () => {
            // Logic for innerHeight and innerWidth
            setInnerWidth(window.innerWidth);
            setInnerHeight(document.body.scrollHeight);  // directly set to current scrollHeight

            // Logic for divRefHeight and boxRefWidth
            if (divRef && divRef.current) {
                const childNodeHeight = divRef.current.childNodes[1]?.offsetHeight + 80 || 0;
                const maxHeight = Math.max(childNodeHeight, window.innerHeight);

                console.log(divRef.current.childNodes[0]);
                setDivRefHeight(maxHeight);  // directly set to current childNodeHeight
            }

            if (boxRef && boxRef.current) {
                setBoxRefWidth(boxRef.current.offsetWidth);
            }
        };

        // Initial call
        handleResize();

        // Setup event listener for window resize
        window.addEventListener('resize', handleResize);

        // Setup MutationObserver
        const observer = new MutationObserver(handleResize);
        if (boxRef && boxRef.current) {
            observer.observe(boxRef.current, { attributes: true, childList: true, subtree: true });
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [divRef, boxRef]);



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
                divRef, boxRef,
                boxRefWidth, divRefHeight,

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
