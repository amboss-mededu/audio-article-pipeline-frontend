import {Button, FormFieldGroup, Inline, Select, Toggle} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import PromptSelect from "../../../Commons/PromptSelect";
import {OpenAiArticleInput} from "./OpenAiArticleInput";
import {OpenAiInputOptions} from "./OpenAiInputOptions";
import {useAppContext} from "../../../../context/AppContext";
import {usePlaygroundContext} from "../../../../context/PlaygroundContext";
import {OpenAiButtons} from "./OpenAiButtons";

export const OpenAiInput = ({ stream, setStream}) => {

    const { step } = usePlaygroundContext();

    return (
        <FormFieldGroup>
            <OpenAiArticleInput />

            { step > 0
                ?   <OpenAiInputOptions stream={stream} setStream={setStream} />
                :   null
            }
            <OpenAiButtons stream={stream} />
        </FormFieldGroup>
    )
}
