import {Box, Divider, H2, LoadingSpinner, Stack} from "@amboss/design-system";
import {SecondarySubmissionForm} from "../../InputSecondary/SecondarySubmission";
import {PrimarySubmissionForm} from "../../InputPrimary/PrimarySubmission";
import useElevenLabsSubmission from "../../../hooks/useElevenLabsSubmission";
import {useAppContext} from "../../../context/AppContext";
import {ProgressController} from "../../../context/ProgressController";
import {useOpenAiContext} from "../../../context/OpenAiContext";

export const InputPage = () => {
    const { elevenLabsInput, setElevenLabsInput } = useAppContext();

    const {
        loading: openAiLoading,
        error: openAiError,
        openAiCallId,
    } = useOpenAiContext();

    const {
        loading: elevenLabsLoading,
        audioFilePath,
        error: elevenLabsError,
        handleSubmit: handleElevenLabsSubmit
    } = useElevenLabsSubmission();

    return (
        <div>
            <H2> 📜 AI Text To Speech 🔉</H2>

            <PrimarySubmissionForm />

            {openAiLoading && (
                <Stack>
                    <Divider />
                    <LoadingSpinner screenReaderText="Loading" />
                    <Box>
                        <ProgressController />
                    </Box>
                </Stack>
            )}

            {openAiError && <div>{openAiError}</div>}

            <Divider />

            <SecondarySubmissionForm
                elevenLabsInput={elevenLabsInput}
                setElevenLabsInput={setElevenLabsInput}
                handleSubmit={handleElevenLabsSubmit}
                canProceed={true}
                openAiCallId={openAiCallId}
            />

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
    );
};
