import React, {useEffect, useRef, useState} from 'react';
import {Tabs, Container, Stack, PictogramButton, Inline} from "@amboss/design-system";
import { useAppContext } from '../../context/AppContext';
import {BREAKPOINTS} from "../../helpers/constants";
import '../../styles/Header.css';


const HeaderNavigation = ({windowWidth, showTabs, setShowTabs}) => {
    const { activeTab, setActiveTab } = useAppContext();
    const navRef = useRef(null);

    const navClass = (showTabs || windowWidth > BREAKPOINTS.md) ? 'header__navigation expandedNavMenu' : 'header__navigation';

    const handleTabChange = (selectedIndex) => {
        setActiveTab(selectedIndex);
        setTimeout(() => {  // After a short timeout, hide the tabs
            windowWidth < BREAKPOINTS.md && setShowTabs(false);
        }, 1500); // 500ms timeout
    };

    useEffect(() => {
        if (navRef.current) {
            if (showTabs || windowWidth > BREAKPOINTS.md) {
                navRef.current.classList.add("expandedNavMenu");
            } else {
                navRef.current.classList.remove("expandedNavMenu");
            }
        }
    }, [showTabs, windowWidth, navRef]);

    const tabs = [
        {
            icon: 'flask',
            label: 'Audio Playground',
            value: 'playground'
        },
        {
            icon: 'headphones',
            label: 'Create New Audio',
            value: 'create-new'
        },
        {
            icon: 'grid',
            label: 'Your Audios',
            value: 'inventory'
        }
    ];

    // Set label-less tabs for RWD below 360px
    const modifiedTabs = windowWidth < BREAKPOINTS.sm ?
        tabs.map(e => ({icon: e.icon, label: "", value: e.value, key: e.value})) :
        tabs;

    return (
        <div className={navClass} ref={navRef}>
            <Container
                id={"headerNavContainer"}
                elevation={showTabs ? 2 : 0}
                borderRadius="m"
                overflow="hidden"
                squareCorners={true}
            >
                <Inline className={"nav-bar"} alignItems={"center"} space={"zero"} vAlignItems={showTabs ? "bottom" : "center"}>
                    {
                        showTabs ?
                            <Tabs
                                horizontalPadding={["xxl","xl","xxl"]}
                                className={"nav-bar__tabs"}
                                activeTab={activeTab}
                                onTabSelect={handleTabChange}
                                tabs={modifiedTabs}
                            />
                            :
                            <PictogramButton
                                ariaAttributes={{
                                    'aria-label': 'Toggle Navigation'
                                }}
                                icon="menu"
                                size="l"
                                type="button"
                                variant="tertiary"
                                onClick={() => setShowTabs(true)} // Show tabs when the hamburger menu is clicked
                            />
                    }
                </Inline>
            </Container>
        </div>
    );
};

export default HeaderNavigation;
