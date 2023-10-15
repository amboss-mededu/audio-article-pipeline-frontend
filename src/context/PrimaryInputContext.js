import React, {createContext, useState, useContext, useEffect} from 'react';

// Create the context
const PrimaryInputContext = createContext();

const PrimaryInputProvider = ({ children }) => {
    const [promptId, setPromptId] = useState(1);
    const [prompts, setPrompts] = useState([])

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
    }, [setPrompts]);

    return (
        <PrimaryInputContext.Provider
            value={{
                promptId, setPromptId,
                prompts, setPrompts,
            }}
        >
            { children }
        </PrimaryInputContext.Provider>
    )
}

const usePrimaryInputContext = () => {
    const context = useContext(PrimaryInputContext);
    if (context === undefined) {
        throw new Error('usePrimaryInputContext must be used within PrimaryInputProvider')
    }
    return context;
}

export { PrimaryInputProvider, usePrimaryInputContext };
