import {Button, Column, Columns, FormFieldGroup, Inline, Input, Select, Textarea, Toggle} from "@amboss/design-system";
import React from "react";
import {useStoreEpisodeContext} from "../../../../context/StoreEpisodeContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {isValidArticle} from "../../../../helpers/utils";

export const MetadataInput = ({nextTab}) => {
    const {formData, setFormData, imageStatus, stageOptions} = useStoreEpisodeContext();
    const { selectedArticle } = useOpenAiContext();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value);
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    };

    return (
        <>
            <FormFieldGroup>
                <Columns gap={"xl"} vAlignItems={["bottom", "center"]}>
                    <Column size={[12, 6, 6]}>
                        <Select
                            name="stage"
                            value={formData.stage}
                            onChange={handleInputChange}
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

            </FormFieldGroup>
        </>
    )
}
