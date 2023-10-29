import React, { createContext, useState, useEffect, useContext } from 'react';
import {useSorting} from "../components/Pages/Inventory/Table/useSorting";
import {useAppContext} from "./AppContext";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {

    const { innerHeight } = useAppContext();

    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [currentlySortedByColumn, setCurrentlySortedByColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = innerHeight > 1250 ? 15 : innerHeight > 850 ? 10 : 5;

    const [searchQuery, setSearchQuery] = useState("");

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

    const sortedEpisodes = [...episodes].sort((a, b) => {
        let aValue, bValue;

        if (currentlySortedByColumn.includes('voice')) {
            const key = currentlySortedByColumn.split('_')[1];  // either 'name' or 'sex'
            aValue = a.voice[key];
            bValue = b.voice[key];
        } else {
            aValue = a[currentlySortedByColumn] || 0;
            bValue = b[currentlySortedByColumn] || 0;
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


    return (
        <InventoryContext.Provider
            value={{
                episodes, isLoading, setReloadTrigger,
                currentlySortedByColumn, setCurrentlySortedByColumn,
                sortDirection, setSortDirection,
                currentPage, setCurrentPage, itemsPerPage,
                searchQuery, setSearchQuery,
                filteredEpisodes, sortedEpisodes
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventoryContext = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventoryContext must be used within an InventoryProvider');
    }
    return context;
};
