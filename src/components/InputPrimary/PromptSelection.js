import React, { useEffect, useState } from 'react';

const PromptSelect = ({ onChange }) => {
    const [prompts, setPrompts] = useState([]);
    const [selectedPromptId, setSelectedPromptId] = useState("");

    useEffect(() => {
        // Fetch prompts from backend
        fetch('/well-known/prompts.json')
            .then(response => response.json())
            .then(data => setPrompts(data.prompts))
            .catch(error => {
                console.error('Error fetching prompts:', error)
            })
            .finally((data) => {
                if (!data || !data.prompts) setPrompts({id: "1", title: "Default"})
            })
    }, []);

    const handleChange = (event) => {
        setSelectedPromptId(event.target.value);
        onChange(event.target.value);
    };

    return (
        <select
            value={selectedPromptId}
            onChange={handleChange}
            placeholder="Select a prompt"
        >
            <option value="" disabled>Select a prompt</option>
            {prompts.map((prompt) => (
                <option key={prompt.id} value={prompt.id}>
                    {prompt.title}
                </option>
            ))}
        </select>
    );
};
export default PromptSelect;
