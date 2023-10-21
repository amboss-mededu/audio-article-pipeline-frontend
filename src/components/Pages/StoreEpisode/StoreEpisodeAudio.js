import React from "react";

import {ElevenLabsInput} from "../Playground/ElevenLabs/ElevenLabsInput";
import {Button, FormFieldGroup, Inline} from "@amboss/design-system";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";

export const StoreEpisodeAudio = ({nextTab, prevTab}) => {

    const { selectedArticle } = useOpenAiContext();
    const { elevenLabsInput } = useElevenLabsContext();

    const elevenLabsPlaceholder = `Check the Playground tab to generate a script or write something yourself.`

    const CustomButtonGroup = () => {
        return (
            <FormFieldGroup><Inline>
                <Button
                    name="previous-tab"
                    type={"button"}
                    size={"m"}
                    variant={"secondary"}
                    onClick={prevTab}
                    ariaAttributes={{
                        'aria-label': 'Previous Tab'
                    }}
                >
                    Back
                </Button>
                <Button
                    name="next-tab"
                    type={"button"}
                    size={"m"}
                    disabled={!elevenLabsInput || !selectedArticle}
                    variant={"primary"}
                    onClick={nextTab}
                    ariaAttributes={{
                        'aria-label': 'Next Tab'
                    }}
                >
                    Next
                </Button>
            </Inline></FormFieldGroup>
        )
    }
    return (
        <>
            <FormFieldGroup>
                <ElevenLabsInput elevenLabsPlaceholder={elevenLabsPlaceholder} />
                <CustomButtonGroup />
            </FormFieldGroup>
        </>
    )
}
