import articlesData from "../../../helpers/xid.json";
import {Select} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {useAppContext} from "../../../context/AppContext";

export const ArticleSelect = () => {
    const [articles, setArticles] = useState([]);
    const {selectedArticle, setSelectedArticle} = useAppContext();

    useEffect(() => {
        const formattedData = articlesData.map(article => ({
            label: article.title,
            value: article.xid.toString(),
        }));
        setArticles(formattedData);
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return(
        <Select
            label="Select Article"
            placeholder="Select an article"
            options={articles}
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
        />
    )
}
