import {Button, H4, Stack, Text} from "@amboss/design-system";
import React from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";

export const EmptyState = ({error, empty}) => {
    const {setReloadTrigger} = useInventoryContext();

    if (error) {
        return (
            <Stack space="xs">
                <H4>Unable to load the data</H4>
                <div>
                    <Text color="tertiary" size="s" align="center">
                        We can&apos;t seem to be able to connect to server. Please try
                        again.
                    </Text>
                    <Text color="tertiary" size="s" align="center">
                        If the problem persists, contact customer support.
                    </Text>
                </div>
                <Button
                    as="button"
                    leftIcon="reset"
                    onClick={() => setReloadTrigger(prevState => prevState+1)}
                    size="m"
                    type="button"
                    variant="tertiary"
                >
                    Try again
                </Button>
            </Stack>
        )
    } else {
        return (
            <Stack space="xs">
                <H4>No episodes found</H4>
                <div>
                    <Text color="tertiary" size="s" align="center">
                        We can&apos;t find any episodes for this search and filter.
                    </Text>
                </div>
            </Stack>
        )
    }

}
