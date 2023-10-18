import React, {createContext, useContext, useState} from 'react';
import useElevenLabs from "../hooks/useElevenLabs";

const ElevenLabsContext = createContext();

export const ElevenLabsProvider = ({ children }) => {

    const [elevenLabsInput, setElevenLabsInput] = useState([]); // Umbrella state for the elevenlabs input

    const {
        loading: elevenLabsLoading,
        audioFilePath,
        error: elevenLabsError,
        handleSubmit: handleElevenLabsSubmit
    } = useElevenLabs();

    return (
        <ElevenLabsContext.Provider value={{
            elevenLabsLoading, elevenLabsError, audioFilePath, handleElevenLabsSubmit,
            elevenLabsInput, setElevenLabsInput
        }}>
            {children}
        </ElevenLabsContext.Provider>
    );

};

export const useElevenLabsContext = () => {
    const context = useContext(ElevenLabsContext);
    if (!context) {
        throw new Error('useElevenLabs must be used within an ElevenLabsProvider');
    }
    return context;
};
