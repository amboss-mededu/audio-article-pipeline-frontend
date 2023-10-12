import {Box, Divider, H2, LoadingSpinner, ProgressBar, Stack} from "@amboss/design-system";
import {SecondarySubmissionForm} from "../../InputSecondary/SecondarySubmission";
import {PrimarySubmissionForm} from "../../InputPrimary/PrimarySubmission";
import {useState} from "react";
import useOpenAiSubmission from "../../../hooks/useOpenAiSubmission";
import useElevenLabsSubmission from "../../../hooks/useElevenLabsSubmission";
import {useAppContext} from "../../../context/AppContext";
import {ProgressController} from "../../../context/ProgressController";

export const InputPage = () => {
    const [promptId, setPromptId] = useState('');
    const { elevenLabsInput, setElevenLabsInput } = useAppContext()

    const {
        loading: openAiLoading,
        error: openAiError,
        openAiCallId,
        handleSubmit: handleOpenAiSubmit
    } = useOpenAiSubmission();

    const {
        loading: elevenLabsLoading,
        audioFilePath,
        error: elevenLabsError,
        handleSubmit: handleElevenLabsSubmit
    } = useElevenLabsSubmission();

    return (
        <div>
            <H2> 📜✨ AI Text To Speech ✨🔉</H2>

            <PrimarySubmissionForm
                loading={openAiLoading}
                promptId={promptId}
                setPromptId={setPromptId}
                handleSubmit={handleOpenAiSubmit}
            />

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
