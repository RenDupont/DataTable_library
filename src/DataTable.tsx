import React, { useState, useEffect } from "react"
import TableFooter from "./TableFooter";
import useTable from "./useTables";
import modules from './DataTable.module.css';
import caretUp from './caret-up-solid.svg';
import caretDown from './caret-down-solid.svg';
import caretUnsorted from './arrow-unsorted_1.svg';

// Définition des types pour les props du composant DataTable
interface DataTableProps {
	data: Array<{ [key: string]: any }>;
	columns: Array<{ key: string; label: string }>;
}

/**
 * Composant DataTable pour afficher les données sous forme de tableau avec des fonctionnalités de tri et de pagination.
 *
 * @param data Les données à afficher dans le tableau
 * @param columns Les colonnes à afficher dans le tableau avec leurs étiquettes
 * @returns Le composant DataTable
 */
const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {

	const [sortOrder, setSortOrder] = useState<{colunmName?: string, value?: string}>({});
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortColumnObject, setSortColumnObject] = useState<{previousColunm: string, currentColunm: string}>({previousColunm: "", currentColunm: ""});
	const [sortedData, setSortedData] = useState<any>(data);
	const [page, setPage] = useState<number>(1);
	const [rowPagination, setRowPagination] = useState<number>(5);
  	const { paginableData, range } = useTable(sortedData, page, rowPagination);

	const handleColumnClick = (columnKey: string) => {
		setSortColumnObject({previousColunm: sortColumnObject.currentColunm, currentColunm: columnKey});
	};

	// Effet pour mettre à jour l'ordre de tri
	useEffect(() => {
		const {currentColunm, previousColunm} = sortColumnObject;
		const defaultOrder = {
			columnName: currentColunm,
			value: 'asc'
		};
		setSortOrder((prevSortOrder) => (previousColunm === currentColunm ? (
			prevSortOrder.value === "asc" ? ({ 
				columnName: currentColunm,
				value: "desc"}) : defaultOrder) : defaultOrder
			));
		},[sortColumnObject]
	)

	// Effet pour trier les données lorsqu'il y a un changement dans le tri ou les données
	useEffect(() => {
			if (searchTerm !== "") {
				sortData(sortedData);
				setPage(1);
			} else {
				sortData();
			}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[sortOrder, data]
	)

	/**
     * Gestion du changement du terme de recherche dans la barre de recherche.
     *
     * @param event L'événement de changement déclenché lorsqu'un utilisateur tape dans la barre de recherche
     */
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);
		const filteredData = data.filter((item) => {
			return Object.values(item).some(
				(value) => typeof value === "string" && value.toLowerCase().includes(searchTerm)
			);
		});
		setSortedData(filteredData);
		setSortColumnObject({previousColunm: "", currentColunm: ""});
		setPage(1);
	};

	/**
     * Trie les données en fonction de la colonne spécifiée et de l'ordre de tri.
     *
     * @param dataToSort Les données à trier
     * @returns Les données triées
     */
	function sortData(dataToSort: any[] = data) {
		const newResult = dataToSort.slice().sort((a: any, b: any) => {
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
						return 0
					
					default:
						return 0;
				}
			}
			return 0;
		});
		setSortedData(newResult);
	}

	// Rendu du composant DataTable
	return (
		<div className={modules.dataTables_wrapper}>
			<div className={modules.dataTables_header}>
				<div>
					<span>Show </span>
					<select id="rowNumber" onChange={(event) => setRowPagination(parseInt(event.target.value))}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
					<span> entries</span>
				</div>
				<div>
					<span>Search: </span>
					<input type="text" placeholder="Recherche" value={searchTerm} onChange={handleSearchChange} />
				</div>
			</div>
			<table className={modules.table}>
				<thead>
					<tr className={modules.columnTitle}>
						{columns.map((column) => (
							<th className={modules.columnTitleCell} key={column.key} onClick={() => handleColumnClick(column.key)}>
								{column.label}
								<img className={column.key === sortColumnObject.currentColunm ? (sortOrder.value === "asc" ? modules.iconSortedAsc : modules.iconSortedDesc) : modules.iconUnsorted} 
									src={column.key === sortColumnObject.currentColunm ? (sortOrder.value === "asc" ? caretUp : caretDown) : caretUnsorted} 
									alt="sorting"
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginableData.map((item: any, index: number) => (
						<tr key={index} className={index % 2 === 0? modules.evenRow: modules.oddRow}>
							{columns.map((column) => (
								<td className={`${modules.tableCell} ${column.key === sortColumnObject.currentColunm ? (index % 2 === 0 ? modules.sortedEvenCell : modules.sortedOddCell) : ''}`} key={`${column.key}-${index}`}>{item[column.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<TableFooter range={range} handlePage={setPage} rowPagination={rowPagination} page={page} totalEntriesNb={data.length} />
		</div>
	);
};

export default DataTable;
