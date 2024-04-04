import { sortTable } from '../utils/sortTable.js';

export const setupSortTable = () => {
    const tableHeaders = document.getElementById('contractTable').getElementsByTagName('th');
    for (let i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].addEventListener('click', () => sortTable(i));
    }
};
