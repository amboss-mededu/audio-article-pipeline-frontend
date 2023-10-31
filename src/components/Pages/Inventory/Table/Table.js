import {useColumns} from "./useColumns";
import {Box, DataTable, Inline, Modal, Pagination} from "@amboss/design-system";
import {EmptyState} from "./EmptyState";
import React, {useEffect, useRef, useState} from "react";
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

    useEffect(() => {
        const maxPage = Math.floor(filteredEpisodes.length / itemsPerPage + 0.99);

        if (currentPage > maxPage) {
            setCurrentPage(maxPage || 1);
        }
    }, [filteredEpisodes, itemsPerPage, currentPage, setCurrentPage]);

    const paginatedEpisodes = filteredEpisodes?.slice(startIdx, endIdx);

    const CustomPagination = () => (
        <Pagination
            numOfItems={filteredEpisodes.length}
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
                rows={paginatedEpisodes && paginatedEpisodes.map(
                    ({ _id, elevenLabsCallId, xid, stage, description, tags, title, voice, version, creationDate, gcsUrl }) => {
                    return {
                        key: _id,
                        elevenLabsCallId,
                        xid,
                        stage,
                        description,
                        tags,
                        title,
                        voice_name: voice.name,
                        voice_sex: voice.sex,
                        voice_tone: voice.tone?.join(", "),
                        version,
                        creationDate: creationDate || 0,
                        gcsUrl
                    }
                })}
                {...rwdProps()}
                width={"100%"}
            >
                {!isLoading && ( !filteredEpisodes || !filteredEpisodes?.length) &&
                    <EmptyState error={!sortedEpisodes.length} empty={!filteredEpisodes.length} />
                }
            </DataTable>

            {
                isAudioModalOpen && <AudioModal open={false} activeEpisode={activeEpisode} setAudioModalOpen={setAudioModalOpen} />
            }
        </>
    )
}
