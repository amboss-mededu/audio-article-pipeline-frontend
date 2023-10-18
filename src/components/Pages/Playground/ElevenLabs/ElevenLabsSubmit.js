import {Box, Button} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const ElevenLabsSubmit = () => {
    const { elevenLabsLoading } = useElevenLabsContext();
    const { openAiCallId } = useOpenAiContext();

    return (
        <Box lSpace={"zero"}>
            <Button
                type="submit"
                variant="primary"
                loading={elevenLabsLoading}
                disabled={elevenLabsLoading}
            >
                {`Send to ElevenLabs [xid: ${openAiCallId}]`}
            </Button>
        </Box>
    )
}
