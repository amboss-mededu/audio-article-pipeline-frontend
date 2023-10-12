// hooks/useElevenLabsSubmission.js
import { useState } from 'react';
import axios from 'axios';

const useElevenLabsSubmission = () => {
    const [loading, setLoading] = useState(false);
    const [audioFilePath, setAudioFilePath] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e, elevenLabsInput, openAiCallId) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const apiUrl = '/api/elevenlabs/request';

            const response = await axios.post(apiUrl, {
                text: elevenLabsInput, // Passing the previously obtained result
                openAiCallId: openAiCallId
            });

            setAudioFilePath(response.data.audioFile.location);
        } catch (err) {
            setError('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        audioFilePath,
        error,
        handleSubmit,
    };
};

export default useElevenLabsSubmission
