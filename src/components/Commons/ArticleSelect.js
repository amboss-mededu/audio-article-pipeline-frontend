import articlesData from "../../helpers/xids.json";
import {Select} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {useOpenAiContext} from "../../context/OpenAiContext";

export const ArticleSelect = ({disabled = false}) => {
    const {articles, setArticles} = useOpenAiContext();
    const {selectedArticle, setSelectedArticle} = useOpenAiContext();

    console.log(selectedArticle)

    return(
        <Select
            label="Select Article"
            placeholder="Select an article"
            options={articles}
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
            disabled={disabled}
            hint={selectedArticle && `XID: ${selectedArticle}`}
        />
    )
}
