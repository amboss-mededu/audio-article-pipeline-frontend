import {Button, Checkbox, FormFieldGroup, Inline, Select, Toggle} from "@amboss/design-system";
import {PrimaryInputField} from "./PrimaryInputField";
import PromptSelect from "./PromptSelection";
import React, {useState} from "react";
import {useOpenAiContext} from "../../context/OpenAiContext";

export const PrimaryInputForm = () => {
    console.log("PrimaryInputForm mounted")

    const { openAiInput, openAiInputType, loading, handleSubmit, selectedArticle, model, setModel } = useOpenAiContext();

    const [stream, setStream] = useState(false)

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, openAiInputType === 'xid' ? selectedArticle : openAiInput, openAiInputType, model, stream)}>
            <FormFieldGroup label="Input" labelHint="Supports plain text">
                <PrimaryInputField />

                <Inline
                    space={"xl"}
                    alignItems={"left"}
                    vAlignItems={"center"}
                >
                    <PromptSelect />
                    <Select
                        label="Model Selection"
                        value={model}
                        onChange={handleModelChange}
                        options={[
                            {label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo'},
                            {label: 'GPT-3.5-16K', value: 'gpt-3.5-turbo-16k'},
                            {label: 'GPT-4', value: 'gpt-4'}
                        ]}
                    />
                    <FormFieldGroup className={"formgroup__open-ai-stream--toggle"} label="Live typing">
                        <div className={"test123"}><Toggle
                            className={"toggle__open-ai-stream"}
                            alignItems="right"
                            label={stream ? "On" : "Off"}
                            name="stream-openai"
                            onBlur={function noRefCheck(){}}
                            onChange={(e) => setStream(e.target && e.target.checked)}
                            onClick={function noRefCheck(){}}
                            onFocus={function noRefCheck(){}}
                            size="m"
                            value="stream-openai"
                        /></div>
                    </FormFieldGroup>
                </Inline>

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                >
                    Send to OpenAI
                </Button>
            </FormFieldGroup>
        </form>
    )
}
