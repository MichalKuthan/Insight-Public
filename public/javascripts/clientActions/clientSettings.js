import updateClientInfo from '../services/updateClientService.js';
import { showAlert, reloadPage } from '../ui/clientSettingsUI.js';
import { fetchClientInfo } from "../services/clientService.js";



function createClientSettingsFormHTML(client) {
    return `
        <h2>Client Settings</h2>
        <div class="form-container">
            <form id="clientSettingsForm">
                <div class="form-row">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${client.name || ''}" required>
                </div>
                <div class="form-row">
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" name="surname" value="${client.surname || ''}" required>
                </div>
                <div class="form-row">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value="${client.phone || ''}">
                </div>
                <div class="form-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${client.email || ''}" required>
                </div>
                <div class="form-row">
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" value="${client.address || ''}">
                </div>
                <div class="form-row">
                    <label for="current-password">Current Password:</label>
                    <input type="password" id="current-password" name="currentPassword" required>
                </div>
                <div class="form-row">
                    <label for="new-password">New Password:</label>
                    <input type="password" id="new-password" name="newPassword">
                </div>
                <div class="form-row">
                    <button type="submit">Update</button>
                    <button type="button" id="clientSettingsCancelButton">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
    };

    const result = await updateClientInfo(updatedData);

    showAlert(result.message); // Show success or error message
    if (result.success) {
        reloadPage(); // Reload page if update was successful
    }
}

function setupFormEventListeners() {
    const form = document.getElementById('clientSettingsForm');
    form.addEventListener('submit', handleSubmit);

    const cancelButton = document.getElementById('clientSettingsCancelButton');
    cancelButton.addEventListener('click', reloadPage);
}

export async function clientSettingsForm() {
    const client = await fetchClientInfo();

    if (!client) {
        showAlert('Failed to load client information.');
        return;
    }

    const clientManagement = document.getElementById('clientManagement');
    clientManagement.innerHTML = createClientSettingsFormHTML(client);

    setupFormEventListeners(); 
}
