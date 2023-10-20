import {FormFieldGroup, Input, Select, Textarea, Toggle} from "@amboss/design-system";
import React from "react";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";

export const StoreEpisodeMetadata = ({handleInputChange}) => {
    const {formData, setFormData} = useStoreEpisodeContext();
    const stageOptions = [
        {
            label: "Physician",
            value: "physician"
        },
        {
            label: "Student",
            value: "student"
        }
    ];

    return (
        <>
            <FormFieldGroup>
                <Select
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                    placeholder="Select stage"
                    options={stageOptions}
                    label="Stage" hint="Select either Student or Physician"
                />
                <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Tags, separated, by comma"
                    label="Tags" hint="Add tags related to the content"
                />
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows={4}
                    label="Description" hint="Provide a brief description"
                />
            </FormFieldGroup>
        </>
    )
}
