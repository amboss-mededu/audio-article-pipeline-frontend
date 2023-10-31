import {Box, Button, FormFieldGroup, Inline, LoadingSpinner, Stack, Text} from "@amboss/design-system";
import React, {useEffect} from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import { Artwork } from "./Artwork";
import { ProgressController } from "../../../Commons/ProgressController";
import {useStoreEpisodeContext} from "../../../../context/StoreEpisodeContext";
import {isValidArticle} from "../../../../helpers/utils";
import useFullTTS from "../../../../hooks/useFullTTS";
import {SuccessCard} from "./SuccessCard";
import {useAppContext} from "../../../../context/AppContext";
import VoiceSelect from "./VoiceSelect";

export const Audio = ({prevTab, nextTab, setActiveTab}) => {

    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath, elevenLabsInput } = useElevenLabsContext();

    const { imageStatus, selectedVoices } = useStoreEpisodeContext();

    const {boxRefWidth } = useAppContext()

    // Use useFullTTS
    const {
        loading: fullTTSLoading,
        handleSubmit: handleFullTTSSubmit,
        handleAbort: handleFullTTSAbort,
        result: fullTTSResult,
        error: fullTTSError
    } = useFullTTS();

    // Cleanup function to handle abort
    useEffect(() => {
        return () => {
            handleFullTTSAbort();
        };
    }, []);

    useEffect(() => {
        // console.log(fullTTSResult)
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
                    disabled={imageStatus !== "loaded" || !isValidArticle(selectedArticle) || !selectedVoices.length|| ( fullTTSResult && fullTTSResult.success )}
                    onClick={(e) => handleFullTTSSubmit(e, setActiveTab)}
                >
                    Store to Database
                </Button>
            )
        );
    };


    return (
        <Box>
            <Stack alignItems={"center"} space={"xl"}>
                <div className={"elevenLabsWrapper"} style={{width: "600px", maxWidth: 0.8*boxRefWidth}}>
                    <Box space={"m"} tSpace={"zero"}>
                        <Artwork />
                    </Box>
                    {/* <ElevenLabsSubmit /> */}

                    {fullTTSLoading && (
                        <Stack space={["l","l","xl"]}>
                            <LoadingSpinner screenReaderText="Loading" />
                            <ProgressController inputLength={elevenLabsInput.length} />
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

                    {fullTTSResult && fullTTSResult.success && fullTTSResult.data && (
                        <Box alignText={"center"}>
                            <SuccessCard episodes={fullTTSResult.data.createdEpisodes} />
                        </Box>
                    )}
                </div>
                { !fullTTSResult && !fullTTSLoading && <VoiceSelect /> }
                <Inline alignItems={"center"} space={"m"}>
                    <ActionButton />

                    <Button
                        name="previous-tab"
                        type={"button"}
                        size={"m"}
                        disabled={ fullTTSLoading}
                        variant={"secondary"}
                        onClick={() => setActiveTab(1)}
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
