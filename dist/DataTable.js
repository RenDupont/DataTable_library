import React, { useState, useEffect } from "react";
import TableFooter from "./TableFooter";
import useTable from "./useTables";
import modules from './DataTable.module.css';
const DataTable = ({ data, columns }) => {
    const [sortOrder, setSortOrder] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumnObject, setSortColumnObject] = useState({ previousColunm: "", currentColunm: "" });
    const [sortedData, setSortedData] = useState(data);
    const [page, setPage] = useState(1);
    const [rowPagination, setRowPagination] = useState(5);
    const { paginableData, range } = useTable(sortedData, page, rowPagination);
    const handleColumnClick = (columnKey) => {
        setSortColumnObject({ previousColunm: sortColumnObject.currentColunm, currentColunm: columnKey });
    };
    useEffect(() => {
        const { currentColunm, previousColunm } = sortColumnObject;
        const defaultOrder = {
            columnName: currentColunm,
            value: 'asc'
        };
        setSortOrder((prevSortOrder) => (previousColunm === currentColunm ? (prevSortOrder.value === "asc" ? ({
            columnName: currentColunm,
            value: "desc"
        }) : defaultOrder) : defaultOrder));
    }, [sortColumnObject]);
    useEffect(() => {
        if (searchTerm !== "") {
            sortData(sortedData);
            setPage(1);
        }
        else {
            sortData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder, data]);
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filteredData = data.filter((item) => {
            return Object.values(item).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm));
        });
        setSortedData(filteredData);
        setPage(1);
    };
    function sortData(dataToSort = data) {
        const newResult = dataToSort.slice().sort((a, b) => {
            if (sortColumnObject.currentColunm) {
                const aValue = a[sortColumnObject.currentColunm];
                const bValue = b[sortColumnObject.currentColunm];
                switch (typeof aValue) {
                    case 'string':
                        return sortOrder.value === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                    case 'number':
                        return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
                    case 'object':
                        if (aValue instanceof Date) {
                            return sortOrder.value === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
                        }
                        return 0;
                    default:
                        return 0;
                }
            }
            return 0;
        });
        setSortedData(newResult);
    }
    function getRowClass(index, sortedColumn) {
        if (index % 2 === 0) {
            return sortedColumn === "" ? modules.evenRow : modules.evenRowSorted;
        }
        else {
            return sortedColumn === "" ? modules.oddRow : modules.oddRowSorted;
        }
    }
    return (React.createElement("div", { className: modules.dataTables_wrapper },
        React.createElement("div", { className: modules.dataTables_header },
            React.createElement("div", null,
                React.createElement("span", null, "Show "),
                React.createElement("select", { id: "rowNumber", onChange: (event) => setRowPagination(parseInt(event.target.value)) },
                    React.createElement("option", { value: "5" }, "5"),
                    React.createElement("option", { value: "10" }, "10"),
                    React.createElement("option", { value: "15" }, "15")),
                React.createElement("span", null, " entries")),
            React.createElement("div", null,
                React.createElement("span", null, "Search: "),
                React.createElement("input", { type: "text", placeholder: "Recherche", value: searchTerm, onChange: handleSearchChange }))),
        React.createElement("table", { className: modules.table },
            React.createElement("thead", null,
                React.createElement("tr", { className: modules.columnTitle }, columns.map((column) => (React.createElement("th", { className: modules.columnTitleCell, key: column.key, onClick: () => handleColumnClick(column.key) }, column.label))))),
            React.createElement("tbody", null, paginableData.map((item, index) => (React.createElement("tr", { key: index, className: index % 2 === 0 ? modules.evenRow : modules.oddRow }, columns.map((column) => (React.createElement("td", { className: `${modules.tableCell} ${column.key === sortColumnObject.currentColunm ? (index % 2 === 0 ? modules.sortedEvenCell : modules.sortedOddCell) : ''}`, key: `${column.key}-${index}` }, item[column.key])))))))),
        React.createElement(TableFooter, { range: range, handlePage: setPage, rowPagination: rowPagination, page: page, totalEntriesNb: data.length })));
};
export default DataTable;
