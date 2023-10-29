import {useInventoryContext} from "../../../../context/InventoryContext";

export const useSorting = () => {

    const {
        currentlySortedByColumn, setCurrentlySortedByColumn,
        sortDirection, setSortDirection,
    } = useInventoryContext()

    const handleSort = (columnName) => {
        if (currentlySortedByColumn === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortDirection('asc');
        }
        setCurrentlySortedByColumn(columnName);
    };



    return {
        handleSort
    }
}
