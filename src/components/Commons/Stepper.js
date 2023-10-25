import React, { useEffect, useState } from 'react';
import '../../styles/Stepper.css';
import {Text, Icon, Container} from "@amboss/design-system";
import {isValidArticle} from "../../helpers/utils";
import {useOpenAiContext} from "../../context/OpenAiContext";
import {useElevenLabsContext} from "../../context/ElevenLabsContext";
import {useStoreEpisodeContext} from "../../context/StoreEpisodeContext";

const Stepper = ({activeTab}) => {

    const { selectedArticle } = useOpenAiContext();
    const { audioFilePath } = useElevenLabsContext();
    const { imageStatus } = useStoreEpisodeContext();

    useEffect(() => {
        const updateStepStyles = () => {
            const steps = document.querySelectorAll(".step");

            steps.forEach((step) => {
                if (!step.nextElementSibling) return;
                const style = getComputedStyle(step);
                const marginRight = parseFloat(style.marginRight);
                const total = marginRight * 2;
                step.style.setProperty("--line-width", `${total}px`);
                step.style.setProperty("--line-right", `-${total}px`);
            });
        };

        // Initial call
        updateStepStyles();

        // Set up event listener
        window.addEventListener('resize', updateStepStyles);

        // Clean up
        return () => {
            window.removeEventListener('resize', updateStepStyles);
        };
    }, []);

    // checkmark-circle-filled
    // circle
    // check-circle
    // filled-dot
    // x

    const CustomIcon = ({ i }) => {
        // Currently disabled -->
        const isActiveTabCheck = false && i === activeTab && i === 2 && audioFilePath && imageStatus === "loaded" && isValidArticle(selectedArticle);

        const iconName = i < activeTab || isActiveTabCheck ? "check" : "";

        return <Icon inline size="m" name={iconName} />;
    };

    return (
        <div style={{ position: "sticky", top: "82px", zIndex: 5 }}>
            <Container borderRadius={"zero"} elevation={0}>
            <div className="progress-container">
                {Array.from({ length: 3 }).map((_, i) => {
                    const isCompleted = i < activeTab;
                    const isCurrent = i === activeTab;
                    const isCheckCondition = isCompleted || (isCurrent && i === 2 && audioFilePath && imageStatus === "loaded" && isValidArticle(selectedArticle));

                    return (
                        <div key={i} className={`step${isCompleted ? ' completed' : ''}${isCurrent ? ' current' : ''}`}>
                            <Text weight="bold" size="m" as="span" className="step-number">
                                {isCompleted ? <CustomIcon i={i} /> : i + 1}
                            </Text>
                        </div>
                    );
                })}
            </div>
            </Container>
        </div>
    );
};

export default Stepper;
