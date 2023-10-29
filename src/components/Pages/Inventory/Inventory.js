import React from 'react';
import {
    Box, Stack
} from "@amboss/design-system";
import { Header } from './Header/Header'
import {Table} from "./Table/Table";

import('../../../styles/Inventory.css')

const Inventory = () => {

    return (
        <div className={"inventory--wrapper"}>
            <Stack space={"m"}>
                <Box space={"m"} lSpace={"zero"} rSpace={"zero"}>
                    <Header />
                </Box>
                <Table />
            </Stack>
        </div>
    );
};

export default Inventory;
