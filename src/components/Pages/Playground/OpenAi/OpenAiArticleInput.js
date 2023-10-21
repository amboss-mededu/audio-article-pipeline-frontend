import {Textarea} from "@amboss/design-system";
import {useEffect, useState} from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {ArticleSelect} from "../../../Commons/ArticleSelect";

export const OpenAiArticleInput = () => {

    const [tokenCount, setTokenCount] = useState(0);
    const { openAiInput, setOpenAiInput, openAiInputType, openAiLoading } = useOpenAiContext();

    const openAiInputPlaceholder = `Enter your HTML here...`

    const handleInputChange = (e) => {
        setOpenAiInput(e.target.value);

        let tokens = Math.floor(e.target.value.length / 4 + 0.99)
        setTokenCount(tokens);
    };

    return (
        openAiInputType === "text" ?
            <Textarea
                value={openAiInput}
                hint={`Token count: ${tokenCount}`}
                onChange={handleInputChange}
                resize="both"
                maxLength={100000}
                placeholder={openAiInputPlaceholder}
                disabled={openAiLoading}
            />
            :
            <ArticleSelect disabled={openAiLoading} />
    )
}
