import articlesData from "../../helpers/xids.json";
import {Select} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {useOpenAiContext} from "../../context/OpenAiContext";
import {isValidArticle} from "../../helpers/utils";

export const ArticleSelect = ({disabled = false}) => {
    const {articles, setArticles} = useOpenAiContext();
    const {selectedArticle, setSelectedArticle} = useOpenAiContext();

    console.log(selectedArticle,isValidArticle(selectedArticle))

    return(
        <Select
            label="Select Article"
            placeholder="Select an article"
            options={articles}
            value={isValidArticle(selectedArticle) && selectedArticle.xid}
            onChange={(e) => {
                setSelectedArticle({
                    xid: e.target.value,
                    title: e.target.innerText
                })
            }}
            disabled={disabled}
            hint={isValidArticle(selectedArticle) && `XID: ${selectedArticle.xid}`}
        />
    )
}
