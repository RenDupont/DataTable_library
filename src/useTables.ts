import { useState, useEffect } from "react";

/**
 * Calcule la plage de numéros de page en fonction du nombre total d'entrées et du nombre d'entrées par page.
 *
 * @param data Les données à paginer
 * @param rowsPerPage Le nombre d'entrées par page
 * @returns Un tableau représentant la plage de numéros de page
 */
const calculateRange = (data: any, rowsPerPage: number) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
};

/**
 * Extrait une tranche de données à afficher sur une page spécifique.
 *
 * @param data Les données à paginer
 * @param page Le numéro de la page à afficher
 * @param rowsPerPage Le nombre d'entrées par page
 * @returns La tranche de données à afficher sur la page spécifiée
 */
const sliceData = (data: any, page: number, rowsPerPage: number) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

/**
 * Hook personnalisé pour la pagination des données.
 *
 * @param data Les données à paginer
 * @param page Le numéro de la page actuelle
 * @param rowsPerPage Le nombre d'entrées par page
 * @returns Un objet contenant les données paginées, la plage de numéros de page et la fonction de mise à jour de la tranche de données
 */
const useTable = (data: any, page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]);
  	const [paginableData, setSlice] = useState<any>([]);

    useEffect(() => {
        // Calcul de la plage de numéros de page
        const range = calculateRange(data, rowsPerPage);
        setTableRange([...range]);
        
        // Extraction de la tranche de données à afficher sur la page spécifiée
        const slice = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);

    }, [data, setTableRange, page, setSlice, rowsPerPage]);
    
    return { paginableData, range: tableRange, setSlice };
};

export default useTable;