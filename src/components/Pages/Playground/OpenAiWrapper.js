import {
    Box, Inline, SegmentedControl, Stack,
} from "@amboss/design-system";
import {useState} from "react";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {OpenAiInput} from "./OpenAi/OpenAiInput";
import {usePlaygroundContext} from "../../../context/PlaygroundContext";

export const OpenAiWrapper = () => {

    const { openAiInput, openAiInputType, setOpenAiInputType, handleOpenAiSubmit, selectedArticle, model, openAiLoading, handleOpenAiAbort } = useOpenAiContext();
    const { setStep } = usePlaygroundContext();

    const [stream, setStream] = useState(false)

    const options = [
        {
            label: 'Enter Text',
            name: 'text',
            value: 'text'
        },
        {
            label: 'Select Article',
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
                        disabled={openAiLoading}
                    />
                </Inline>

                <div>
                    <form onSubmit={(e) => {
                    }}>
                        <OpenAiInput stream={stream} setStream={setStream} />
                    </form>
                </div>

            </Stack>
        </Box>
    )
}

