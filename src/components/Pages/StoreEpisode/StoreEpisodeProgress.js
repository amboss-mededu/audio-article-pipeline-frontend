import {Box, Inline, Text, Icon, Stack} from "@amboss/design-system";
import {useOpenAiContext} from "../../../context/OpenAiContext";
import {useElevenLabsContext} from "../../../context/ElevenLabsContext";
import {useStoreEpisodeContext} from "../../../context/StoreEpisodeContext";

const StoreEpisodeProgressIndicator = ({ activeTab }) => {
    const steps = ["Metadata", "Script", "Audio"];
    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    return (
        <div className={"store-episode-progress"}>
            <Box display="flex" justifyContent="space-between" alignItems="center" rSpace={["l","xl","xxl"]} lSpace={["l","xl","xxl"]}>
                <Inline space={"xxl"} alignItems={"center"} vAlignItems={"center"} noWrap={"true"}>
                    {steps.map((step, index) => {
                        console.log(activeTab === 2 , selectedArticle , imageStatus === "loaded" , audioFilePath)
                        return (
                            <Inline>
                            <Stack alignItems={"center"}>
                                <Text weight={activeTab === index && "bold"}>{step}</Text>
                                <Text weight={activeTab === index && "bold"}><Icon inline name={activeTab > index ? "checkmark-circle-filled" : ( activeTab === 2 && selectedArticle && imageStatus === "loaded" && audioFilePath ) ? "check-circle" : "circle"} size="m" /></Text>
                            </Stack>
                            </Inline>
                        )
                    })}
                </Inline>
            </Box>
        </div>
    );
};

export default StoreEpisodeProgressIndicator;
