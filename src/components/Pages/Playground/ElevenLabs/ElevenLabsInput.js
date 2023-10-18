import {FormFieldGroup, Textarea} from "@amboss/design-system";
import {useAppContext} from "../../../../context/AppContext";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";

export const ElevenLabsInput = () => {

    const { elevenLabsInput, setElevenLabsInput } = useElevenLabsContext();

    return (
        <FormFieldGroup>
            <Textarea
                label="Result"
                value={elevenLabsInput}
                onChange={(e) => setElevenLabsInput(e.target.value)}
                name="openai-result" rows={15}
                maxLength={100000}
            />
        </FormFieldGroup>
    )
}
