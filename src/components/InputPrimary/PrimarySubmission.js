import {
    Box,
    Button,
    FormFieldGroup,
    Inline,
    SegmentedControl,
    Select,
    Stack,
    Textarea
} from "@amboss/design-system";
import {useState} from "react";
import {useAppContext} from "../../context/AppContext";
import PromptSelect from "./PromptSelection";
import {ArticleSelect} from "../Pages/Episode/ArticleSelect";

export const PrimarySubmissionForm = ({loading, handleSubmit}) => {

    const [openAiInputType, setOpenAiInputType] = useState('text')
    const [tokenCount, setTokenCount] = useState(0);
    const [model, setModel] = useState('gpt-3.5-turbo');

    const { promptId } = useAppContext()
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
        <Box className={"form__openAiInput"}
             space={"zero"} vSpace={"l"}
        >
            <Stack alignItems={"spaceBetween"}>
                <form onSubmit={(e) => handleSubmit(e, promptId, openAiInput, openAiInputType)}>
                    <FormFieldGroup label="Input" labelHint="Supports plain text">
                        <Inline alignItems={"center"}>
                            <SegmentedControl
                                onChange={(value) => setOpenAiInputType(value)}
                                value={openAiInputType}
                                options={[
                                    {
                                        label: 'HTML or Markdown',
                                        name: 'text',
                                        value: 'text'
                                    },
                                    {
                                        label: 'Article',
                                        name: 'xid',
                                        value: 'xid'
                                    }
                                ]}
                                size="m"
                            />
                        </Inline>
                        {
                            openAiInputType === "text" ?
                                <Textarea
                                    value={openAiInput}
                                    hint={`Token count: ${tokenCount}`}
                                    onChange={handleInputChange}
                                    resize="both"
                                    maxLength={100000}
                                    placeholder="Enter your HTML here..."
                                />
                            :
                                <ArticleSelect />

                        }

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
            </Stack>
        </Box>
    )
}

