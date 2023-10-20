import React, { useState } from 'react';
import axios from 'axios';
import {Button, Input, Select, Box, Tabs, Tab, Text, Divider} from "@amboss/design-system";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {ArticleSelect} from "../../Commons/ArticleSelect";

function StoreEpisode() {
    const {formData, setFormData} = useStoreEpisodeContext();
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let endPoint;

        if (activeTab === "create") {
            endPoint = '/api/episodes/create';
        } else if (activeTab === "secondary") {
            endPoint = '/api/episodes/secondary'; // replace with the correct endpoint for SecondarySubmissionForm
        }

        try {
            const response = await axios.post(endPoint, formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVoiceChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            voice: {
                ...prevState.voice,
                [name]: value
            }
        }));
    };

    return (
        <Box lSpace={"zero"}>
            <Tabs activeTab={activeTab} onTabSelect={(i) => {
                console.log(i);
                setActiveTab(i);
            }} tabs={[{label: "Metadata", value: "meta"}, {label: "Audio", value: "audio"}, {label: "Submit", value: "submit"}]}>
            </Tabs>

            <Box space={"m"} lSpace={"zero"}>
                {/* Shared Fields */}
                <ArticleSelect />
                <Divider />

                {activeTab === 0 && (
                    <>
                        <Select name="stage" value={formData.stage} onChange={handleInputChange}>
                            <option value="student">Student</option>
                            <option value="physician">Physician</option>
                        </Select>
                        <Input
                            name="xid"
                            value={formData.xid}
                            onChange={handleInputChange}
                            placeholder="XID"
                        />
                        {/* ... other fields specific to StoreEpisodeForm */}
                    </>
                )}

                {activeTab === 1 && (
                    <>
                        <Text>Hello Second</Text>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default StoreEpisode;
