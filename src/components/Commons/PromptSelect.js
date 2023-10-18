import React from 'react';
import { Select } from "@amboss/design-system";
import {usePrimaryInputContext} from "../../context/PrimaryInputContext";
import {useOpenAiContext} from "../../context/OpenAiContext";

const PromptSelect = () => {

    const { prompts, promptId, setPromptId } = useOpenAiContext();

    const handlePromptChange = (e) => {
        console.log("Clicked: ", e.target.value)
        setPromptId(e.target.value);
    };

    const selectOptions = prompts.map(prompt => {
        return ({
            label: prompt.title,
            value: prompt.id
        })
    })

    return (
        <Select
            name="promptSelect"
            value={promptId}
            placeholder="Select a prompt"
            options={selectOptions}
            onChange={handlePromptChange}
            label="Prompt Selection"
            labelHint="Choose a prompt for your input"
            emptyStateMessage="No prompts available"
        />
    );
};

export default PromptSelect;
