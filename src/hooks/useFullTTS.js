import {useRef, useState} from "react";
import {Text} from "@amboss/design-system";
import {useOpenAiContext} from "../context/OpenAiContext";
import {useStoreEpisodeContext} from "../context/StoreEpisodeContext";
import {useElevenLabsContext} from "../context/ElevenLabsContext";

const useFullTTS = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { selectedArticle, promptId } = useOpenAiContext();
    const { formData, imgSrc } = useStoreEpisodeContext()
    const { elevenLabsInput } = useElevenLabsContext();

    const [result, setResult] = useState()


    const abortControllerRef = useRef(null);

    const handleAbort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        const element = document.getElementsByClassName('elevenLabsWrapper')[0];
        // element.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo(0, document.body.scrollHeight);

        const apiUrl = `${process.env.REACT_APP_API_URL}/api/fulltts/request/${ true ? "audioOnly" : "full" }`;

        try {
            const body = {
                artwork: imgSrc,
                description: formData.description,
                promptId,
                tags: formData.tags,
                title: formData.title,
                userMessage: elevenLabsInput,
                xid: formData.xid,
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                signal: abortControllerRef.current.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {  // check if the response status is OK (status code 200-299)
                const result = await response.json();  // parses the response body as JSON
                console.log(result);
                setResult(result)
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
        error,
        result,
        handleSubmit,
        handleAbort,
    };
}

export default useFullTTS;

