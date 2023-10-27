import {Button, Inline} from "@amboss/design-system";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {usePlaygroundContext} from "../../../../context/PlaygroundContext";
import {isValidArticle} from "../../../../helpers/utils";

export const OpenAiButtons = ({stream}) => {

    const { openAiLoading, openAiInputType, promptId, handleOpenAiAbort, handleOpenAiSubmit, selectedArticle, openAiInput, model } = useOpenAiContext();
    const { step, setStep } = usePlaygroundContext();

    const buttonIsDisabled = () => {
        return openAiLoading || !openAiInputType || !promptId || step < 1
    }

    return (
        <Inline>
            <>
                {openAiLoading
                    ? (
                        <Button
                            variant="primary"
                            destructive={true}
                            onClick={handleOpenAiAbort}
                        >
                            Cancel Request
                        </Button>
                    )
                    : (
                        <Button
                            onClick={(e) => {
                                setStep(2);
                                handleOpenAiSubmit({
                                    e,
                                    openAiInput: (openAiInputType === 'xid' && isValidArticle(selectedArticle) ) ? selectedArticle.xid : openAiInput,
                                    openAiInputType, model, stream
                                })
                            }}
                            variant="primary"
                            loading={openAiLoading}
                            disabled={buttonIsDisabled()}
                            leftIcon={"zap"}
                        >
                            Generate Script w/ GPT
                        </Button>
                    )
                }
            </>
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
