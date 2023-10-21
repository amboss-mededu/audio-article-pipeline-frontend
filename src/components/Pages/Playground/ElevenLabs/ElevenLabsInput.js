import {FormFieldGroup, Text, Textarea} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {useEffect, useRef} from "react";

export const ElevenLabsInput = () => {

    const textAreaRef = useRef(null); // Workaround to keep the textarea focused
    const { elevenLabsInput, setElevenLabsInput } = useElevenLabsContext();

    /*
    Considered setting timeout but had terrible UX
     */
    useEffect(() => {
        if(textAreaRef.current) {
            textAreaRef.current.value = elevenLabsInput;
        }
    }, [elevenLabsInput]);

    return (
        <FormFieldGroup>
            <Textarea
                ref={textAreaRef}
                name={"eleven-labs-input"}
                value={elevenLabsInput}
                maxLength={20000}
                rows={20}
                placeholder={"Wait for output from OpenAi or say something yourself."}
                label={"ElevenLabs Script"}
                tabIndex={0}
                onChange={(e) => setElevenLabsInput(e.target.value)}
            />
        </FormFieldGroup>
    )
}
