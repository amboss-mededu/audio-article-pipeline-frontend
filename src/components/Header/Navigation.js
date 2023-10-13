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
        }, 500); // 500ms timeout
    };

    return (
        <div className={"header__navigation"}>
            <Container
                id={"headerNavContainer"}
                elevation={1}
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
                                tabs={[
                                    {
                                        icon: 'book-open',
                                        label: 'Transcript'
                                    },
                                    {
                                        icon: 'headphones',
                                        label: 'Audio'
                                    },
                                    {
                                        icon: 'grid',
                                        label: 'Inventory'
                                    }
                                ]}
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
