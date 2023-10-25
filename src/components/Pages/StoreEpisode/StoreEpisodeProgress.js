import {Box, Inline, Text, Icon, Stack} from "@amboss/design-system";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useEffect, useState} from "react";
import {isValidArticle} from "../../../helpers/utils";


const StoreEpisodeProgressIndicator = ({ activeTab }) => {
    const steps = ["Metadata", "Script", "Audio"];
    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    const [status, setStatus] = useState(0)


    useEffect(() => {
        const percentage =
            (isValidArticle(selectedArticle) ? 0.1 : 0) +
            (Number(activeTab) * 0.3) +
            (imageStatus === "loaded" ? 0.1 : 0) +
            (audioFilePath ? 0.1 : 0);
        setStatus(percentage)
    }, [selectedArticle, activeTab, imageStatus, audioFilePath])

    return (
        <div className={"store-episode-progress"}>
            <Box alignText={"center"} alignItems="center" space={"s"} rSpace={["l","xl","xxl"]} lSpace={["l","xl","xxl"]}>
                <Stack space={"m"}>
                    <progress className={"store-episode-progress__bar"} value={status} max="1" />
                    <Text as={"p"} size={"m"} weight={"bold"} align={"center"}>{Math.round(status * 100)}&nbsp;%</Text>
                </Stack>
            </Box>
        </div>
    );
};

export default StoreEpisodeProgressIndicator;
