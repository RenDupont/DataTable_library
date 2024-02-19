import React from "react";
import modules from './TableFooter.module.css';

interface TableFooterProps {
	range: number[];
	handlePage: (page: number) => void;
	page: number;
	rowPagination: number;
    totalEntriesNb: number;
}

const TableFooter:React.FC<TableFooterProps> = ({ range, handlePage, rowPagination, page, totalEntriesNb }) => {

    const startEntry = (page - 1) * rowPagination + 1;
    const endEntry = Math.min(page * rowPagination, totalEntriesNb);

    let displayedRange: number[] = [];

    if (range.length <= 3) {
        displayedRange = range;
    } else {
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

    return (
        <div className={modules.tableFooter}>
            <span>Showing {startEntry} to {endEntry} of {totalEntriesNb} entries</span>
            <div>
                <button className={page === 1? modules.disablePageButton : modules.pageButton} onClick={goToPreviousPage}>Previous</button>
                {displayedRange.map((pageNumber: number) => (
                    <button className={pageNumber === page? modules.currentPageButton : modules.pageButton} key={pageNumber} onClick={() => handlePage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
                <button className={range.length === page? modules.disablePageButton : modules.pageButton} onClick={goToNextPage}>Next</button>
            </div>
        </div>
    );
};

export default TableFooter;