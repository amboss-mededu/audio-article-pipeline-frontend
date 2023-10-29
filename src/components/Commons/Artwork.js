import React, {useEffect, useState} from "react";
import {Box, LoadingSpinner} from "@amboss/design-system";
import {isValidArticle} from "../../helpers/utils";

export const Artwork = () => {
    const [imageStatus, setImageStatus] = useState('initial');
    const [imageReload, setImageReload] = useState(false)
    const [imageSrc, setImageSrc] = useState('');
    const [imageXid, setImageXid] = useState(null)

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
        } catch (error) {
            console.error('Error fetching image:', error);
            setImageStatus('initial'); // Revert to the initial state in case of an error
        }
    };

    useEffect(() => {
        if ( imageStatus === "initial" ) {
            fetchImageFromBackend();
        }
    }, [imageStatus, fetchImageFromBackend])

    const contentDivStyle = {
        display: 'grid',
        width: '67%',
        aspectRatio: "1 / 1",
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

    return(
        <Box>
            <div style={wrapDivStyle}>
                <div style={contentDivStyle}>
                    {imageStatus === 'loading' && <LoadingSpinner  screenReaderText={"Loading Artwork"}/>}
                    {imageStatus === 'loaded' && (
                        <img src={imageSrc} id={"episode-artwork-img"} alt={`Artwork for ${imageXid || "Episode"}`} style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            </div>
        </Box>
    )
}
