import {Box, Button, FormFieldGroup, Inline, LoadingSpinner, Stack, Text} from "@amboss/design-system";
import React, {useEffect} from "react";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import StoreEpisodeArtwork from "./StoreEpisodeArtwork";
import {ElevenLabsSubmit} from "../Playground/ElevenLabs/ElevenLabsSubmit";
import {ProgressController} from "../../../context/ProgressController";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {isValidArticle} from "../../../helpers/utils";
import useFullTTS from "../../../hooks/useFullTTS";

export const StoreEpisodeAudio = ({prevTab, nextTab}) => {

    const { selectedArticle, openAiCallId } = useOpenAiContext();
    const { elevenLabsInput, audioFilePath, elevenLabsLoading, elevenLabsError, handleElevenLabsSubmit } = useElevenLabsContext();

    const { imageStatus } = useStoreEpisodeContext();

    // Use useFullTTS
    const {
        loading: fullTTSLoading,
        handleSubmit: handleFullTTSSubmit,
        handleAbort: handleFullTTSAbort,
        result: fullTTSResult,
        error: fullTTSError
    } = useFullTTS();


    /*

    useEffect(() => {
        handleElevenLabsSubmit(null, elevenLabsInput, openAiCallId)
    },[elevenLabsInput])

     */

    // Cleanup function to handle abort
    useEffect(() => {
        return () => {
            handleFullTTSAbort();
        };
    }, []);

    useEffect(() => {
        console.log(fullTTSResult)
    }, [fullTTSResult])

    const ActionButton = () => {
        return (
            fullTTSLoading ? (
                <Button
                    name="cancel-request"
                    type={"button"}
                    destructive={true}
                    size={"m"}
                    variant={"primary"}
                    onClick={handleFullTTSAbort}
                    ariaAttributes={{
                        'aria-label': 'Cancel request'
                    }}
                >
                    Cancel request
                </Button>
            ) : (
                <Button
                    type={"button"}
                    variant={"primary"}
                    disabled={imageStatus !== "loaded" || !isValidArticle(selectedArticle) || ( fullTTSResult && fullTTSResult.success )}
                    onClick={(e) => handleFullTTSSubmit(e)}
                >
                    Store to Database
                </Button>
            )
        );
    };


    return (
        <Box>
            <Stack alignItems={"center"} space={"xl"}>
                <StoreEpisodeArtwork />
                {/* <ElevenLabsSubmit /> */}

                <div className={"elevenLabsWrapper"}>
                    {fullTTSLoading && (
                        <Stack>
                            <LoadingSpinner screenReaderText="Loading" />
                            <Box>
                                <ProgressController />
                            </Box>
                        </Stack>
                    )}

                    {fullTTSError && <Text>{fullTTSError}</Text>}

                    {audioFilePath && (
                        <Box alignText={"center"}>
                            <audio controls>
                                <source src={audioFilePath} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Box>
                    )}

                    {fullTTSResult && fullTTSResult.success && (
                        <Box alignText={"center"}>
                            <Text>Stored files successfully!</Text>
                        </Box>
                    )}
                </div>
                <Inline alignItems={"center"} space={"m"}>
                    <ActionButton />

                    <Button
                        name="previous-tab"
                        type={"button"}
                        size={"m"}
                        disabled={ fullTTSLoading}
                        variant={"secondary"}
                        onClick={prevTab}  // Handle abort here as well if needed
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
