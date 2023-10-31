import React, {useEffect, useRef, useState} from "react";
import {Box, LoadingSpinner} from "@amboss/design-system";
import ('../../styles/Artwork.css')

export const Artwork = () => {
    const [imageStatus, setImageStatus] = useState('initial');
    const [imageSrc, setImageSrc] = useState('');

    const wrapperRef = useRef(null)

    useEffect(() => {

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
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageStatus('initial'); // Revert to the initial state in case of an error
            }
        };

        if ( imageStatus === "initial" ) {
            fetchImageFromBackend();
        }
    }, [imageStatus])

    useEffect(() => {
        if (!wrapperRef || !wrapperRef.current) return;

        switch (imageStatus) {
            case "loading":
                wrapperRef.current.style.borderStyle = "dashed";
                break;
            default:
                wrapperRef.current.style.borderStyle = "solid";
                break;
        }
    }, [imageStatus, wrapperRef])

    return(
        <Box>
            <div className={"artwork artwork__wrapper"} >
                <div ref={wrapperRef} className={"artwork artwork__content"}>
                    {imageStatus === 'loading' && <LoadingSpinner  screenReaderText={"Loading Artwork"}/>}
                    {imageStatus === 'loaded' && (
                        <img src={imageSrc} id={"episode-artwork-img"} alt={`Artwork for Episode`} style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            </div>
        </Box>
    )
}
