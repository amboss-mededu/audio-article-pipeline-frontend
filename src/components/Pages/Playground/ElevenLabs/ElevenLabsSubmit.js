import {Box, Button} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const ElevenLabsSubmit = () => {
    const { elevenLabsLoading, elevenLabsInput, handleElevenLabsSubmit, handleElevenLabsAbort } = useElevenLabsContext();
    const { openAiLoading, openAiCallId } = useOpenAiContext();

    return (
        <Box lSpace={"zero"}>
            { elevenLabsLoading
                ? (
                    <Button
                        onClick={handleElevenLabsAbort}
                        variant="primary"
                        destructive={true}
                    >
                        {`Abort ElevenLabs Submission`}
                    </Button>
                )
                : (
                    <Button
                        onClick={(e) => {
                            handleElevenLabsSubmit(e, elevenLabsInput, openAiCallId)
                        }}
                        variant="primary"
                        loading={openAiLoading}
                        disabled={elevenLabsLoading}
                        leftIcon={"zap"}
                    >
                        {`Listen To ElevenLabs`}
                    </Button>
                )
            }
        </Box>
    )
}
