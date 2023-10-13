import React, { useEffect, useState } from 'react';
import { Select } from "@amboss/design-system";
import {useAppContext} from "../../context/AppContext";

const PromptSelect = ({ onChange }) => {
    const [prompts, setPrompts] = useState([]);

    const { promptId, setPromptId } = useAppContext();

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

    const handleChange = (event) => {
        setPromptId(event.target.value);
    };

    const selectOptions = prompts.map(prompt => ({
        label: prompt.title,
        value: prompt.id
    }));

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
