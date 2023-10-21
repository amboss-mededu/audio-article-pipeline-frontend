// hooks/useElevenLabsSubmission.js
import {useRef, useState} from 'react';
import axios from 'axios';
import {Text} from "@amboss/design-system";

const useElevenLabs = () => {
    const [loading, setLoading] = useState(false);
    const [audioFilePath, setAudioFilePath] = useState(null);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);

    const handleAbort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleSubmit = async (e, elevenLabsInput, openAiCallId) => {
        if(e) e.preventDefault();
        setLoading(true);
        setError(null);
        setAudioFilePath(null)

        abortControllerRef.current = new AbortController();

        const element = document.getElementsByClassName('elevenLabsWrapper')[0];
        // element.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo(0, document.body.scrollHeight);


        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/elevenlabs/request`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                signal: abortControllerRef.current.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: elevenLabsInput, // Passing the previously obtained result
                    openAiCallId: openAiCallId
                })
            });

            if (response.ok) {  // check if the response status is OK (status code 200-299)
                const result = await response.json();  // parses the response body as JSON
                console.log(result);
                setAudioFilePath(result.audioFile.location);
            } else {
                // handle non-OK responses
                throw new Error('Network response was not ok.');
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log("Fetch aborted");
                setError(
                    <div style={{whiteSpace: "pre-line"}}>
                        <Text>{`The request was cancelled.`}</Text>
                    </div>
                );
            } else {
                setError('An error occurred while processing your request.');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        audioFilePath,
        error,
        handleSubmit,
        handleAbort
    };
};

export default useElevenLabs
