
import React, { useState } from "react";
import {Select, FormFieldGroup, Radio, Button, Box, Inline} from "@amboss/design-system";
import axios from "axios";
import {ArticleSelect} from "./ArticleSelect";
import {useAppContext} from "../../../context/AppContext";

const voices = [
    { label: 'Bella', value: '1' },
    { label: 'Mr. M', value: '2' },
    { label: 'Another Mr.', value: '3' }
];

const AudioRenderer = () => {
    const {selectedArticle} = useAppContext();
    const [selectedVoice, setSelectedVoice] = useState('');
    const [selectedMode, setSelectedMode] = useState('');

    const handleRenderAudio = () => {
        console.log('Rendering Audio with the following settings:');
        console.log('Article: ', selectedArticle);
        console.log('Voice: ', selectedVoice);
        console.log('Mode: ', selectedMode);

        // Assuming that the selectedArticle value corresponds to promptId for the API,
        // and the selectedVoice value corresponds to voiceId for the API.

        const requestBody = {
            promptId: selectedArticle, // Assuming article selection provides promptId
            userMessage: selectedArticle.title, // Placeholder, replace with actual user message if needed
            voiceId: selectedVoice
        };

        axios.post('/api/fulltts/request', requestBody)
            .then(response => {
                console.log('API Response:', response.data);

                // Handle the API response here. You might update the UI to
                // display the returned message and/or play the audio file.

                // Note: you might want to handle audio playback here if an audio file URL is returned.
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here. Maybe update the UI to notify the user.
            });
    };

    return (
        <div>
            <h2>Audio Renderer</h2>

            <Box space={"zero"} vSpace={"l"}><Inline space={"l"} alignItems={"left"}>
                <ArticleSelect />
                <Select
                    label="Select Voice"
                    placeholder="Select a voice"
                    options={voices}
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                />
            </Inline></Box>


            <Box space={"zero"} vSpace={"l"}>
                <FormFieldGroup label="Mode" labelHint="OPTIONAL">
                    <Radio
                        label="Student"
                        name="mode"
                        checked={selectedMode === 'Student'}
                        onChange={() => setSelectedMode('Student')}
                    />
                    <Radio
                        label="Physician"
                        name="mode"
                        checked={selectedMode === 'Physician'}
                        onChange={() => setSelectedMode('Physician')}
                    />
                </FormFieldGroup>
            </Box>

            <Button onClick={handleRenderAudio}>Render Audio</Button>
        </div>
    );
};

export default AudioRenderer;
