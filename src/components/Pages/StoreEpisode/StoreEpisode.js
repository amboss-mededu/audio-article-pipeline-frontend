import React, { useState } from 'react';
import {Box, Divider, Select, Input, Text, ChipInput, Tabs} from '@amboss/design-system';
import {ArticleSelect} from "../../Commons/ArticleSelect";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {StoreEpisodeMetadata} from "./StoreEpisodeMetadata";
import {StoreEpisodeAudio} from "./StoreEpisodeAudio"; // Import components from your design library

const StoreEpisode = ({ onFormDataChange }) => {
    const {formData, setFormData} = useStoreEpisodeContext();
    const [activeTab, setActiveTab] = useState(0)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        if (onFormDataChange) {
            onFormDataChange(updatedFormData);
        }
    };

    return (
        <Box lSpace={"zero"}>
            <Tabs activeTab={activeTab} onTabSelect={(i) => {
                console.log(i);
                setActiveTab(i);
            }} tabs={[{label: "Metadata", value: "meta"}, {label: "Audio", value: "audio"}, {label: "Submit", value: "submit"}]}>
            </Tabs>

            <Box space={"l"} lSpace={"zero"} rSpace={"zero"}>
                {/* Shared Fields */}
                <ArticleSelect />
                <Divider />

                <Box space={"m"} lSpace={"zero"} rSpace={"zero"}>
                    {activeTab === 0 && (
                        <StoreEpisodeMetadata handleInputChange={handleInputChange}/>
                    )}

                    {activeTab === 1 && (
                        <StoreEpisodeAudio handleInputChange={handleInputChange}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default StoreEpisode;
