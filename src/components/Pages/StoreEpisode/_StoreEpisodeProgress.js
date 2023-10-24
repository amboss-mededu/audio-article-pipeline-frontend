import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from "@mui/material/StepLabel";
import { Steps } from 'primereact/steps';

import {Icon, Stack} from "@amboss/design-system";
import { Box } from "@amboss/design-system";
import { useOpenAiContext } from "../../../context/OpenAiContext";
import { useElevenLabsContext } from "../../../context/ElevenLabsContext";
import { useStoreEpisodeContext } from "../../../context/StoreEpisodeContext";

const _StoreEpisodeProgressIndicator = ({ activeTab }) => {
    const steps = [{label: "Metadata"},{label: "Script"}, {label:"Audio"}];
    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    return (
        <div className="store-episode-progress">
            <Box display="flex" justifyContent="center" alignItems="center">
                <Steps model={steps} />
            </Box>
        </div>
    );
};

function CustomStepIcon(props) {
    const { active, completed } = props;

    if (completed) {
        return <Icon inline name="checkmark-circle-filled" size="m" />;
    }
    if (active) {
        return <Icon inline name="circle" size="m" />;
    }
    return <Icon inline name="check-circle" size="m" />;
}

export default _StoreEpisodeProgressIndicator;
