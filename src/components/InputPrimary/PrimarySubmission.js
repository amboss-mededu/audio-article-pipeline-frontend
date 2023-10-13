import {
    Box, Inline, SegmentedControl, Stack,
} from "@amboss/design-system";
import {useState} from "react";
import {PrimaryInputForm} from "./PrimaryInputForm";

export const PrimarySubmissionForm = ({loading, handleSubmit}) => {
    console.log("PrimarySubmissionForm mounted")

    const [openAiInputType, setOpenAiInputType] = useState('text')

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
                <PrimaryInputForm loading={loading} handleSubmit={handleSubmit} openAiInputType={openAiInputType} />
            </Stack>
        </Box>
    )
}

