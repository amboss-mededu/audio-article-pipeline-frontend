import React, {createContext, useContext, useEffect, useState} from 'react';
import useOpenAiSubmission from '../hooks/useOpenAiSubmission';

const OpenAiContext = createContext();

export const OpenAiProvider = ({ children }) => {
    const [openAiInputType, setOpenAiInputType] = useState("text");
    const [prompts, setPrompts] = useState([]);
    const [promptId, setPromptId] = useState(1);

    useEffect(() => {
        // Fetch prompts from backend
        fetch('/.well-known/prompts.json')
            .then(response => response.json())
            .then(data => {
                setPrompts(data.prompts)
            })
            .catch(error => {
                console.error('Error fetching prompts:', error);
                setPrompts([{id: 1, title: "Default"}])
            })
    }, []);

    const {
        loading,
        error,
        openAiCallId,
        handleSubmit
    } = useOpenAiSubmission();

    return (
        <OpenAiContext.Provider
            value={{
                loading, error, openAiCallId, handleSubmit,
                promptId, setPromptId,
                prompts,
                openAiInputType, setOpenAiInputType
        }}
        >
            {children}
        </OpenAiContext.Provider>
    );
};

export const useOpenAiContext = () => {
    const context = useContext(OpenAiContext);
    if (!context) {
        throw new Error('useOpenAi must be used within an OpenAiProvider');
    }
    return context;
};
