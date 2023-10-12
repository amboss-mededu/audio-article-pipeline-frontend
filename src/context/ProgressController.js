import { useEffect, useState } from "react";
import { ProgressBar } from "@amboss/design-system";

export const ProgressController = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;

        if (progress < 50) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 5); // 5 points per second for first 10 seconds
            }, 1000);
        } else if (progress >= 50 && progress < 80) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 3); // 3 points per second for second 10 seconds
            }, 1000);
        } else if (progress >= 80 && progress < 97) {
            timer = setTimeout(() => {
                setProgress((prev) => prev + 1); // 1 point per second thereafter until 97
            }, 1000);
        } else if (progress >= 97) {
            // Handle completion logic here if needed
        }

        return () => {
            clearTimeout(timer);
        };
    }, [progress]);

    return <ProgressBar progress={progress} maxValue={100} />;
};
