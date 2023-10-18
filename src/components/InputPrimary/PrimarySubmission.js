import {
    Box, Inline, SegmentedControl, Stack,
} from "@amboss/design-system";
import {PrimaryInputForm} from "./PrimaryInputForm";
import {useOpenAiContext} from "../../context/OpenAiContext";

export const PrimarySubmissionForm = () => {

    const {openAiInputType, setOpenAiInputType} = useOpenAiContext();

    return (
        <Box className={"form__openAiInput"}
             space={"zero"} vSpace={"l"}
        >
            <Stack alignItems={"spaceBetween"}>
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
                <PrimaryInputForm />
            </Stack>
        </Box>
    )
}

