import React, { useEffect, useState } from 'react';
import { Select } from "@amboss/design-system";
import {useAppContext} from "../../context/AppContext";

const PromptSelect = () => {
    console.log("PromptSelect mounted")
    const { prompts } = useAppContext();
    const { promptId, setPromptId } = useAppContext();

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
