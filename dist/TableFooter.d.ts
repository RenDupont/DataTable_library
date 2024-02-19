import React from "react";
interface TableFooterProps {
    range: number[];
    handlePage: (page: number) => void;
    page: number;
    rowPagination: number;
    totalEntriesNb: number;
}
declare const TableFooter: React.FC<TableFooterProps>;
export default TableFooter;
