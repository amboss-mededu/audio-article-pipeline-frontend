import React, {createContext, useState, useContext, useEffect} from 'react';
import {useOpenAiContext} from "./OpenAiContext";

// Create the context
const PlaygroundContext = createContext();

const PlaygroundProvider = ({ children }) => {

    // Step 1: Choose input mode (Markdown or Article) & Enter some input (text or topic)
    // Step 3: Generate the speaker script.
    // Step 4: Edit the generated text, if necessary.
    // Step 5: Send the script to ElevenLabs.
    const [ step, setStep ] = useState(0)

    const { openAiInputType, openAiInput, selectedArticle } = useOpenAiContext()

    useEffect(() => {
        console.log(step)
        if (step >= 2) return ;
        else if ( (openAiInputType === "text" && !openAiInput.length) || (openAiInputType === "xid" && !selectedArticle)) {
            setStep(0)
        }
        else if ((openAiInputType === "text" && openAiInput.length > 0) || (openAiInputType === "xid" && selectedArticle)) {
            setStep(1)
        }
    }, [step, setStep, openAiInputType, openAiInput, selectedArticle])

    return (
        <PlaygroundContext.Provider
            value={{
                step, setStep,
            }}
        >
            {children}
        </PlaygroundContext.Provider>
    );
};

const usePlaygroundContext = () => {
    const context = useContext(PlaygroundContext);
    if (context === undefined) {
        throw new Error('usePlaygroundContext must be used within an PlaygroundProvider');
    }
    return context;
};

export { PlaygroundProvider, usePlaygroundContext };
