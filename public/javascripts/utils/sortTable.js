function sortTable(columnIndex) {
    const table = document.getElementById('contractTable');
    const rows = Array.from(table.getElementsByTagName('tr')).slice(1); // Skip the header row
    let sortOrder = table.dataset.sortOrder || 'asc'; // Default to ascending if no sort order is defined

    rows.sort((a, b) => {
        const valueA = a.cells[columnIndex].textContent.trim();
        const valueB = b.cells[columnIndex].textContent.trim();

        // Perform comparison based on sort order
        let comparison = 0;
        if (valueA > valueB) {
            comparison = 1;
        } else if (valueA < valueB) {
            comparison = -1;
        }

        return sortOrder === 'asc' ? comparison : -comparison; // Invert comparison for descending order
    });

    table.dataset.sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order

    // Append sorted rows to the table
    rows.forEach(row => table.appendChild(row));

    // Remove sort classes from all headers
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc');
        th.classList.remove('sort-desc');
    });

    // Add sort class to the clicked header
    const clickedHeader = table.querySelectorAll('th')[columnIndex];
    clickedHeader.classList.add(sortOrder === 'asc' ? 'sort-asc' : 'sort-desc');
}

export { sortTable };
