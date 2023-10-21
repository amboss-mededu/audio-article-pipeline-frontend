import {Button, Column, Columns, FormFieldGroup, Inline, Input, Select, Textarea, Toggle} from "@amboss/design-system";
import React from "react";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import StoreEpisode from "./StoreEpisode";
import StoreEpisodeArtwork from "./StoreEpisodeArtwork";

export const StoreEpisodeMetadata = ({nextTab, handleInputChange}) => {
    const {formData, setFormData, imageStatus} = useStoreEpisodeContext();
    const { selectedArticle } = useOpenAiContext();
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
                <Inline alignItems={"spaceBetween"}>
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
                </Inline>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows={4}
                    label="Description" hint="Provide a brief description"
                />
                <Button
                    name="next-tab"
                    type={"button"}
                    size={"m"}
                    disabled={!selectedArticle}
                    variant={(selectedArticle && formData.stage && formData.description && formData.tags) ? "primary" : "secondary"}
                    onClick={nextTab}
                    ariaAttributes={{
                        'aria-label': 'Next Tab'
                    }}
                >
                    Next
                </Button>

            </FormFieldGroup>
        </>
    )
}
