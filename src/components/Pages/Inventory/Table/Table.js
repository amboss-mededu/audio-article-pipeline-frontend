import {useColumns} from "./useColumns";
import {DataTable, Inline, Pagination} from "@amboss/design-system";
import {EmptyState} from "./EmptyState";
import React from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";
import {useSorting} from "./useSorting";
import {useAppContext} from "../../../../context/AppContext";

export const Table = () => {

    const {
        isLoading, setLoading,
        currentlySortedByColumn, sortedEpisodes
    } = useInventoryContext()

    const { innerWidth } = useAppContext()

    const { handleSort } = useSorting();

    const { currentPage, setCurrentPage, itemsPerPage, filteredEpisodes } = useInventoryContext()

    // Pagination
    const handleNextClick = () => setCurrentPage(currentPage + 1);
    const handlePrevClick = () => setCurrentPage(currentPage - 1);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const paginatedEpisodes = filteredEpisodes?.slice(startIdx, endIdx);

    const CustomPagination = () => (
        <Pagination
            numOfItems={sortedEpisodes.length}
            numOfItemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
        />
    )

    return (
        <DataTable
            caption="Inventory"
            columns={useColumns() || []}
            rows={paginatedEpisodes && paginatedEpisodes.map((episode) => {
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
            isFirstColumnSticky={innerWidth < 680 ? false : true}
            bodyCellVerticalPadding={"s"}
            isEmpty={!isLoading && ( !sortedEpisodes || !sortedEpisodes?.length)}
            emptyTableContentHeight={"10rem"}
            footer={ !isLoading && paginatedEpisodes && paginatedEpisodes.length &&
                <Inline alignItems="center">
                    <CustomPagination />
                </Inline>
            }
        >
            {!isLoading && ( !sortedEpisodes || !sortedEpisodes?.length) &&
                <EmptyState />
            }
        </DataTable>
    )
}
