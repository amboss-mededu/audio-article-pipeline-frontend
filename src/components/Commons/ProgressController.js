import { useEffect, useState } from "react";
import { ProgressBar } from "@amboss/design-system";

export const ProgressController = ({maxValue = 100, inputLength}) => {
    const [progress, setProgress] = useState(0);

    if (inputLength) {
        const tempo = 10 // Characters per second minus loading time
        maxValue = inputLength / tempo + 25;
    }

    useEffect(() => {
        let timer;

        if (progress < .5 * maxValue) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 5); // 5 points per second for first 10 seconds
            }, 1000);
        } else if (progress >= .5 * maxValue && progress < .8 * maxValue) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 3); // 3 points per second for second 10 seconds
            }, 1000);
        } else if (progress >= .8 * maxValue && progress < .97 * maxValue) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 1); // 1 point per second thereafter until 97
            }, 1000);
        } else if (progress >= .97 * maxValue) {
            // Possibly Handle completion here
        }

        return () => {
            clearTimeout(timer);
        };
    }, [progress]);

    return <ProgressBar progress={progress} maxValue={maxValue} />;
};
