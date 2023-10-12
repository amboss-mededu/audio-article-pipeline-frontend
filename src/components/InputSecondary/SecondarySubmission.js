import {Box, Button, FormFieldGroup, Stack, Textarea} from "@amboss/design-system";

export const SecondarySubmissionForm = ({canProceed, elevenLabsInput, setElevenLabsInput, loading, handleSubmit, openAiCallId}) => {
    return (
        <Stack alignItems={"spaceBetween"}>
            <form onSubmit={(e) => handleSubmit(e, elevenLabsInput, openAiCallId)}>
                <FormFieldGroup label="Result">
                    <Textarea
                        label="Result"
                        value={elevenLabsInput}
                        onChange={(e) => setElevenLabsInput(e.target.value)}
                        name="openai-result" rows={15}
                    />
                </FormFieldGroup>
                {canProceed && ( // Only show second button when user can proceed
                    <Box>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            disabled={loading}
                        >
                            Send to ElevenLabs
                        </Button>
                    </Box>
                )}
            </form>
        </Stack>
    )
}
