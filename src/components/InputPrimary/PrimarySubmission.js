import {
    Box, Inline, SegmentedControl, Stack,
} from "@amboss/design-system";
import {PrimaryInputForm} from "./PrimaryInputForm";
import {useState} from "react";

export const PrimarySubmissionForm = () => {
    console.log("PrimarySubmissionForm mounted")

    // const {openAiInputType, setOpenAiInputType} = useOpenAiContext();
    const [openAiInputType, setOpenAiInputType] = useState("text")

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

