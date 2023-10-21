import {Box, Button, FormFieldGroup, Inline, LoadingSpinner, Stack, Text} from "@amboss/design-system";
import React, {useEffect} from "react";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import StoreEpisodeArtwork from "./StoreEpisodeArtwork";
import {ElevenLabsSubmit} from "../Playground/ElevenLabs/ElevenLabsSubmit";
import {ProgressController} from "../../../context/ProgressController";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";

export const StoreEpisodeAudio = ({prevTab, nextTab}) => {

    const { selectedArticle, openAiCallId } = useOpenAiContext();
    const { elevenLabsInput, audioFilePath, elevenLabsLoading, elevenLabsError, handleElevenLabsSubmit } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

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
            </Inline></FormFieldGroup>
        )
    }

    useEffect(() => {
        handleElevenLabsSubmit(null, elevenLabsInput, openAiCallId)
    },[elevenLabsInput])

    return (
        <Box>
            <Stack alignItems={"center"} space={"xl"}>
                <CustomButtonGroup />
                <StoreEpisodeArtwork />
                {/* <ElevenLabsSubmit /> */}

                <div className={"elevenLabsWrapper"}>
                    {elevenLabsLoading && (
                        <Stack>
                            <LoadingSpinner screenReaderText="Loading" />
                            <Box>
                                <ProgressController />
                            </Box>
                        </Stack>
                    )}

                    {elevenLabsError && <div>{elevenLabsError}</div>}

                    {audioFilePath && (
                        <Box alignText={"center"}>
                            <audio controls>
                                <source src={audioFilePath} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Box>
                    )}
                </div>
                <Button
                    type={"button"}
                    variant={"primary"}
                    disabled={ !audioFilePath || imageStatus !== "loaded" || !selectedArticle}
                >
                    Store to Database
                </Button>

            </Stack>
        </Box>

    )
}
