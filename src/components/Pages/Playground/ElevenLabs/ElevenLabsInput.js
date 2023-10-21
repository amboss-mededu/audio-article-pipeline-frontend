import {FormFieldGroup, Text, Textarea} from "@amboss/design-system";
import {useElevenLabsContext} from "../../../../context/ElevenLabsContext";
import {useEffect, useRef} from "react";

export const ElevenLabsInput = ({elevenLabsPlaceholder}) => {

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

    if (!elevenLabsPlaceholder) {
        elevenLabsPlaceholder = `Wait for output from OpenAi or write something yourself.`
    }

    return (
        <FormFieldGroup>
            <Textarea
                ref={textAreaRef}
                name={"eleven-labs-input"}
                value={elevenLabsInput}
                maxLength={20000}
                rows={20}
                placeholder={elevenLabsPlaceholder}
                label={"ElevenLabs Script"}
                tabIndex={0}
                onChange={(e) => setElevenLabsInput(e.target.value)}
            />
        </FormFieldGroup>
    )
}
