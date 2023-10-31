import React, {useEffect, useState} from 'react';
import {
    Box
} from '@amboss/design-system';
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import { MetadataInput } from "./Metadata/MetadataInput";
import { ScriptInput} from "./Script/ScriptInput";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {Audio} from "./Submit/Audio"; // Import components from your design library

import '../../../styles/StoreEpisode.css'
import {isValidArticle} from "../../../helpers/utils";
import Stepper from "../../Commons/Stepper";
import {ArticleSelect} from "./Header/ArticleSelect";

const StoreEpisode = ({ onFormDataChange }) => {
    const { formData, setFormData } = useStoreEpisodeContext();
    const { selectedArticle } = useOpenAiContext();
    const { elevenLabsInput } = useElevenLabsContext();

    const [activeTab, setActiveTab] = useState(0)

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
                <Box space={"s"} bSpace={"l"} lSpace={"zero"} rSpace={"zero"}>
                    {/* Shared Fields */}
                    <ArticleSelect activeTab={activeTab} setActiveTab={setActiveTab} />


                    <Box space={"m"} tSpace={"l"} lSpace={"zero"} rSpace={"zero"}>
                        {activeTab === 0 && (
                            <MetadataInput nextTab={nextTab} />
                        )}

                        {activeTab === 1 && (
                            <ScriptInput nextTab={nextTab} prevTab={prevTab} />
                        )}

                        {(activeTab >= 2 && isValidArticle(selectedArticle) && elevenLabsInput) && (
                            <Audio nextTab={nextTab} prevTab={prevTab} setActiveTab={setActiveTab} />
                        )}
                    </Box>
                </Box>
            </div>
        </Box>
    );
}

export default StoreEpisode;
