import React from "react";
import modules from './TableFooter.module.css';

// Définition des types pour les props du composant TableFooter
interface TableFooterProps {
	range: number[];
	handlePage: (page: number) => void;
	page: number;
	rowPagination: number;
    totalEntriesNb: number;
}

/**
 * Composant TableFooter pour naviguer et afficher les informations de pagination et le nombre d'entrées dans le tableau.
 *
 * @param range La plage de numéros de page à afficher
 * @param handlePage La fonction de gestion du changement de page
 * @param page Le numéro de page actuel
 * @param rowPagination Le nombre d'entrées par page
 * @param totalEntriesNb Le nombre total d'entrées dans le tableau
 * @returns Le composant TableFooter
 */
const TableFooter:React.FC<TableFooterProps> = ({ range, handlePage, rowPagination, page, totalEntriesNb }) => {

    // Calcul de l'entrée de départ et de fin affichées dans le pied de page
    const startEntry = (page - 1) * rowPagination + 1;
    const endEntry = Math.min(page * rowPagination, totalEntriesNb);

    let displayedRange: number[] = [];

    // Logique pour déterminer la plage de pages à afficher dans le pied de page
    if (range.length <= 3) {
        displayedRange = range;
    } else {
        const midIndex = Math.min(Math.max(page - 2, 0), range.length - 3);
        displayedRange = range.slice(midIndex, midIndex + 3);
    }

    // Fonction pour aller à la page précédente
    const goToPreviousPage = () => {
        if (page > 1) {
            handlePage(page - 1);
        }
    };

    // Fonction pour aller à la page suivante
    const goToNextPage = () => {
        if (page < range.length) {
            handlePage(page + 1);
        }
    };

    // Rendu du composant TableFooter
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