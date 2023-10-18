import React, {createContext, useContext, useEffect, useState} from 'react';
import useOpenAi from "../hooks/useOpenAi";
import {useAppContext} from "./AppContext";

const OpenAiContext = createContext();

export const OpenAiProvider = ({ children }) => {

    const [openAiInput, setOpenAiInput] = useState(''); // stores the input to openAi call
    const [openAiInputType, setOpenAiInputType] = useState("text")
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [promptId, setPromptId] = useState('1');
    const [prompts, setPrompts] = useState([])
    const [model, setModel] = useState('gpt-3.5-turbo');

    const models = [
        {label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo'},
        {label: 'GPT-3.5-16K', value: 'gpt-3.5-turbo-16k'},
        {label: 'GPT-4', value: 'gpt-4'}
    ]

    useEffect(() => {
        // Fetch prompts from backend
        fetch('/.well-known/prompts.json')
            .then(response => response.json())
            .then(data => {
                setPrompts(data.prompts)
            })
            .catch(error => {
                console.error('Error fetching prompts:', error);
                setPrompts([{id: '1', title: "Default"}])
            })
    }, [setPrompts]);


    const {
        loading: openAiLoading ,
        error: openAiError,
        openAiCallId,
        handleSubmit: handleOpenAiSubmit
    } = useOpenAi({promptId});

    return (
        <OpenAiContext.Provider
            value={{
                openAiLoading, openAiError, openAiCallId, handleOpenAiSubmit,
                openAiInput, setOpenAiInput,
                openAiInputType, setOpenAiInputType,
                selectedArticle, setSelectedArticle,
                promptId, setPromptId,
                prompts, setPrompts,
                model, setModel, models
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
