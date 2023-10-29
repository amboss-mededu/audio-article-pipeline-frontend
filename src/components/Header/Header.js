import {Box, Container, H2, Inline, Logo, TextClamped} from "@amboss/design-system";
import React, {useEffect, useState} from "react";
import HeaderNavigation from "./Navigation";
import {useAppContext} from "../../context/AppContext";
import '../../styles/Header.css';

import { BREAKPOINTS } from '../../helpers/constants';

const Header = () => {
    const { activeTab } = useAppContext();

    const [showTabs, setShowTabs] = useState(true); // New state to determine if tabs should be displayed
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        if (windowWidth < BREAKPOINTS.md) {
            setShowTabs(false)
        } else {
            setShowTabs(true)
        }

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    function getHeadline () {
        switch(activeTab) {
            case 0:
                return <H2>Audio Playground</H2>
            case 1:
                return <H2>Store Episode</H2>
            case 2:
                return <H2>Inventory</H2>
            default:
                return <H2>Cut The Panic Transtympanic</H2>
        }
    }

    const Headline = getHeadline()

    return (
        <Container className={"header"} data-ds-id={"HeaderContainer"} elevation={0}>
            <Box space={showTabs ? "zero" : "m"} lSpace={showTabs ? "zero" : "xl"} rSpace={showTabs ? "zero" : "xl"}>
                <Inline
                    alignItems={
                        windowWidth < BREAKPOINTS.md
                            ? (showTabs
                                ? (windowWidth < BREAKPOINTS.sm
                                    ? "center"
                                    : "right"
                                )
                                : "spaceBetween")
                            : "center"
                    }
                    vAlignItems={"bottom"} noWrap={true} space={"zero"}
                >
                    {windowWidth < BREAKPOINTS.md && !showTabs && (
                        <TextClamped
                            align="left"
                            as="h2"
                            hyphens="none"
                            transform="none"
                            lines={1}
                        >
                            {Headline}
                        </TextClamped>
                    )}
                    <HeaderNavigation windowWidth={windowWidth} showTabs={showTabs} setShowTabs={setShowTabs} />
                </Inline>
            </Box>
        </Container>
    );
}

export default Header;
