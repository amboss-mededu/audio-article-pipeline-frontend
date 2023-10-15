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

        try {
            const apiUrl = `/api/openai/request?inputType=${openAiInputType}`;

            const response = await axios.post(apiUrl, {
                promptId,
                userMessage: openAiInput,
                model: model
            });

            if (!response || !response.data) throw new Error ( "No response")

            setElevenLabsInput(response.data.data.message);
            setOpenAiCallId(response.data.openAiCallId);

        } catch (err) {
            console.log(err.response.data.error)
            setError(
                <div style={{whiteSpace: "pre-line"}}><Text>{`An error occurred while processing your request: \n ${err.response.data.error}`}</Text></div>
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
