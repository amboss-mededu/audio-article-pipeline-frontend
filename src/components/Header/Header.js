import {Box, Container, H2, Inline} from "@amboss/design-system";
import React from "react";
import HeaderNavigation from "./Navigation";
import {useAppContext} from "../../context/AppContext";

const Header = () => {
    const { activeTab } = useAppContext();
    console.log(activeTab)

    function getHeadline () {
        switch(activeTab) {
            case 0:
                return <H2>Listen To Amboss</H2>
            case 1:
                return <H2>Audio Renderer</H2>
            case 2:
                return <H2>No clue yet</H2>
            default:
                return <H2>Cut The Panic Transtympanic</H2>
        }
    }

    const Headline = getHeadline()

    return (
        <Container elevation={0}>
            <Inline alignItems={"spaceBetween"} vAlignItems={"center"}>
                <Box space={"zero"} lSpace={"m"} rSpace={"m"}>
                    {Headline}
                </Box>
                <HeaderNavigation />
            </Inline>
        </Container>
    )
}

export default Header;
