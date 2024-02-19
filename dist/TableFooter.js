import React from "react";
import modules from './TableFooter.module.css';
const TableFooter = ({ range, handlePage, rowPagination, page, totalEntriesNb }) => {
    const startEntry = (page - 1) * rowPagination + 1;
    const endEntry = Math.min(page * rowPagination, totalEntriesNb);
    let displayedRange = [];
    if (range.length <= 3) {
        displayedRange = range;
    }
    else {
        const midIndex = Math.min(Math.max(page - 2, 0), range.length - 3);
        displayedRange = range.slice(midIndex, midIndex + 3);
    }
    const goToPreviousPage = () => {
        if (page > 1) {
            handlePage(page - 1);
        }
    };
    const goToNextPage = () => {
        if (page < range.length) {
            handlePage(page + 1);
        }
    };
    return (React.createElement("div", { className: modules.tableFooter },
        React.createElement("span", null,
            "Showing ",
            startEntry,
            " to ",
            endEntry,
            " of ",
            totalEntriesNb,
            " entries"),
        React.createElement("div", null,
            React.createElement("button", { className: page === 1 ? modules.disablePageButton : modules.pageButton, onClick: goToPreviousPage }, "Previous"),
            displayedRange.map((pageNumber) => (React.createElement("button", { className: pageNumber === page ? modules.currentPageButton : modules.pageButton, key: pageNumber, onClick: () => handlePage(pageNumber) }, pageNumber))),
            React.createElement("button", { className: range.length === page ? modules.disablePageButton : modules.pageButton, onClick: goToNextPage }, "Next"))));
};
export default TableFooter;
