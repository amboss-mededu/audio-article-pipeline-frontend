import {Box, Button, FormFieldGroup, Stack, Textarea} from "@amboss/design-system";
import {ElevenLabsInput} from "./ElevenLabs/ElevenLabsInput";
import {ElevenLabsSubmit} from "./ElevenLabs/ElevenLabsSubmit";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {useOpenAiContext} from "../../../context/OpenAiContext";

export const ElevenLabsWrapper = ({canProceed}) => {
    const { handleElevenLabsSubmit, elevenLabsInput } = useElevenLabsContext();
    const { openAiCallId } = useOpenAiContext();

    return (
        <Box className={"form__elevenLabsInput"}
             space={"zero"} vSpace={"l"}
        >
            <Stack alignItems={"spaceBetween"}>
                <form>
                    <ElevenLabsInput />
                    {canProceed && ( // Only show second button when user can proceed
                        <ElevenLabsSubmit />
                    )}
                </form>
            </Stack>
        </Box>
    )
}
