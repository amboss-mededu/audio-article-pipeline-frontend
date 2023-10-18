import PromptSelect from "../../../Commons/PromptSelect";
import {FormFieldGroup, Inline, Select, Toggle} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const OpenAiInputOptions = ({ stream, setStream}) => {

    const { model, setModel, models: options, openAiLoading } = useOpenAiContext();

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
        <Inline
            space={"xl"}
            alignItems={"left"}
            vAlignItems={"center"}
        >
            <PromptSelect disabled={openAiLoading} />
            <Select
                label="Model Selection"
                value={model}
                onChange={handleModelChange}
                options={options}
                disabled={openAiLoading}
            />
            <FormFieldGroup className={"formgroup__open-ai-stream--toggle"} label="Live typing">
                <Toggle
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
                    disabled={openAiLoading}
                />
            </FormFieldGroup>
        </Inline>
    )
}
