import {Button, FormFieldGroup, Inline, Select} from "@amboss/design-system";
import {PrimaryInputField} from "./PrimaryInputField";
import PromptSelect from "./PromptSelection";
import {useAppContext} from "../../context/AppContext";
import {useState} from "react";
import {useOpenAi} from "../../context/OpenAiContext";

export const PrimaryInputForm = () => {
    console.log("PrimaryInputForm mounted")

    const { promptId, openAiInput } = useAppContext();
    const { openAiInputType } = useOpenAi();

    const [model, setModel] = useState('gpt-3.5-turbo');

    const { loading, handleSubmit } = useOpenAi();

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, promptId, openAiInput, openAiInputType)}>
            <FormFieldGroup label="Input" labelHint="Supports plain text">
                <PrimaryInputField />

                <Inline
                    space={"xl"}
                    alignItems={"left"}
                    vAlignItems={"center"}
                >
                    <PromptSelect />
                    <Select
                        label="Model Selection"
                        value={model}
                        onChange={handleModelChange}
                        options={[
                            {label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo'},
                            {label: 'GPT-3.5-16K', value: 'gpt-3.5-turbo-16k'},
                            {label: 'GPT-4', value: 'gpt-4'},
                        ]}
                    />
                </Inline>

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                >
                    Send to OpenAI
                </Button>
            </FormFieldGroup>
        </form>
    )
}
