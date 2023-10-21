import {Box, Divider, LoadingSpinner, Stack} from "@amboss/design-system";
import {ProgressController} from "../../../context/ProgressController";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {OpenAiWrapper} from "./OpenAiWrapper";
import {usePlaygroundContext} from "../../../context/PlaygroundContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {ElevenLabsWrapper} from "./ElevenLabsWrapper";

export const Playground = () => {

    const { step } = usePlaygroundContext();

    const {
        openAiLoading,
        openAiError,
    } = useOpenAiContext();

    const {
        elevenLabsLoading, elevenLabsError, audioFilePath
    } = useElevenLabsContext();

    if ( step < 2 ) {
        return (
            <div>
                <OpenAiWrapper />
            </div>
        )
    } else {
        return (
            <div>
                <OpenAiWrapper />

                {openAiLoading && (
                    <Stack>
                        <Divider />
                        <Box>
                            <ProgressController />
                        </Box>
                    </Stack>
                )}

                {openAiError && <div>{openAiError}</div>}

                <Divider />

                <ElevenLabsWrapper canProceed={step >= 2} />

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
            </div>
        );
    }
};
