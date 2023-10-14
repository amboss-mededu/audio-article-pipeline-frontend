import React, {createContext, useContext, useState} from 'react';
import useOpenAiSubmission from '../hooks/useOpenAiSubmission';

const OpenAiContext = createContext();

export const OpenAiProvider = ({ children }) => {
    const [openAiInputType, setOpenAiInputType] = useState("text")

    const {
        loading,
        error,
        openAiCallId,
        handleSubmit
    } = useOpenAiSubmission();

    return (
        <OpenAiContext.Provider
            value={{loading, error, openAiCallId, handleSubmit, openAiInputType, setOpenAiInputType}}
        >
            {children}
        </OpenAiContext.Provider>
    );
};

export const useOpenAi = () => {
    const context = useContext(OpenAiContext);
    if (!context) {
        throw new Error('useOpenAi must be used within an OpenAiProvider');
    }
    return context;
};
