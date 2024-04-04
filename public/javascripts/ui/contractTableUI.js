import { formatDate } from '../utils/formatDate.js';
import { editContractForm } from '/javascripts/contractActions/editContract.js';
import { deleteContract } from '/javascripts/contractActions/deleteContract.js';

// Helper function to create a single contract row
function createContractRow(contract) {
    const row = document.createElement('tr');

    // Generate attachment icons HTML
    const attachmentIcons = contract.filePaths && contract.filePaths.length > 0
        ? contract.filePaths.map(filePath => 
            `<a href="/client/${filePath}" target="_blank">
                <img src="../../images/attachment_icon.png" alt="Attachment" style="width: 20px; height: 20px;">
            </a>`
          ).join('')
        : 'None';

    // Set inner HTML of the row
    row.innerHTML = `
        <td>${contract.contractId}</td>
        <td>${contract.clientName}</td>
        <td>${contract.service}</td>
        <td>${formatDate(contract.startDate)}</td>
        <td>${formatDate(contract.endDate)}</td>
        <td>${contract.status}</td>
        <td>${attachmentIcons}</td>
        <td>
            <button class="editButton"><img src="../../images/edit_icon.png" alt="Edit" style="width: 20px; height: 20px;"></button>
            <button class="deleteButton"><img src="../../images/delete_icon.png" alt="Delete" style="width: 20px; height: 20px;"></button>
        </td>
    `;

    // Attach event listeners to the buttons within this row
    const editButton = row.querySelector('.editButton');
    const deleteButton = row.querySelector('.deleteButton');

    editButton.addEventListener('click', () => editContractForm(contract));
    deleteButton.addEventListener('click', () => deleteContract(contract._id));

    return row;
}

// Function to update the entire contract table
export function updateContractTable(contracts) {
    const contractTableBody = document.getElementById('contractTable').querySelector('tbody');
    contractTableBody.innerHTML = ''; 

    contracts.forEach(contract => {
        const row = createContractRow(contract);
        contractTableBody.appendChild(row); // Append each new row to the table body
    });

  
}
