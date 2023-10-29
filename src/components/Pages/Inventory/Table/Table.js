import {useColumns} from "./useColumns";
import {Box, DataTable, Inline, Modal, Pagination} from "@amboss/design-system";
import {EmptyState} from "./EmptyState";
import React, {useRef, useState} from "react";
import {useInventoryContext} from "../../../../context/InventoryContext";
import {useSorting} from "./useSorting";
import {useAppContext} from "../../../../context/AppContext";
import {AudioModal} from "./AudioModal";

export const Table = () => {

    const { innerWidth } = useAppContext()
    const { currentPage, setCurrentPage, itemsPerPage, filteredEpisodes } = useInventoryContext()
    const {
        isLoading, setLoading,
        currentlySortedByColumn, sortedEpisodes
    } = useInventoryContext()

    const { handleSort } = useSorting();

    const [activeEpisode, setActiveEpisode] = useState(null)
    const [isAudioModalOpen, setAudioModalOpen] = useState(false)

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

    const rwdProps = () => {
        return {
            isFirstColumnSticky: innerWidth >= 500
        };
    }

    return (
        <>
            <DataTable
                bodyCellVerticalPadding={"s"}
                caption="Inventory"
                columns={useColumns({setActiveEpisode, setAudioModalOpen, isAudioModalOpen}) || []}
                currentlySortedByColumn={currentlySortedByColumn}
                emptyTableContentHeight={"10rem"}
                footer={ !isLoading && paginatedEpisodes && paginatedEpisodes.length &&
                    <Inline alignItems="center">
                        <CustomPagination />
                    </Inline>
                }
                isEmpty={!isLoading && ( !filteredEpisodes || !filteredEpisodes?.length)}
                isLoading={isLoading}
                onSort={handleSort}
                rows={paginatedEpisodes && paginatedEpisodes.map((episode) => {
                    return {
                        key: episode._id,
                        title: episode.title,
                        xid: episode.xid,
                        stage: episode.stage,
                        description: episode.description,
                        voice_name: episode.voice.name,
                        voice_sex: episode.voice.sex,
                        voice_tone: episode.voice.tone?.join(", "),
                        version: episode.version,
                        creationDate: episode.creationDate,
                        gcsUrl: episode.gcsUrl
                    }
                })}
                {...rwdProps()}
                width={"100%"}
            >
                {!isLoading && ( !filteredEpisodes || !filteredEpisodes?.length) &&
                    <EmptyState error={!sortedEpisodes} empty={!filteredEpisodes} />
                }
            </DataTable>

            {
                isAudioModalOpen && <AudioModal open={false} activeEpisode={activeEpisode} setAudioModalOpen={setAudioModalOpen} />
            }
        </>
    )
}
