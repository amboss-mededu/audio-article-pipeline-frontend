import React, {useEffect, useState} from 'react';
import {Box, Divider, Select, Input, Text, Tabs} from '@amboss/design-system';
import {ArticleSelect} from "../../Commons/ArticleSelect";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {StoreEpisodeMetadata} from "./StoreEpisodeMetadata";
import {StoreEpisodeAudio} from "./StoreEpisodeAudio";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext"; // Import components from your design library

const StoreEpisode = ({ onFormDataChange }) => {
    const {formData, setFormData} = useStoreEpisodeContext();
    const [activeTab, setActiveTab] = useState(0)

    const { selectedArticle } = useOpenAiContext();
    const { elevenLabsInput } = useElevenLabsContext();

    useEffect(() => {
        // Find the "Submit" button and set its opacity based on the formData conditions
        const submitButton = document.querySelector('button[value="submit"]');
        if (submitButton) {
            if (elevenLabsInput && selectedArticle) {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
                submitButton.ariaDisabled = false;
                submitButton.disabled = false;
            } else {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
                submitButton.ariaDisabled = true;
                submitButton.disabled = true;
            }
        }
    }, [elevenLabsInput, selectedArticle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        if (onFormDataChange) {
            onFormDataChange(updatedFormData);
        }
    };

    const switchTab = (i) => {
        if (i === 2 && (!elevenLabsInput || !selectedArticle)) {
            // Prevent moving to the last tab if conditions are not met
            return;
        }
        setActiveTab(i);
    }

    const nextTab = () => {
        setActiveTab(activeTab+1)
    }
    const prevTab = () => {
        setActiveTab(activeTab-1)
    }

    return (
        <Box lSpace={"zero"}>
            <Tabs activeTab={activeTab} onTabSelect={(i) => {
                switchTab(i)
            }} tabs={[{label: "Metadata", value: "meta"}, {label: "Audio", value: "audio"}, {label: "Submit", value: "submit"}]}>
            </Tabs>

            <Box space={"l"} lSpace={"zero"} rSpace={"zero"}>
                {/* Shared Fields */}
                <ArticleSelect />
                <Divider />

                <Box space={"m"} lSpace={"zero"} rSpace={"zero"}>
                    {activeTab === 0 && (
                        <StoreEpisodeMetadata handleInputChange={handleInputChange} nextTab={nextTab} />
                    )}

                    {activeTab === 1 && (
                        <StoreEpisodeAudio handleInputChange={handleInputChange} nextTab={nextTab} prevTab={prevTab} />
                    )}

                    {(activeTab === 2 && selectedArticle && elevenLabsInput) && (
                        <Text>Ready to Submit</Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default StoreEpisode;
