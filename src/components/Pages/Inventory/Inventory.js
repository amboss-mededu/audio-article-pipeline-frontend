import React from 'react';
import {
    Box, Stack
} from "@amboss/design-system";
import { Header } from './Header/Header'
import { useInventoryContext} from "../../../context/InventoryContext";
import {Table} from "./Table/Table";

import('../../../styles/Inventory.css')

const Inventory = () => {

    const { setReloadTrigger, episodes, setEpisodes,
        isLoading, setLoading,
    } = useInventoryContext()

    return (
        <div style={{ minWidth: '10rem', maxWidth: '960px', margin: '0 auto' }}>
            <Stack space={"m"}>
                <Box space={"m"} lSpace={"zero"} rSpace={"zero"}>
                    <Header isLoading={isLoading} setReloadTrigger={setReloadTrigger} />
                </Box>
                <Table />
            </Stack>
        </div>
    );
};

export default Inventory;
