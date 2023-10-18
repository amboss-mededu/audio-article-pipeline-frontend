import {
    Box, Inline, SegmentedControl, Stack,
} from "@amboss/design-system";
import {useState} from "react";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {OpenAiInput} from "./OpenAi/OpenAiInput";
import {usePlaygroundContext} from "../../../context/PlaygroundContext";

export const OpenAiWrapper = () => {

    const { openAiInput, openAiInputType, setOpenAiInputType, handleOpenAiSubmit, selectedArticle, model } = useOpenAiContext();
    const { setStep } = usePlaygroundContext();

    const [stream, setStream] = useState(false)

    const options = [
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
    ]

    return (
        <Box className={"form__openAiInput"}
             space={"zero"} vSpace={"l"}
        >
            <Stack alignItems={"spaceBetween"}>
                <Inline alignItems={"center"}>
                    <SegmentedControl
                        onChange={(value) => setOpenAiInputType(value)}
                        value={openAiInputType}
                        options={options}
                        size="m"
                    />
                </Inline>

                <div>
                    <form onSubmit={(e) => {
                        setStep(2);
                        handleOpenAiSubmit(e, openAiInputType === 'xid' ? selectedArticle : openAiInput, openAiInputType, model, stream)
                    }}>
                        <OpenAiInput stream={stream} setStream={setStream} />
                    </form>
                </div>

            </Stack>
        </Box>
    )
}

