import articlesData from "../../helpers/xids.json";
import {Select} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {useOpenAiContext} from "../../context/OpenAiContext";

export const ArticleSelect = ({disabled = false}) => {
    const [articles, setArticles] = useState([]);
    const {selectedArticle, setSelectedArticle} = useOpenAiContext();

    useEffect(() => {
        const formattedData = articlesData.map(article => ({
            label: article.article_title,
            value: article.article_xid,
        }));
        setArticles(formattedData);
    }, [setArticles]);

    return(
        <Select
            label="Select Article"
            placeholder="Select an article"
            options={articles}
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
            disabled={disabled}
        />
    )
}
