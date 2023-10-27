import {useRef, useState} from 'react';
import {Text} from "@amboss/design-system";
import {useElevenLabsContext} from "../context/ElevenLabsContext";
import {useOpenAiContext} from "../context/OpenAiContext";

const useOpenAi = ({promptId}) => {
    const { setElevenLabsInput } = useElevenLabsContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openAiCallId, setOpenAiCallId] = useState(null);

    const abortControllerRef = useRef(null);

    const handleAbort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleSubmit = async (e, openAiInput, openAiInputType, model, stream) => {
        e.preventDefault();
        setElevenLabsInput(" ");
        setLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        const element = document.getElementsByClassName('elevenLabsWrapper')[0];
        // element.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo(0, document.body.scrollHeight);

        const apiUrl = process.env.NODE_ENV === '_development'
            ? 'https://automaticunitedmotion.domkoeln.repl.co/openai'
            : `${process.env.REACT_APP_API_URL}/api/openai/request?inputType=${openAiInputType}&stream=${stream}`;

        try {

            if(stream) {

                const body = {
                    promptId,
                    userMessage: openAiInput,
                    model
                }

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/event-stream'
                    },
                    signal: abortControllerRef.current.signal,
                    body: JSON.stringify(body)
                });

                const result = [] // Store streamed data here
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
                }

            } else {
                // Handling the non-streamed response
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: abortControllerRef.current.signal,
                    body: JSON.stringify({
                        promptId,
                        userMessage: openAiInput,
                        model
                    })
                });

                const jsonResponse = await response.json();

                if (jsonResponse.success) {
                    setElevenLabsInput(jsonResponse.data.message);
                    setOpenAiCallId(jsonResponse.openAiCallId);
                } else {
                    throw new Error(jsonResponse.message || "Unknown error");
                }

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
                console.log(err.message);
                setError(
                    <div style={{whiteSpace: "pre-line"}}>
                        <Text>{`An error occurred while processing your request: \n ${err.message}`}</Text>
                    </div>
                );
            }
        } finally {
            setLoading(false)
        }
    };


    return {
        loading, error,
        openAiCallId,
        handleSubmit,
        handleAbort
    };
};

export default useOpenAi
