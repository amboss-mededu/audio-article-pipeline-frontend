import {Button, Column, Columns, FormFieldGroup, Inline, Input, Select, Textarea, Toggle} from "@amboss/design-system";
import React from "react";
import {useStoreEpisodeContext} from "../../../../context/StoreEpisodeContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {isValidArticle} from "../../../../helpers/utils";

export const MetadataInput = ({nextTab}) => {
    const {formData, setFormData, imageStatus, stageOptions, formDefault} = useStoreEpisodeContext();
    const { setSelectedArticle, selectedArticle } = useOpenAiContext();

    const handleInputChange = (e, fallback) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [fallback || name]: value };
        setFormData(updatedFormData);
    };

    const handleClearForm = (e) => {
        setFormData(formDefault);
        setSelectedArticle(null);
        console.log("Form cleared")
    }

    return (
        <>
            <FormFieldGroup>
                <Columns gap={"xl"} vAlignItems={["bottom", "center"]}>
                    <Column size={[12, 6, 6]}>
                        <Select
                            name="stage"
                            value={formData.stage}
                            onChange={(e) => handleInputChange(e,"stage")}
                            placeholder="Select stage"
                            options={stageOptions}
                            label="Stage" hint="Select either Student or Physician"
                        />
                    </Column>
                    <Column size={[12, 6, 6]}>
                        <Input
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            hasError={selectedArticle && selectedArticle.xid && !formData.tags}
                            placeholder="Tags, separated, by comma"
                            label="Tags" hint="Add tags related to the content"
                        />
                    </Column>
                </Columns>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows={4}
                    hasError={selectedArticle && selectedArticle.xid && !formData.description}
                    label="Description" hint="Provide a brief description"
                />
                <Inline alignItems={"spaceBetween"}>
                    <Button
                        name="next-tab"
                        type={"button"}
                        size={"m"}
                        disabled={!isValidArticle(selectedArticle)}
                        variant={(isValidArticle(selectedArticle) && formData.stage && formData.description && formData.tags) ? "primary" : "secondary"}
                        onClick={nextTab}
                        ariaAttributes={{
                            'aria-label': 'Next Tab'
                        }}
                    >
                        Next
                    </Button>
                    <Button
                        name="clear-form"
                        type={"button"}
                        size={"m"}
                        disabled={!isValidArticle(selectedArticle)}
                        variant={"tertiary"}
                        destructive={true}
                        onClick={handleClearForm}
                        ariaAttributes={{
                            'aria-label': 'Clear Form'
                        }}
                    >
                        Clear form
                    </Button>
                </Inline>

            </FormFieldGroup>
        </>
    )
}
