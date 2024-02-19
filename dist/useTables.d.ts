/// <reference types="react" />
declare const useTable: (data: any, page: number, rowsPerPage: number) => {
    paginableData: any;
    range: number[];
    setSlice: import("react").Dispatch<any>;
};
export default useTable;
