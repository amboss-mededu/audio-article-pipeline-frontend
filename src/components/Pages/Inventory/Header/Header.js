import {Button, FormFieldGroup, Inline, Input, PictogramButton} from "@amboss/design-system";
import React from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";
import {useAppContext} from "../../../../context/AppContext";

export const Header = ({ setReloadTrigger, isLoading}) => {
    const {searchQuery, setSearchQuery} = useInventoryContext();
    const { innerWidth } = useAppContext();

    return (
        <FormFieldGroup label="Search the inventory">
            <Inline alignItems={"spaceBetween"}>
                <div className={"inventory__search-wrapper"}>
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
            </Inline>
        </FormFieldGroup>
    )
}
