// hooks/useOpenAiSubmission.js
import { useState } from 'react';
import axios from 'axios';
import {useAppContext} from "../context/AppContext";
import {usePrimaryInputContext} from "../context/PrimaryInputContext";
import {Text} from "@amboss/design-system";

const useOpenAiSubmission = () => {
    const { setElevenLabsInput } = useAppContext();
    const { promptId } = usePrimaryInputContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openAiCallId, setOpenAiCallId] = useState(null);

    const handleSubmit = async (e, openAiInput, openAiInputType, model) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const stream = true;

        const apiUrl = `/api/openai/request?inputType=${openAiInputType}&stream=${stream.toString()}`;

        try {

            let responseData = ""; // Store streamed data here
            setElevenLabsInput("")
            let lastKnownIndex = 0;

            const response = await axios.post(apiUrl, {
                promptId,
                userMessage: openAiInput,
                model: model
            }, {
                // Axios config for handling streamed response
                onDownloadProgress: (progressEvent) => {
                    const rawText = progressEvent.currentTarget.responseText;

                    // Split the rawText by '\n\n' to get individual messages
                    const messages = rawText.slice(lastKnownIndex).split('\n\n').filter(Boolean);

                    // Update the lastKnownIndex
                    lastKnownIndex = rawText.length;

                    messages.forEach(message => {
                        // Extract the message content
                        const match = message.match(/^data: (.+)$/);
                        if (match) {
                            const parsedData = JSON.parse(match[1]);
                            setElevenLabsInput(prevState => prevState + parsedData?.data);
                        }
                    });
                }
            });

            if (!responseData) throw new Error("No response");

            // Parse the entire response data after it's fully received
            // const parsedData = JSON.parse(responseData);
            // setElevenLabsInput(parsedData.data.message);
            // setOpenAiCallId(parsedData.openAiCallId);

        } catch (err) {
            console.log(err.response?.data?.error || err.message);
            setError(
                <div style={{whiteSpace: "pre-line"}}>
                    <Text>{`An error occurred while processing your request: \n ${err.response?.data?.error || err.message}`}</Text>
                </div>
            );

        } finally {
            setLoading(false);
        }
    };

    return {
        loading, error,
        openAiCallId,
        handleSubmit,
    };
};

export default useOpenAiSubmission
