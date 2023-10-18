import React, { useState } from 'react';
import { Tabs, Container, Stack, PictogramButton } from "@amboss/design-system";
import { useAppContext } from '../../context/AppContext';

const HeaderNavigation = () => {
    const { activeTab, setActiveTab } = useAppContext();
    const [showTabs, setShowTabs] = useState(false); // New state to determine if tabs should be displayed

    const handleTabChange = (selectedIndex) => {
        setActiveTab(selectedIndex);
        setTimeout(() => {  // After a short timeout, hide the tabs
            setShowTabs(false);
        }, 1500); // 500ms timeout
    };

    const tabs = [
        {
            icon: 'flask',
            label: 'Playground',
            value: 'playground'
        },
        {
            icon: 'headphones',
            label: 'Create New',
            value: 'create-new'
        },
        {
            icon: 'grid',
            label: 'Inventory',
            value: 'inventory'
        }
    ]

    return (
        <div className={"header__navigation"}>
            <Container
                id={"headerNavContainer"}
                elevation={2}
                borderRadius="m"
                overflow="hidden"
                squareCorners={false}
            >
                <Stack alignItems={"center"} space={["l", "xl", "xxl"]}>
                    {
                        showTabs ?
                            <Tabs
                                activeTab={activeTab}
                                onTabSelect={handleTabChange}
                                tabs={tabs}
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
                </Stack>
            </Container>
        </div>
    );
};

export default HeaderNavigation;
