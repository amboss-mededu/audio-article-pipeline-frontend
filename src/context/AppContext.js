import React, {createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

const AppProvider = ({ children }) => {
    // Deployed:
    const [activeTab, setActiveTab] = useState(0); // default to the first tab
    const [elevenLabsInput, setElevenLabsInput] = useState(null); // Umbrella state for the elevenlabs input
    const [openAiInput, setOpenAiInput] = useState(''); // stores the input to openAi call
    const [selectedArticle, setSelectedArticle] = useState(null);


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
                elevenLabsInput, setElevenLabsInput,
                openAiInput, setOpenAiInput,
                selectedArticle, setSelectedArticle,

                // not deployed (yet)
                resultScript,
                setResultScript,
                audioFilePath,
                setAudioFilePath,
                loading,
                setLoading,
                error,
                setError,
                progress,
                setProgress,
                canProceedToElevenLabs,
                setCanProceedToElevenLabs,
                openAiCallId,
                setOpenAiCallId
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
