import React, {useEffect, useState} from 'react';
import {Box, Divider, Column, Columns} from '@amboss/design-system';
import {ArticleSelect} from "../../Commons/ArticleSelect";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {StoreEpisodeMetadata} from "./StoreEpisodeMetadata";
import { StoreEpisodeScript} from "./StoreEpisodeScript";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import StoreEpisodeProgressIndicator from "./StoreEpisodeProgress";
import {StoreEpisodeAudio} from "./StoreEpisodeAudio"; // Import components from your design library

import '../../../styles/StoreEpisode.css'
import {isValidArticle} from "../../../helpers/utils";
import Stepper from "../../Commons/Stepper";

const StoreEpisode = ({ onFormDataChange }) => {
    const {formData, setFormData} = useStoreEpisodeContext();
    const [activeTab, setActiveTab] = useState(0)

    const { selectedArticle } = useOpenAiContext();
    const { elevenLabsInput } = useElevenLabsContext();

    useEffect(() => {
        // Find the "Submit" button and set its opacity based on the formData conditions
        const submitButton = document.querySelector('button[value="submit"]');
        if (submitButton) {
            if (elevenLabsInput && isValidArticle(selectedArticle)) {
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
        if (i === 2 && (!elevenLabsInput || !isValidArticle(selectedArticle))) {
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

    const tabs = [{label: "Metadata", value: "meta"}, {label: "Audio", value: "audio"}, {label: "Submit", value: "submit"}]

    return (
        <Box space={"zero"} lSpace={"m"} rSpace={"m"}>
            {/*<StoreEpisodeProgressIndicator activeTab={activeTab} />*/}
            <Stepper activeTab={activeTab} />

            <div className={"store-episode__main-box"}>
                <Box space={"s"} lSpace={"zero"} rSpace={"zero"}>
                    {/* Shared Fields */}
                    <Columns alwaysFillSpace={false}>
                        <Column alignSelf={"start"} size={["12","12","12"]}>
                            <ArticleSelect disabled={activeTab} />

                            <br />
                            <Divider />
                        </Column>
                    </Columns>


                    <Box space={"m"} lSpace={"zero"} rSpace={"zero"}>
                        {activeTab === 0 && (
                            <StoreEpisodeMetadata handleInputChange={handleInputChange} nextTab={nextTab} />
                        )}

                        {activeTab === 1 && (
                            <StoreEpisodeScript handleInputChange={handleInputChange} nextTab={nextTab} prevTab={prevTab} />
                        )}

                        {(activeTab === 2 && isValidArticle(selectedArticle) && elevenLabsInput) && (
                            <StoreEpisodeAudio nextTab={nextTab} prevTab={prevTab} />
                        )}
                    </Box>
                </Box>
            </div>
        </Box>
    );
}

export default StoreEpisode;
