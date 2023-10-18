import {Box, Button} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const ElevenLabsSubmit = () => {
    const { elevenLabsLoading } = useElevenLabsContext();
    const { openAiLoading } = useOpenAiContext();

    return (
        <Box lSpace={"zero"}>
            <Button
                type="submit"
                variant="primary"
                loading={openAiLoading}
                disabled={elevenLabsLoading}
            >
                {`Send to ElevenLabs`}
            </Button>
        </Box>
    )
}
