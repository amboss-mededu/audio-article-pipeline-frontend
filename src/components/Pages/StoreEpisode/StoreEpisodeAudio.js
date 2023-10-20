import {Text} from "@amboss/design-system";
import React from "react";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {ElevenLabsInput} from "../Playground/ElevenLabs/ElevenLabsInput";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";

export const StoreEpisodeAudio = ({handleInputChange}) => {
    const {formData, setFormData} = useStoreEpisodeContext();
    const {elevenLabsInput} = useElevenLabsContext();

    console.log(elevenLabsInput)
    console.log()

    return (
        <>
            <ElevenLabsInput />
        </>
    )
}
