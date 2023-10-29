import {Badge, Icon, Inline, Link, PictogramButton, Stack, Text, Tooltip} from "@amboss/design-system";
import React from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";
import styled from "@emotion/styled";
import {useAppContext} from "../../../../context/AppContext";

export const useColumns = () => {

    const {
        currentlySortedByColumn,
        sortDirection
    } = useInventoryContext()

    const { innerWidth } = useAppContext();
    const hide = innerWidth < 560;

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

    return (
        [
            {
                label: 'Title',
                name: 'title',
                isSortable: true,
                width: "50px",
                sortDirection: currentlySortedByColumn !== "title" ? null : sortDirection === "asc" ? "asc" : "desc",
                renderCell: renderItemNameCell
            },
            {
                label: 'Stage',
                name: 'stage',
                isSortable: true,
                sortDirection: currentlySortedByColumn !== "stage" ? null : sortDirection === "asc" ? "asc" : "desc",
                renderCell: (row: DataTableRow) => <Badge color={row.stage === 'physician' ? 'green' : 'brand'} text={hide ? row.stage?.slice(0,3) : row.stage} />
            },
            {
                label: 'Name',
                name: 'voice_name',
                isSortable: true,
                rwdHide: true,
                sortDirection: currentlySortedByColumn !== "voice_name" ? null : sortDirection === "asc" ? "asc" : "desc",
                renderCell: (row: DataTableRow) => {
                    return (
                        row.voice_tone
                            ? <Tooltip placement="top-right" content={<Text weight={"bold"}>Tone:<Text weight={"normal"}>{row.voice_tone}</Text></Text>}><Text size="s">{row.voice_name}</Text></Tooltip>
                            : <Text size="s">{row.voice_name}</Text>
                    )
                }
            },
            {
                label: hide ? 'Gen' : 'Gender',
                name: 'voice_sex',
                isSortable: true,
                sortDirection: currentlySortedByColumn !== "voice_sex" ? null : sortDirection === "asc" ? "asc" : "desc",
                renderCell: (row: DataTableRow) => {
                    return (
                        <Badge color={row.voice_sex === 'male' ? 'blue' : 'red'} text={
                            hide
                                ? (
                                    <Tooltip placement="top-right" content={
                                        <>
                                            <Inline>
                                                <Text weight={"bold"}>Speaker:<Text size="s">{row.voice_name}</Text></Text>
                                            </Inline>
                                            (row.voice_tone &&
                                                <Text weight={"bold"}>Tone:<Text weight={"normal"}>{row.voice_tone}</Text></Text>
                                            )
                                        </>
                                    }>
                                        <Icon name={"user"} size="s" />
                                    </Tooltip>
                                )
                                : row.voice_sex
                        } />
                    )
                }
            },
            {
                label: 'Ver°',
                name: 'version',
                isSortable: true,
                rwdHide: true,
                sortDirection: currentlySortedByColumn !== "version" ? null : sortDirection === "asc" ? "asc" : "desc",
                align: "right",
                renderCell: (row: DataTableRow) => <Text align={"right"} size="s">{row.version}</Text>
            },
            {
                label: 'Created at',
                name: 'creationDate',
                isSortable: true,
                rwdHide: true,
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
        ].filter(e => !hide || !e.rwdHide)
    )
}
