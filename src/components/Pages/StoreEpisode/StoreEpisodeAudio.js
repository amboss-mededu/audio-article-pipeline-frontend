import {Box, Button, FormFieldGroup, Inline, LoadingSpinner, Stack, Text} from "@amboss/design-system";
import React, {useEffect} from "react";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import StoreEpisodeArtwork from "./StoreEpisodeArtwork";
import {ElevenLabsSubmit} from "../Playground/ElevenLabs/ElevenLabsSubmit";
import {ProgressController} from "../../../context/ProgressController";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {isValidArticle} from "../../../helpers/utils";

export const StoreEpisodeAudio = ({prevTab, nextTab}) => {

    const { selectedArticle, openAiCallId } = useOpenAiContext();
    const { elevenLabsInput, audioFilePath, elevenLabsLoading, elevenLabsError, handleElevenLabsSubmit } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    useEffect(() => {
        handleElevenLabsSubmit(null, elevenLabsInput, openAiCallId)
    },[elevenLabsInput])

    return (
        <Box>
            <Stack alignItems={"center"} space={"xl"}>
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

                    {elevenLabsError && <Text>{elevenLabsError}</Text>}

                    {audioFilePath && (
                        <Box alignText={"center"}>
                            <audio controls>
                                <source src={audioFilePath} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Box>
                    )}
                </div>
                <Inline alignItems={"center"} space={"m"}>
                    <Button
                        type={"button"}
                        variant={"primary"}
                        disabled={ !audioFilePath || imageStatus !== "loaded" || !isValidArticle(selectedArticle)}
                    >
                        Store to Database
                    </Button>
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
                </Inline>

            </Stack>
        </Box>

    )
}
