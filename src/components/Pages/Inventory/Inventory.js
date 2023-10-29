import React, { useState, useEffect } from 'react';
import {
    Box,
    DataTable,
    LoadingSpinner,
    Text,
    Badge,
    PictogramButton,
    Link,
    Inline,
    Pagination, Tooltip, Input, FormFieldGroup, Stack, H4, Button, Container
} from "@amboss/design-system";
import styled from "@emotion/styled";
import('../../../styles/Inventory.css')


const Inventory = () => {
    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentlySortedByColumn, setCurrentlySortedByColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [searchQuery, setSearchQuery] = useState("");

    const handleNextClick = () => setCurrentPage(currentPage + 1);
    const handlePrevClick = () => setCurrentPage(currentPage - 1);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/episodes/fetch`)
            .then(response => response.json())
            .then(data => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [reloadTrigger]);

    const handleSort = (columnName) => {
        if (currentlySortedByColumn === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortDirection('asc');
        }
        setCurrentlySortedByColumn(columnName);
    };

    const sortedEpisodes = [...episodes].sort((a, b) => {
        let aValue, bValue;

        if (currentlySortedByColumn.includes('voice')) {
            const key = currentlySortedByColumn.split('_')[1];  // either 'name' or 'sex'
            aValue = a.voice[key];
            bValue = b.voice[key];
        } else {
            aValue = a[currentlySortedByColumn];
            bValue = b[currentlySortedByColumn];
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredEpisodes = sortedEpisodes.filter((episode) => {
        return (
            episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.xid.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.stage.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            episode.voice.sex.toLowerCase().includes(searchQuery.toLowerCase())
            // Add more fields if necessary
        );
    });


    const paginatedEpisodes = filteredEpisodes.slice(startIdx, endIdx);

    const daysAgoOrExactDate = (creationDate) => {
        const currentDate = new Date();
        const episodeDate = new Date(creationDate);

        const diffTime = Math.abs(currentDate - episodeDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 10) {
            return `${diffDays} days ago`;
        } else {
            return episodeDate.toDateString();
        }
    };


    const StyledLink = styled(Link)({
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    });

    const renderItemNameCell = (row: DataTableRow): React.ReactElement =>
        <Stack>
            <Text size="s">
                <StyledLink href="#">{row.title}</StyledLink>
            </Text>
            <Text size={"xs"}>[{row.xid}]</Text>
        </Stack>;

    const EmptyState = () => {
        return (
            <Stack space="xs">
                <H4>Unable to load the data</H4>
                <div>
                    <Text color="tertiary" size="s" align="center">
                        We can&apos;t seem to be able to connect to server. Please try
                        again.
                    </Text>
                    <Text color="tertiary" size="s" align="center">
                        If the problem persists, contact customer support.
                    </Text>
                </div>
                <Button
                    as="button"
                    leftIcon="reset"
                    onClick={() => setReloadTrigger(prevState => prevState+1)}
                    size="m"
                    type="button"
                    variant="tertiary"
                >
                    Try again
                </Button>
            </Stack>
        )
    }

    const columns = [
        {
            label: 'Title',
            name: 'title',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "title" ? null : sortDirection === "asc" ? "asc" : "desc",
            renderCell: renderItemNameCell
        },
        {
            label: 'Stage',
            name: 'stage',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "stage" ? null : sortDirection === "asc" ? "asc" : "desc",
            renderCell: (row: DataTableRow) => <Badge color={row.stage === 'physician' ? 'green' : 'brand'} text={row.stage} />
        },
        {
            label: 'Name',
            name: 'voice_name',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "voice_name" ? null : sortDirection === "asc" ? "asc" : "desc",
            renderCell: (row: DataTableRow) => {
                return (
                    row.voice_tone
                        ? <Tooltip placement="top-right" content={`Tone: ${row.voice_tone}`}><Text size="s">{row.voice_name}</Text></Tooltip>
                        : <Text size="s">{row.voice_name}</Text>
                )
            }
        },
        {
            label: 'Gender',
            name: 'voice_sex',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "voice_sex" ? null : sortDirection === "asc" ? "asc" : "desc",
            renderCell: (row: DataTableRow) => <Badge color={row.voice_sex === 'male' ? 'blue' : 'red'} text={row.voice_sex} />
        },
        {
            label: 'Ver°',
            name: 'version',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "version" ? null : sortDirection === "asc" ? "asc" : "desc",
            align: "right",
            renderCell: (row: DataTableRow) => <Text align={"right"} size="s">{row.version}</Text>
        },
        {
            label: 'Created at',
            name: 'creationDate',
            isSortable: true,
            sortDirection: currentlySortedByColumn !== "creationDate" ? null : sortDirection === "asc" ? "asc" : "desc",
            renderCell: (row: DataTableRow) => {
                const date = new Date(row.creationDate);
                return (
                    <Text size="s">
                        {isNaN(date.getTime()) ? "n/a" : daysAgoOrExactDate(row.creationDate)}
                    </Text>
                );
            }
        },
        {
            label: 'GET',
            name: 'gcsUrl',
            renderCell: (row: DataTableRow) => (
                <PictogramButton
                    ariaAttributes={{ 'aria-label': 'Download' }}
                    icon="download"
                    onClick={() => { window.location.href = row.gcsUrl }}
                    size="xs"
                    type="button"
                    variant="tertiary"
                />
            )
        }
    ];

    return (
        <div style={{ minWidth: '10rem', maxWidth: '960px', margin: '0 auto' }}>
            <Stack space={"m"}>
                <Box bSpace={"m"}>
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
                                Reload
                            </Button>
                        </Inline>
                    </FormFieldGroup>
                </Box>
                <DataTable
                    caption="Inventory"
                    columns={columns}
                    rows={paginatedEpisodes.map((episode) => {
                        return {
                            title: episode.title,
                            xid: episode.xid,
                            stage: episode.stage,
                            voice_name: episode.voice.name,
                            voice_sex: episode.voice.sex,
                            voice_tone: episode.voice.tone?.join(", "),
                            version: episode.version,
                            creationDate: episode.creationDate,
                            gcsUrl: episode.gcsUrl
                        }
                    })}
                    isLoading={isLoading}
                    currentlySortedByColumn={currentlySortedByColumn}
                    onSort={handleSort}
                    bodyCellVerticalPadding={"s"}
                    isEmpty={!isLoading && ( !sortedEpisodes || !sortedEpisodes?.length)}
                    emptyTableContentHeight={"10rem"}
                    footer={ !isLoading && sortedEpisodes && sortedEpisodes.length &&
                        <Inline alignItems="center">
                            <Pagination
                                numOfItems={sortedEpisodes.length}
                                numOfItemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPrevClick={handlePrevClick}
                                onNextClick={handleNextClick}
                            />
                        </Inline>
                    }
                >
                    {!isLoading && ( !sortedEpisodes || !sortedEpisodes?.length) &&
                        <EmptyState />
                    }
                </DataTable>
            </Stack>
        </div>
    );
};

export default Inventory;
