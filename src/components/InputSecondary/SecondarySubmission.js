import {Box, Button, FormFieldGroup, Stack, Textarea} from "@amboss/design-system";

export const SecondarySubmissionForm = ({canProceedToElevenLabs, elevenLabsInput, setElevenLabsInput, loading}) => {
    return (
        <Stack alignItems={"spaceBetween"}>
            <FormFieldGroup label="Result">
                <Textarea
                    label="Result"
                    value={elevenLabsInput}
                    onChange={(e) => setElevenLabsInput(e.target.value)}
                    name="openai-result" rows={15}
                />
            </FormFieldGroup>
            {canProceedToElevenLabs && ( // Only show second button when user can proceed
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
        </Stack>
    )
}
