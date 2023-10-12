import {Box, Divider, LoadingSpinner, ProgressBar, Stack} from "@amboss/design-system";
import {SecondarySubmissionForm} from "../../InputSecondary/SecondarySubmission";
import {PrimarySubmissionForm} from "../../InputPrimary/PrimarySubmission";
import {useState} from "react";
import useOpenAiSubmission from "../../../hooks/useOpenAiSubmission";
import useElevenLabsSubmission from "../../../hooks/useElevenLabsSubmission";
import {useAppContext} from "../../../context/AppContext";

export const TextSubmissionForm = () => {
    const [inputHtml, setInputHtml] = useState('');
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
            <h1>Text Analyzer</h1>

            <PrimarySubmissionForm
                loading={openAiLoading}
                inputHtml={inputHtml}
                setInputHtml={setInputHtml}
                promptId={promptId}
                setPromptId={setPromptId}
                onSubmit={handleOpenAiSubmit}
            />

            {openAiLoading && (
                <Stack>
                    <Divider />
                    <LoadingSpinner screenReaderText="Loading" />
                    <Box><ProgressBar progress={50} maxValue={100} /></Box> {/* example progress value */}
                </Stack>
            )}

            {openAiError && <div>{openAiError}</div>}

            <SecondarySubmissionForm
                elevenLabsInput={elevenLabsInput}
                setElevenLabsInput={setElevenLabsInput}
                onSubmit={handleElevenLabsSubmit}
                canProceed={true}
            />

            {elevenLabsLoading && (
                <Stack>
                    <Divider />
                    <LoadingSpinner screenReaderText="Loading" />
                    <Box><ProgressBar progress={50} maxValue={100} /></Box> {/* example progress value */}
                </Stack>
            )}

            {elevenLabsError && <div>{elevenLabsError}</div>}

            {audioFilePath && (
                <Box>
                    <audio controls>
                        <source src={audioFilePath} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                </Box>
            )}
        </div>
    );
};
