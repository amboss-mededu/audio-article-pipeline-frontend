import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Checkbox, FormFieldGroup, Inline} from '@amboss/design-system';
import {useStoreEpisodeContext} from "../../../../context/StoreEpisodeContext";

const VoiceSelect = () => {
    const {availableVoices, selectedVoices, setSelectedVoices, voicesError } = useStoreEpisodeContext();

    const handleClick = (e) => {
        const voice_id = e.target.value
        setSelectedVoices(prevState => {
            const foundIndex = prevState.findIndex(obj => obj.voice_id === voice_id);

            if (foundIndex >= 0) {
                // Object found, remove it
                return [...prevState.slice(0, foundIndex), ...prevState.slice(foundIndex + 1)];
            } else {
                // Object not found, add it
                return [...prevState, availableVoices.find(obj => obj.voice_id === voice_id)];
            }
        });

    }

    return (
        <Inline>
            <FormFieldGroup
                label="Available Voices"
                errorMessages={[voicesError]}
            >
                {availableVoices.map((voice) => (
                    <Checkbox
                        key={voice && voice.voice_id}
                        label={voice && voice.name}
                        value={voice && voice.voice_id}
                        checked={selectedVoices.find(obj => obj.voice_id === voice.voice_id)}
                        onClick={(e) => handleClick(e)}
                        name={"voice"} />
                ))}
            </FormFieldGroup>
        </Inline>
    );
};

export default VoiceSelect;
