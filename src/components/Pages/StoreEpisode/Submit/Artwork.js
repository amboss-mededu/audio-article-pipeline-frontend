import React, {useEffect, useRef, useState} from 'react';
import {Button, Icon, Text, LoadingSpinner} from '@amboss/design-system';
import {useStoreEpisodeContext} from "../../../../context/StoreEpisodeContext";
import {useOpenAiContext} from "../../../../context/OpenAiContext";
import {isValidArticle} from "../../../../helpers/utils"; // Assuming your design system has these components

export const Artwork = () => {
    const { imageStatus, setImageStatus,
        imageReload, setImageReload,
        imageSrc, setImageSrc,
        imageXid, setImageXid,
        imageRetryCount, setImageRetryCount
    } = useStoreEpisodeContext()

    const { selectedArticle } = useOpenAiContext();

    const prevSelectedArticleRef = useRef();

    const fetchImageFromBackend = async () => {
        setImageStatus('loading');

        const apiUrl = `${process.env.REACT_APP_API_URL}/api/episodes/artwork/random?format=png`;

        try {
            const response = await fetch(apiUrl);

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            setImageSrc(url);
            setImageStatus('loaded');
            setImageReload(true);
            isValidArticle(selectedArticle) && setImageXid(selectedArticle.xid);

            // Reset retry count upon successful fetch
            setImageRetryCount(0);
        } catch (error) {
            // Increment retry count and revert to initial state if less than max attempts
            if (imageRetryCount < 2) {
                setImageRetryCount(imageRetryCount + 1);
                setImageStatus('initial');
            } else {
                setImageStatus('error');
            }
        }
    };



    useEffect(() => {
        if (isValidArticle(selectedArticle) && (selectedArticle.xid !== imageXid)) {
            setImageStatus('initial');
        }
    }, [setImageStatus, imageXid, selectedArticle])

    useEffect(() => {
        if ( imageStatus === "initial" && isValidArticle(selectedArticle)) {
            fetchImageFromBackend();
        }
    }, [selectedArticle, imageStatus, fetchImageFromBackend])

    const contentDivStyle = {
        display: 'grid',
        width: '200px', height: '200px',
        border: `1px ${imageStatus === "loaded" ? "solid" : "dashed"}`,
        position: 'relative',
        margin: 'auto',
        alignContent: 'stretch',
        alignItems: 'center',
        borderRadius: '10px',
        overflow: 'hidden'
    }

    const wrapDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        alignItems: 'center'
    }

    const ImageError = () => {
        return (
            <Text as="span" align={"center"}>
                <Icon
                    inline
                    color={"error"}
                    name="alert-triangle"
                    size="l"
                />
            </Text>
        )
    }

    return (
        <div style={wrapDivStyle}>
            <div style={contentDivStyle}>
                {imageStatus === 'initial' && false && (
                    <Button style={{margin: '2rem'}} fullWidth={false} onClick={fetchImageFromBackend}>Create Image</Button>
                )}

                {imageStatus === 'loading' && <LoadingSpinner />}
                {imageStatus === 'error' && <ImageError />}
                {imageStatus === 'loaded' && (
                    <img src={imageSrc} id={"episode-artwork-img"} alt={`Artwork for ${imageXid || "Episode"}`} style={{ width: '100%', height: '100%' }} />
                )}
            </div>
            {(imageStatus === 'loaded' || imageReload) && (
                    <Button type={"button"} variant={"secondary"} disabled={imageStatus === "loading" || !isValidArticle(selectedArticle)} onClick={fetchImageFromBackend} fullWidth={false}>
                        Fetch Different Image
                    </Button>
            )}
        </div>
    );
};
