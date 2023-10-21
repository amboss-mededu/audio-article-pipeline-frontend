import React, {useEffect, useState} from 'react';
import {Tabs, Container, Stack, PictogramButton, Inline} from "@amboss/design-system";
import { useAppContext } from '../../context/AppContext';

const HeaderNavigation = () => {
    const { activeTab, setActiveTab } = useAppContext();
    const [showTabs, setShowTabs] = useState(true); // New state to determine if tabs should be displayed

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTabChange = (selectedIndex) => {
        setActiveTab(selectedIndex);
        setTimeout(() => {  // After a short timeout, hide the tabs
            setShowTabs(true);
        }, 1500); // 500ms timeout
    };

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

    const modifiedTabs = windowWidth < 768 ?
        tabs.map(e => ({icon: e.icon, label: "", value: e.value, key: e.value})) :
        tabs;

    return (
        <div className={"header__navigation"}>
            <Container
                id={"headerNavContainer"}
                elevation={2}
                borderRadius="m"
                overflow="hidden"
                squareCorners={true}
            >
                <Inline className={"nav-bar"} alignItems={"center"} space={"zero"} vAlignItems={"bottom"}>
                    {
                        showTabs ?
                            <Tabs
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
