import {Button, FormFieldGroup, Inline, Input, PictogramButton} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";
import {useAppContext} from "../../../../context/AppContext";

export const Header = () => {
    const {searchQuery, setSearchQuery, setReloadTrigger, isLoading, sortedEpisodes } = useInventoryContext();
    const { innerWidth } = useAppContext();

    const [wrapperWidth, setWrapperWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const element = document.querySelector("div.inventory--wrapper");
            if (element) {
                setWrapperWidth(element.offsetWidth);
            }
        };

        // Initial call
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const searchWrapperWidth = `${Math.min(wrapperWidth - 50, 250)}px`;

    return (
        <FormFieldGroup label="Search the inventory">
            <Inline alignItems={"spaceBetween"}>
                <div className={"inventory__search-wrapper"} style={{width: searchWrapperWidth}}>
                    <Input
                        name="inventory-search"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <PictogramButton
                        ariaAttributes={{ 'aria-label': 'Clear' }}
                        icon="x"
                        onClick={() => setSearchQuery("") }
                        size="s"
                        type="button"
                        variant="tertiary"
                    />
                </div>
                { ( sortedEpisodes && sortedEpisodes.length > 0 ) &&
                    <Button
                        as="button"
                        leftIcon="reset"
                        onClick={() => setReloadTrigger(prevState => prevState+1)}
                        size="m"
                        type="button"
                        disabled={isLoading}
                        variant="tertiary"
                    >
                        { innerWidth > 540 ? "Reload" : "" }
                    </Button>
                }
            </Inline>
        </FormFieldGroup>
    )
}
