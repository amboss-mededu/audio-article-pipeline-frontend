import {Textarea} from "@amboss/design-system";
import {ArticleSelect} from "../Pages/Episode/ArticleSelect";
import {useState} from "react";
import {useOpenAiContext} from "../../context/OpenAiContext";

export const PrimaryInputField = () => {
    console.log("PrimaryInputField mounted")

    const [tokenCount, setTokenCount] = useState(0);
    const { openAiInput, setOpenAiInput, openAiInputType } = useOpenAiContext();

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
                placeholder="Enter your HTML here..."
            />
        :
            <ArticleSelect />
    )
}