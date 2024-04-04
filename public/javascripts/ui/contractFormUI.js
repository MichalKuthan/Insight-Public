import { loadContracts } from '../javascripts/loadContractsList.js';

// Function to create the file section
function createFileSection(contract) {
    return contract.filePaths && contract.filePaths.length > 0
        ? `<div class="file-section">` +
          contract.filePaths.map(filePath => {
              const fullPath = filePath.replace(/\\/g, '/');
              const fileName = fullPath.split('/').pop();
              const cleanFileName = fileName.substring(fileName.indexOf('-') + 1);

              return `
                <div class="file-row">
                    <div class="file-item">
                        <a href="/client/${fullPath}" target="_blank">
                            <img src="../../images/attachment_blue_icon.png" alt="${cleanFileName}" style="width: 100px; height: 100px;">
                            <div>${cleanFileName}</div>
                        </a>
                        <button type="button" class="deleteFileButton" data-file-path="${filePath}">
                            <img src="../../images/delete_icon.png" alt="Delete File" style="width: 20px; height: 20px;">
                        </button>
                    </div>
                </div>
            `;
          }).join('') +
          `</div>`
        : 'No files attached';
}

// Function to create the file input HTML
function createFileInputHTML() {
    return `
        <div class="form-row">
            <label for="contractFile" class="custom-file-label">Upload your files (PDF):</label>
            <div class="file-input-input">
                <input type="file" id="contractFile" name="contractFile" accept=".pdf" multiple style="visibility: hidden; position: absolute;">
                <button type="button" id="customFileButton">Choose File</button>
            </div>
        </div>
    `;
}

// Function to edit the contract form
export function editContractForm(contract) {
    const formContainer = document.getElementById('formContainer');
    const contractList = document.getElementById('contractManagement');
    formContainer.innerHTML = ''; // Clear any existing content
    contractList.classList.add('hidden');
    formContainer.classList.remove('hidden');

    const fileSectionHTML = createFileSection(contract);
    const fileInputHTML = createFileInputHTML();

    formContainer.innerHTML = `
    <h2>Edit Contract</h2>
    <div class="form-container">
        <form id="editContractForm" class="edit-form">
            <div class="form-row">
                <label for="contractId">Contract ID:</label>
                <input type="text" id="contractId" name="contractId" value="${contract.contractId}" required>
            </div>
            <div class="form-row">
                <label for="clientName">Client Name:</label>
                <input type="text" id="clientName" name="clientName" value="${contract.clientName}" required>
            </div>
            <div class="form-row">
                <label for="service">Service:</label>
                <input type="text" id="service" name="service" value="${contract.service}" required>
            </div>
            <div class="form-row">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" value="${contract.startDate.split('T')[0]}" required>
            </div>
            <div class="form-row">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate" value="${contract.endDate.split('T')[0]}" required>
            </div>
            <div class="form-row">
                <label for="status">Status:</label>
                <select id="status" name="status">
                    <option value="active" ${contract.status === 'active' ? 'selected' : ''}>Active</option>
                    <option value="inactive" ${contract.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                </select>
            </div>
            ${fileInputHTML} <!-- Include the file input button and label -->
            <div class="form-row">
                <button type="submit">Update</button>
                <button type="button" id="cancelButton">Cancel</button>
            </div>
        </form>
        ${fileInputHTML}
        ${fileSectionHTML}
    `;
    setupEventListeners(contract, formContainer, contractList);
}

// Function to setup event listeners for the form
function setupEventListeners(contract, formContainer, contractList) {
    const customFileButton = formContainer.querySelector('#customFileButton');
    const fileInput = formContainer.querySelector('#contractFile');
    const editForm = formContainer.querySelector('#editContractForm');
    const cancelButton = formContainer.querySelector('#cancelButton');
    const deleteFileButtons = formContainer.querySelectorAll('.deleteFileButton');

    customFileButton.addEventListener('click', () => {
        fileInput.click();
    });

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        try {
            const response = await fetch(`/admin/contracts/${contract._id}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) throw new Error('Failed to update the contract.');
            alert('Contract updated successfully.');
            formContainer.classList.add('hidden');
            contractList.classList.remove('hidden');
            loadContracts(); // You might need to update this call as per your app's requirements
        } catch (error) {
            console.error('Error updating contract:', error);
            alert('Failed to update the contract.');
        }
    });
    
    cancelButton.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        contractList.classList.remove('hidden');
        loadContracts(); // Refresh the contract list in case there were changes
    });
    
    deleteFileButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const filePath = button.getAttribute('data-file-path');
            if (confirm('Are you sure you want to delete this file?')) {
                try {
                    const response = await fetch(`/admin/contracts/${contract._id}/file?filePath=${encodeURIComponent(filePath)}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) throw new Error('Failed to delete the file.');
                    alert('File deleted successfully.');
                    editContractForm(contract); // Refresh the form, pass in the updated contract object if needed
                } catch (error) {
                    console.error('Error deleting file:', error);
                    alert('Failed to delete the file.');
                }
            }
        });
    });
    
    fileInput.addEventListener('change', () => {
        const chosenFiles = Array.from(fileInput.files)
            .map(file => file.name)
            .join(', ');
        const fileInputLabel = formContainer.querySelector('.custom-file-label');
        fileInputLabel.textContent = chosenFiles || 'Choose file';
    });
}
    
