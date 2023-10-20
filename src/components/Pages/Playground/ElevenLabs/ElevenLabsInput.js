import {FormFieldGroup, Textarea} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";

export const ElevenLabsInput = () => {

    const { elevenLabsInput, setElevenLabsInput } = useElevenLabsContext();


    return (
        <FormFieldGroup>
            <Textarea
                /* key={elevenLabsInput} */
                name={"eleven-labs-input"}
                value={elevenLabsInput}
                maxLength={20000}
                rows={20}
                placeholder={"Wait for output from OpenAi or say something yourself."}
                label={"Result"}
                tabIndex={0}
                onChange={(e) =>
                    setElevenLabsInput(e.target.value)
                }

            />
        </FormFieldGroup>
    )
}
