import React, {useEffect, useState} from 'react';
import { Select } from "@amboss/design-system";
import {useOpenAiContext} from "../../context/OpenAiContext";

const PromptSelect = () => {
    console.log("PromptSelect mounted")
    const [ prompts, setPrompts ] = useState([]);
    const { promptId, setPromptId } = useOpenAiContext();

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

    const handleChange = (e) => {
        console.log("Clicked: ", e.target.value)
        setPromptId(e.target.value);
    };

    const selectOptions = prompts.map(prompt => {
        return ({
            label: prompt.title,
            value: prompt.id
        })
    });


    return (
        <Select
            name="promptSelect"
            value={promptId}
            placeholder="Select a prompt"
            options={selectOptions}
            onChange={handleChange}
            label="Prompt Selection"
            labelHint="Choose a prompt for your input"
            emptyStateMessage="No prompts available"
        />
    );
};

export default PromptSelect;
