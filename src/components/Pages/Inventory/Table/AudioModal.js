import {Box, Inline, Text, Modal, Badge} from "@amboss/design-system";
import React, {useEffect} from "react";
import {Artwork} from "../../../Commons/Artwork";

export const AudioModal = ({open, activeEpisode, setAudioModalOpen}) => {

    useEffect(() => {
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
    }, []);  // Empty dependency array means this effect runs once when the component mounts and cleans up when it unmounts.


    return (
        <Box space={"l"}>
            <Modal
                actionButton={{
                    text: 'Okay',
                    variant: 'primary'
                }}
                header={activeEpisode.title}
                onAction={(action) => {
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
                subHeader={activeEpisode.description}
            >
                <Modal.Stack>
                    <Modal.Text>
                        <Inline alignItems={activeEpisode.voice_name && activeEpisode.stage ? "spaceBetween" : activeEpisode.voice_name && !activeEpisode.stage ? "left" : "right"} >
                            { activeEpisode.voice_name && (
                                <Text>Spoken by: {activeEpisode.voice_name}</Text>
                            )}
                            <Badge color={activeEpisode.stage === 'physician' ? 'green' : 'brand'} text={activeEpisode.stage} />
                        </Inline>
                    </Modal.Text>
                    <Artwork />
                    <Box space={["s","s","m"]} alignText={"center"}>
                        <audio controls style={{width: "100%"}}>
                            <source src={activeEpisode.signedUrl} type="audio/mp3" />
                            Your browser does not support the audio tag.
                        </audio>
                    </Box>
                </Modal.Stack>
            </Modal>
        </Box>
    )
}
