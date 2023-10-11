import {Box, Button, FormFieldGroup, Stack, Textarea} from "@amboss/design-system";

export const SecondarySubmissionForm = ({canProceedToElevenLabs, resultScript, setResultScript, loading}) => {
    return (
        <Stack alignItems={"spaceBetween"}>
            <FormFieldGroup label="Result">
                <Textarea
                    label="Result"
                    value={resultScript}
                    onChange={(e) => setResultScript(e.target.value)}
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
