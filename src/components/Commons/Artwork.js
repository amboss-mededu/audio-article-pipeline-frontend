import React, { useEffect, useRef, useState } from "react";
import { Box, LoadingSpinner, Text, Icon } from "@amboss/design-system";
import "../../styles/Artwork.css";

export const Artwork = () => {
    const [imageStatus, setImageStatus] = useState("initial");
    const [imageSrc, setImageSrc] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    const wrapperRef = useRef(null);

    const fetchImageFromBackend = async () => {
        console.log("Fetch initialized ...")

        setImageStatus("loading");

        const apiUrl = `${process.env.REACT_APP_API_URL}/api/episodes/artwork/random`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            setImageSrc(url);
            setImageStatus("loaded");
            setRetryCount(0); // Reset the retry count on a successful request
        } catch (error) {
            console.error("Error fetching image:", error.message);

            // Increment retry count and revert to initial state if less than max attempts
            if (retryCount < 2) {
                setRetryCount(retryCount + 1);
                setImageStatus("initial");
            } else {
                setImageStatus("error");
            }
        }
    };

    useEffect(() => {

        console.log(imageStatus)

        if (imageStatus === "initial") {
            console.log("Proceeding to fetch ...")

            fetchImageFromBackend();
        }
    }, [imageStatus]);

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
    }, [imageStatus, wrapperRef]);

    return (
        <Box>
            <div className={"artwork artwork__wrapper"}>
                <div ref={wrapperRef} className={"artwork artwork__content"}>
                    {imageStatus === "loading" && (
                        <LoadingSpinner screenReaderText={"Loading Artwork"} />
                    )}
                    {imageStatus === "loaded" && (
                        <img
                            src={imageSrc}
                            id={"episode-artwork-img"}
                            alt={`Artwork for Episode`}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                    {imageStatus === "error" && (
                        <Text as="span">
                            <Icon inline name="bell" size="l" />
                        </Text>
                    )}
                </div>
            </div>
        </Box>
    );
};
