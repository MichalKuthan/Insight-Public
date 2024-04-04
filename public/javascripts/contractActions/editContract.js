import { loadContracts } from './loadContractsList.js';

export function editContractForm(contract) {
    const formContainer = document.getElementById('formContainer');
    const contractList = document.getElementById('contractManagement');

    contractList.classList.add('hidden');
    formContainer.classList.remove('hidden');

    let fileSection = contract.filePaths && contract.filePaths.length > 0
        ? `<div class="file-section">`+ 
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

    // Dynamically create the file input button and label
    const fileInputHTML = `
        <div class="form-row">
            <label for="contractFile" class="custom-file-label">Upload your files (PDF):</label>
            <div class="file-input-input">
                <input type="file" id="contractFile" name="contractFile" accept=".pdf" multiple style="visibility: hidden; position: absolute;">
                <button type="button" id="customFileButton">Choose File</button>
            </div>
        </div>
    `;

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
            ${fileSection}
        </div>
    `;

    // Event listener for the custom file input button
    document.getElementById('customFileButton').addEventListener('click', () => {
        document.getElementById('contractFile').click(); 
    });

    const editForm = formContainer.querySelector('#editContractForm');
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);

        try {
            const response = await fetch(`/admin/contracts/${contract._id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                alert('Contract updated successfully');
                formContainer.classList.add('hidden');
                contractList.classList.remove('hidden');
                loadContracts();
            } else {
                alert('Failed to update contract');
            }
        } catch (error) {
            console.error('Error updating contract:', error);
        }
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        formContainer.classList.add('hidden');
        contractList.classList.remove('hidden');
    });

    document.querySelectorAll('.deleteFileButton').forEach(button => {
        button.addEventListener('click', async () => {
            const filePath = button.getAttribute('data-file-path');
            if (confirm(`Are you sure you want to delete this file?`)) {
                try {
                    const response = await fetch(`/admin/contracts/${contract._id}/file?filePath=${encodeURIComponent(filePath)}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert('File deleted successfully');
                        editContractForm(contract); 
                    } else {
                        alert('Failed to delete file');
                    }
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        });
    });
    document.getElementById('contractFile').addEventListener('change', (event) => {
        const input = event.target;
        const label = input.nextElementSibling;
        const fileCount = input.files.length;
    
        if (fileCount === 0) {
            label.innerHTML = 'No file chosen';
        } else {
            label.innerHTML = `Chosen files - ${fileCount}`;
        }
    });
}
