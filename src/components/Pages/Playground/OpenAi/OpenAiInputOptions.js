import PromptSelect from "../../../Commons/PromptSelect";
import {FormFieldGroup, Inline, Select, Toggle} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const OpenAiInputOptions = ({ stream, setStream}) => {

    const { model, setModel, models: options } = useOpenAiContext();

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
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
                options={options}
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
    )
}
