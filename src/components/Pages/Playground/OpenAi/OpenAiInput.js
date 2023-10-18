import {Button, FormFieldGroup, Inline, Select, Toggle} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import PromptSelect from "../../../Commons/PromptSelect";
import {OpenAiArticleInput} from "./OpenAiArticleInput";
import {OpenAiInputOptions} from "./OpenAiInputOptions";
import {useAppContext} from "../../../../context/AppContext";
import {usePlaygroundContext} from "../../../../context/PlaygroundContext";

export const OpenAiInput = ({ stream, setStream}) => {

    const { openAiLoading, openAiInput, openAiInputType, promptId } = useOpenAiContext();
    const { step, setStep } = usePlaygroundContext();

    const buttonIsDisabled = () => {
        return openAiLoading || !openAiInputType || !promptId || step < 1
    }

    return (
        <FormFieldGroup label="Input" labelHint="Supports plain text">
            <OpenAiArticleInput />

            { step > 0
                ?   <OpenAiInputOptions stream={stream} setStream={setStream} />
                :   null
            }

            <Button
                type="submit"
                variant="primary"
                loading={openAiLoading}
                disabled={buttonIsDisabled()}
            >
                Send to OpenAI
            </Button>
        </FormFieldGroup>
    )
}
