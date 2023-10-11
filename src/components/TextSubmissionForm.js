import {useEffect, useState} from "react";
import {
    Box,
    Button, Divider,
    FormFieldGroup,
    Input,
    LoadingSpinner,
    ProgressBar,
    Select, Stack,
    Textarea
} from "@amboss/design-system";
import axios from "axios";
import {PrimarySubmissionForm} from "./InputPrimary/PrimarySubmission";
import {SecondarySubmissionForm} from "./InputSecondary/SecondarySubmission";

export const TextSubmissionForm = () => {
    const [inputHtml, setInputHtml] = useState('');

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultScript, setResultScript] = useState(null);
    const [error, setError] = useState(null);
    const [promptId, setPromptId] = useState('');
    const [audioFilePath, setAudioFilePath] = useState(null);
    const [canProceedToElevenLabs, setCanProceedToElevenLabs] = useState(false);

    const [openAiCallId, setOpenAiCallId] = useState(null)

    const handleOpenAiSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const apiUrl = 'http://localhost:4000/openai/request';

            const response = await axios.post(apiUrl, {
                promptId,
                userMessage: inputHtml,
            });

            if (!response || !response.data) throw new Error ( "No response")

            setResultScript(response.data.data.message);
            setOpenAiCallId(response.data.openAiCallId);

            setCanProceedToElevenLabs(true); // Enable the second button after successful response
        } catch (err) {
            setError('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    const handleElevenLabsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const apiUrl = 'http://localhost:4000/elevenlabs/request';

            const response = await axios.post(apiUrl, {
                text: resultScript, // Passing the previously obtained result
                openAiCallId: openAiCallId
            });

            setAudioFilePath(response.data.audioFile.location);
        } catch (err) {
            setError('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        let timer;
        if (loading) {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev < 40) return prev + 5;
                    else if (prev < 70) return prev + 3;
                    else if (prev < 99) return prev + 1; // Keep it below 100 until process is confirmed finished
                    else return prev;
                });
            }, 1000); // Update every second
        } else {
            setProgress(0);
        }

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [loading]);


    return (
        <div>
            <h1>Text Analyzer</h1>
            <form onSubmit={handleOpenAiSubmit}>
                <PrimarySubmissionForm loading={loading} inputHtml={inputHtml} setInputHtml={setInputHtml} promptId={promptId} setPromptId={setPromptId} />
            </form>
            {(loading && !canProceedToElevenLabs) && (
                <Stack>
                    <Divider />

                    <LoadingSpinner screenReaderText="Loading" />
                    <Box><ProgressBar progress={progress} maxValue={100} /></Box>
                </Stack>
            )}
            {(error && !canProceedToElevenLabs) && <div>{error}</div>}
            {resultScript && (
                <>
                <form onSubmit={handleElevenLabsSubmit}>
                    <SecondarySubmissionForm canProceedToElevenLabs={canProceedToElevenLabs} resultScript={resultScript} setResultScript={setResultScript} loading={loading} />
                </form>

                    {(loading && canProceedToElevenLabs) && (
                        <Stack>
                            <Divider />

                            <LoadingSpinner screenReaderText="Loading" />
                            <Box><ProgressBar progress={progress} maxValue={100} /></Box>
                        </Stack>
                    )}
                    {(error && canProceedToElevenLabs) && <div>{error}</div>}

                    {audioFilePath && (
                        <Box>
                            <audio controls>
                                <source src={audioFilePath} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Box>
                    )}

                </>

            )}
        </div>
    );
};
