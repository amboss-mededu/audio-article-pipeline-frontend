import {Button, Inline} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {usePlaygroundContext} from "../../../../context/PlaygroundContext";

export const OpenAiButtons = () => {

    const { openAiLoading, openAiInputType, promptId } = useOpenAiContext();
    const { step, setStep } = usePlaygroundContext();

    const buttonIsDisabled = () => {
        return openAiLoading || !openAiInputType || !promptId || step < 1
    }

    return (
        <Inline>
            <Button
                type="submit"
                variant="primary"
                loading={openAiLoading}
                disabled={buttonIsDisabled()}
            >
                Send to OpenAI
            </Button>
            <>
                {step < 2
                    ? (
                        <Button
                            onClick={() => setStep(2)}
                            variant="secondary"
                        >
                            Skip to ElevenLabs
                        </Button>
                    )
                    : (
                        <Button
                            onClick={() => setStep(1)}
                            variant="secondary"
                        >
                            Hide ElevenLabs
                        </Button>
                    )
                }
            </>
        </Inline>

    )
}
