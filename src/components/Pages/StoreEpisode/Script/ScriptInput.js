import React from "react";

import {ElevenLabsInput} from "../../Playground/ElevenLabs/ElevenLabsInput";
import {Button, Column, Columns, FormFieldGroup, Inline} from "@amboss/design-system";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {isValidArticle} from "../../../../helpers/utils";
import {useAppContext} from "../../../../context/AppContext";

export const ScriptInput = ({nextTab, prevTab}) => {

    const { elevenLabsInput, setElevenLabsInput } = useElevenLabsContext();
    const { isDarkMode } = useAppContext()

    const { openAiLoading, promptId, handleOpenAiAbort, handleOpenAiSubmit, selectedArticle, model } = useOpenAiContext();
    const stream = true;
    const openAiInputType = "xid";

    const buttonIsDisabled = () => {
        return openAiLoading || !openAiInputType || !promptId
    }

    const elevenLabsPlaceholder = `Check the Playground tab to generate a script or write something yourself.`


    const CustomOpenAiButtonGroup = () => {
        return (
            <Inline alignItems={["right","left","left"]}>
                {openAiLoading
                    ? (
                        <Button
                            variant="tertiary"
                            destructive={true}
                            onClick={handleOpenAiAbort}
                        >
                            Cancel Request
                        </Button>
                    )
                    : (
                        <Button
                            onClick={(e) => {
                                handleOpenAiSubmit({
                                    e,
                                    openAiInput: ( isValidArticle(selectedArticle) ) && selectedArticle.xid,
                                    openAiInputType: "xid",
                                    model: "gpt-3.5-turbo-16k",
                                    stream: true
                                })
                            }}
                            variant="secondary"
                            loading={openAiLoading}
                            disabled={buttonIsDisabled()}
                            leftIcon={"zap"}
                        >
                            Generate Script w/ GPT
                        </Button>
                    )
                }
            </Inline>
        )
    }


    const CustomBottomButtonGroup = () => {
        return (
            <FormFieldGroup>
                <Inline space={["m", "xxl","xxl"]} alignItems={["spaceBetween"]}>
                    <Inline alignItems={"left"}>
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
                            disabled={!elevenLabsInput || !isValidArticle(selectedArticle)}
                            variant={"primary"}
                            onClick={nextTab}
                            ariaAttributes={{
                                'aria-label': 'Next Tab'
                            }}
                        >
                            Next
                        </Button>
                    </Inline>

                    <Inline alignItems={"right"}>
                        <Button variant={"tertiary"} destructive={true} disabled={!elevenLabsInput || openAiLoading} onClick={() => setElevenLabsInput("")} >
                            Clear Input
                        </Button>
                    </Inline>
                </Inline>

            </FormFieldGroup>
        )
    }

    return (
        <>
            <FormFieldGroup>
                { false && elevenLabsInput && <CustomOpenAiButtonGroup /> }

                <div className={"store-episode__article"}>
                    <div className={`store-episode__article-button ${ isDarkMode ? "store-episode__article-button--dark" : "store-episode__article-button--light"}`}>
                        {  openAiLoading
                            ? (
                                <Button
                                    variant="tertiary"
                                    destructive={true}
                                    onClick={handleOpenAiAbort}
                                >
                                    Cancel Request
                                </Button>
                            )
                            : (
                                <Button
                                    onClick={(e) => {
                                        handleOpenAiSubmit({
                                            e,
                                            openAiInput: ( isValidArticle(selectedArticle) ) && selectedArticle.xid,
                                            openAiInputType: "xid",
                                            model: "gpt-3.5-turbo-16k",
                                            stream: true
                                        })
                                    }}
                                    variant="tertiary"
                                    loading={openAiLoading}
                                    disabled={buttonIsDisabled()}
                                    leftIcon={"zap"}
                                >
                                    {!elevenLabsInput || !elevenLabsInput.length ? "Generate script with OpenAI" : "Regenerate"}
                                </Button>
                            )
                        }
                    </div>
                    <ElevenLabsInput elevenLabsPlaceholder={""} />
                </div>

                <CustomBottomButtonGroup />
            </FormFieldGroup>
        </>
    )
}
