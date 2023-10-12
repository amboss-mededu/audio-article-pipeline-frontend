import {Button, FormFieldGroup, Input, Select, Stack, Textarea} from "@amboss/design-system";
import {useState} from "react";
import {useAppContext} from "../../context/AppContext";

export const PrimarySubmissionForm = ({loading, promptId, setPromptId, handleSubmit}) => {
    const [tokenCount, setTokenCount] = useState(0);
    const [model, setModel] = useState('gpt-3.5-turbo');

    const { openAiInput, setOpenAiInput } = useAppContext();

    const handleInputChange = (e) => {
        setOpenAiInput(e.target.value);

        let tokens = Math.floor(e.target.value.length / 4 + 0.99)
        setTokenCount(tokens);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
        <Stack alignItems={"spaceBetween"}>
            <form onSubmit={(e) => handleSubmit(e, promptId, openAiInput)}>
                <FormFieldGroup label="HTML Input" labelHint="(Supports plain text)">
                    <Textarea
                        value={openAiInput}
                        onChange={handleInputChange}
                        resize="both"
                        maxLength={10000}
                        placeholder="Enter your HTML here..."
                    />
                    <Input
                        value={`Token count: ${tokenCount}`}
                        readOnly
                    />
                    <Input
                        value={promptId}
                        onChange={(e) => setPromptId(e.target.value)}
                        placeholder="Enter your Prompt ID here..."
                    />

                    <Select
                        label="Model Selection"
                        value={model}
                        onChange={handleModelChange}
                        options={[
                            {label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo'},
                            {label: 'GPT-3.5-16K', value: 'gpt-3.5-16k'},
                            {label: 'GPT-4', value: 'gpt-4'},
                        ]}
                    />
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
        </Stack>
    )
}

