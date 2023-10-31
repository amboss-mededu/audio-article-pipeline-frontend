import {Box, Inline, Text, Modal, Badge, TagGroup, Stack, StyledText} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {Artwork} from "../../../Commons/Artwork";

export const AudioModal = ({open, activeEpisode, setAudioModalOpen}) => {

    const [script, setScript] = useState(null);
    const [loadingScript, setLoadingScript] = useState(false);
    const [scriptError, setScriptError] = useState(null);

    const fetchScript = async (callId) => {
        setLoadingScript(true);
        setScriptError(null);
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/episodes/script/fetch/${callId}`;
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setScript(data.text);
            } else {
                setScriptError(`Failed to fetch script: ${response.status}`);
            }
        } catch (e) {
            setScriptError(e.message);
        } finally {
            setLoadingScript(false);
        }
    };

    useEffect(() => {
        if (activeEpisode && activeEpisode.elevenLabsCallId) {
            fetchScript(activeEpisode.elevenLabsCallId);
        }
    }, [activeEpisode]);

    useEffect(() => {
        console.log(activeEpisode)
        // Add class when component mounts
        const headerContainerDiv = document.querySelector("div[data-ds-id='HeaderContainer']");
        if (headerContainerDiv) {
            headerContainerDiv.classList.add('behind-modal');
        }

        // Remove class when component unmounts
        return () => {
            if (headerContainerDiv) {
                headerContainerDiv.classList.remove('behind-modal');
            }
        };
    }, []);

    const ModalTagGroup = ({tags}) => {

        if (!tags || !tags.length || !(typeof tags === "object")) return null;

        const labels = tags && tags.map(e => ({label: e}))

        return (
            <TagGroup
                onRemoveTag={function noRefCheck(){}}
                tags={labels}
            />
        )
    }

    const FirstRow = ({episode = {}}) => {
        const getAlignment = () => {
            if (episode.tags && episode.stage) return "spaceBetween";
            if (episode.tags) return "left";
            return "right";
        };

        return (
            <Inline alignItems={getAlignment()}>
                <ModalTagGroup tags={episode.tags} />
                <Badge color={episode.stage === 'physician' ? 'green' : 'brand'} text={episode.stage} />
            </Inline>
        );
    };




    return (
        <Box space={"l"}>
            <Modal
                header={activeEpisode.title}
                onAction={(action) => {
                    setAudioModalOpen(false)
                    return;
                    if (action === "cancel" && open === true) {
                        setAudioModalOpen(false);
                    } else if (action === "action") {
                        setAudioModalOpen(false);
                    }
                    if (open === false) open = true;
                }}
                privateProps={{
                    skipPortal: false
                }}
                subHeader={`[${activeEpisode.xid}]`}
            >
                <Modal.Stack>
                    <Modal.Text>
                        <FirstRow episode={activeEpisode} />
                    </Modal.Text>
                    <Modal.Text>
                        <Text >{activeEpisode.description}</Text>
                    </Modal.Text>

                        <Artwork />

                    <Box space={["s","s","m"]} alignText={"center"}>
                        <Stack space={["l","l","xl"]} alignItems={"center"}>
                            { activeEpisode.voice_name && (
                                <Text as={"span"} variant={"tertiary"} size={"s"} >Spoken by: {activeEpisode.voice_name}</Text>
                            )}
                            <audio controls style={{maxWidth: "100%"}}>
                                <source src={activeEpisode.signedUrl} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Stack>
                    </Box>
                    <Box><Stack space={"m"}>
                        {
                            script && script.split("\n\n").map((chunk, index) => (
                                <Text key={index}>{chunk}</Text>
                            ))
                        }
                    </Stack></Box>
                </Modal.Stack>
            </Modal>
        </Box>
    )
}
