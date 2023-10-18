import {Box, Button} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";

export const ElevenLabsSubmit = () => {
    const { elevenLabsLoading } = useElevenLabsContext();

    return (
        <Box lSpace={"zero"}>
            <Button
                type="submit"
                variant="primary"
                loading={elevenLabsLoading}
                disabled={elevenLabsLoading}
            >
                {`Send to ElevenLabs`}
            </Button>
        </Box>
    )
}
