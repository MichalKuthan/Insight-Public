import { loadContracts } from "./loadContractsList.js";

export function createContractForm() {
    const formContainer = document.getElementById('formContainer');
    const contractList = document.getElementById('contractManagement');

    // Hide the contract list and show the form container
    contractList.classList.add('hidden');
    formContainer.classList.remove('hidden');

    const formHTML = `
    <h2>Create Contract</h2>
    <div class="form-container">
        <form id="createContractForm" enctype="multipart/form-data">
            <div class="form-row">
                <label for="contractId">Contract ID:</label>
                <input type="text" id="contractId" name="contractId" required>
            </div>
            <div class="form-row">
                <label for="clientName">Client Name:</label>
                <input type="text" id="clientName" name="clientName" required>
            </div>
            <div class="form-row">
                <label for="service">Service:</label>
                <input type="text" id="service" name="service" required>
            </div>
            <div class="form-row">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" required>
            </div>
            <div class="form-row">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate" required>
            </div>
            <div class="form-row">
                <label for="status">Status:</label>
                <select id="status" name="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <!-- Custom file input button and label -->
            <div class="form-row">
                <label for="contractFile" class="custom-file-label">Contract File (PDF):</label>
                <div class="file-input-input">
                    <button type="button" id="customFileButton">Choose File</button>
                    <input type="file" id="contractFile" name="contractFile" accept=".pdf" multiple style="visibility: hidden; position: absolute;">
                </div>
            </div>
            <!-- End of custom file input button and label -->
            <div class="form-row">
                <button type="submit">Save</button>
                <button type="button" id="cancelButton">Cancel</button>
            </div>
        </form>
    </div>
    `;
    formContainer.innerHTML = formHTML;

    // Event listener for the custom file input button
    document.getElementById('customFileButton').addEventListener('click', () => {
        document.getElementById('contractFile').click(); 
    });

    return formContainer.querySelector('#createContractForm');
}

export function handleContractSubmission(formElement) {
    const formContainer = document.getElementById('formContainer');
    const contractList = document.getElementById('contractManagement');

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formElement);
        
        try {
            const response = await fetch('/client/contracts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Contract created successfully');
                formContainer.classList.add('hidden');
                contractList.classList.remove('hidden');
                formElement.reset();
                loadContracts();  // Refresh the contract list
            } else if (response.status === 500 || response.status === 409 ) { 
                alert('A contract with this ID already exists.');
            } else {
                const errorText = await response.text();
                alert(`Failed to create contract: ${errorText}`);
            }
        } catch (error) {
            console.error('Error creating contract:', error);
        }
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        formContainer.innerHTML = ''; // Clear the form content
        formContainer.classList.add('hidden');
        contractManagement.classList.remove('hidden');
    });

    // Event listener for the file input change
    document.getElementById('contractFile').addEventListener('change', (event) => {
        const input = event.target;
        const label = input.previousElementSibling; 
        const fileCount = input.files.length;

        if (fileCount === 0) {
            label.textContent = 'No file chosen';
        } else {
            label.textContent = `Chosen files - ${fileCount}`;
        }
    });
}