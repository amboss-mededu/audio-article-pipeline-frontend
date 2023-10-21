import {Box, Container, H2, Inline, Logo, TextClamped} from "@amboss/design-system";
import React from "react";
import HeaderNavigation from "./Navigation";
import {useAppContext} from "../../context/AppContext";
import '../../styles/Header.css';

const Header = () => {
    const { activeTab } = useAppContext();

    function getHeadline () {
        switch(activeTab) {
            case 0:
                return <H2>Audio Playground</H2>
            case 1:
                return <H2>Store Episode</H2>
            case 2:
                return <H2>No clue yet</H2>
            default:
                return <H2>Cut The Panic Transtympanic</H2>
        }
    }

    const Headline = getHeadline()

    return (
        <Container className={"header"} data-ds-id={"HeaderContainer"} elevation={0}>
            <Inline alignItems={"center"} vAlignItems={"stretch"} noWrap={true} space={"zero"}>
                {/*<Box space={"zero"} lSpace={"m"} rSpace={"m"}>
                    <TextClamped
                        align="left"
                        as="h2"
                        hyphens="none"
                        transform="none"
                        lines={1}
                    >{Headline}</TextClamped>

                </Box>*/}
                <HeaderNavigation />
            </Inline>
        </Container>
    )
}

export default Header;
