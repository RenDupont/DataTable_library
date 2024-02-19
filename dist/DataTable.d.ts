import React from "react";
interface DataTableProps {
    data: Array<{
        [key: string]: any;
    }>;
    columns: Array<{
        key: string;
        label: string;
    }>;
}
declare const DataTable: React.FC<DataTableProps>;
export default DataTable;
