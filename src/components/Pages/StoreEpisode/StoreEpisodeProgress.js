import {Box, Inline, Text, Icon, Stack} from "@amboss/design-system";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useEffect, useState} from "react";


const StoreEpisodeProgressIndicator = ({ activeTab }) => {
    const steps = ["Metadata", "Script", "Audio"];
    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    const [status, setStatus] = useState(0)

    useEffect(() => {
        const percentage =
            (selectedArticle ? 0.1 : 0) +
            (Number(activeTab) * 0.3) +
            (imageStatus === "loaded" ? 0.1 : 0) +
            (audioFilePath ? 0.1 : 0);
        setStatus(percentage)
    }, [selectedArticle, activeTab, imageStatus, audioFilePath])

    return (
        <div className={"store-episode-progress"}>
            <Box alignText={"center"} alignItems="center" space={"s"} rSpace={["l","xl","xxl"]} lSpace={["l","xl","xxl"]}>
                <progress className={"store-episode-progress__bar"} value={status} max="1" />
            </Box>
        </div>
    );
};

export default StoreEpisodeProgressIndicator;
