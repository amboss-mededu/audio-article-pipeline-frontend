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
        const apiUrl = `/api/openai/request/stream?inputType=${openAiInputType}`;
        // const apiUrl = `https://automaticunitedmotion.domkoeln.repl.co/openai`;
        setElevenLabsInput("")

        try {
            let responseData = ""; // Store streamed data here

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify({
                    promptId,
                    userMessage: openAiInput,
                    model
                })
            });

            const result = []
            const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

            while (true) {
                const {value, done} = await reader.read();
                if (done) {
                    console.log("Done");
                    setLoading(false);
                    break;
                }

                const messages = (value).split('\n\n').filter(Boolean);
                messages.forEach(message => {
                    const json = message.replace('data: ', '')
                    const data = JSON.parse(json);
                    // Listen for done/error events from the server
                    if (data.done) {
                        console.log("Stream finished");
                        setLoading(false);
                    } else if (data.error) {
                        setError(
                            <div style={{whiteSpace: "pre-line"}}>
                                <Text>{`An error occurred while processing your request: \n ${data.error}`}</Text>
                            </div>
                        );
                    } else {
                        result.push(data?.data);
                        setElevenLabsInput(result.join(""));
                    }
                });
                console.log(result);
            }

        } catch (err) {
            console.log(err.message);
            setError(
                <div style={{whiteSpace: "pre-line"}}>
                    <Text>{`An error occurred while processing your request: \n ${err.message}`}</Text>
                </div>
            );

        } finally {
        }
    };


    return {
        loading, error,
        openAiCallId,
        handleSubmit,
    };
};

export default useOpenAiSubmission
