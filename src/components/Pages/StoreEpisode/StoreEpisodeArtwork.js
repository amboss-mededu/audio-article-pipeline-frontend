import React, {useEffect, useRef, useState} from 'react';
import { Button, LoadingSpinner } from '@amboss/design-system';
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import {useOpenAiContext} from "../../../context/OpenAiContext"; // Assuming your design system has these components

const StoreEpisodeArtwork = () => {
    const { imageStatus, setImageStatus,
        imageReload, setImageReload,
        imageSrc, setImageSrc,
        imageXid, setImageXid } = useStoreEpisodeContext()

    const { selectedArticle } = useOpenAiContext();

    const prevSelectedArticleRef = useRef();

    useEffect(() => {
        console.log(selectedArticle, imageXid)

        if (selectedArticle !== imageXid) {
            setImageStatus('initial');
        }
    }, [selectedArticle])

    useEffect(() => {
        if ( imageStatus === "initial" && selectedArticle) {
            fetchImageFromBackend(selectedArticle);
        }
    }, [selectedArticle, imageStatus])

    const fetchImageFromBackend = async () => {
        setImageStatus('loading');

        const apiUrl = `${process.env.REACT_APP_API_URL}/api/episodes/artwork/random`
        try {
            // Fetch your image from the backend
            const response = await fetch(apiUrl);

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            setImageSrc(url);
            setImageStatus('loaded');
            setImageReload(true)
            setImageXid(selectedArticle)
        } catch (error) {
            console.error('Error fetching image:', error);
            setImageStatus('initial'); // Revert to the initial state in case of an error
        }
    };


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

    return (
        <div style={wrapDivStyle}>
            <div style={contentDivStyle}>
                {imageStatus === 'initial' && false && (
                    <Button style={{margin: '2rem'}} fullWidth={false} onClick={fetchImageFromBackend}>Create Image</Button>
                )}

                {imageStatus === 'loading' && <LoadingSpinner />}
                {imageStatus === 'loaded' && (
                    <img src={imageSrc} id={"episode-artwork-img"} alt={`Artwork for ${imageXid || "Episode"}`} style={{ width: '100%', height: '100%' }} />
                )}
            </div>
            {(imageStatus === 'loaded' || imageReload) && (
                    <Button type={"button"} variant={"secondary"} disabled={imageStatus === "loading" || !selectedArticle} onClick={fetchImageFromBackend} fullWidth={false}>
                        Fetch Different Image
                    </Button>
            )}
        </div>
    );
};

export default StoreEpisodeArtwork;
