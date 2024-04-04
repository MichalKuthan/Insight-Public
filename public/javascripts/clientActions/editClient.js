import { loadClients } from './loadClientsList.js';
import { updateClient } from '../services/clientService.js';

function getEditClientFormHTML(client) {
    return `
        <h2>Edit Client</h2>
        <div class="form-container">
            <form id="editClientForm">
                <div class="form-row">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${client.name}" required>
                </div>
                <div class="form-row">
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" name="surname" value="${client.surname}" required>
                </div>
                <div class="form-row">
                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" value="${client.password}" required>
                </div>
                <div class="form-row">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value="${client.phone}">
                </div>
                <div class="form-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${client.email}" required>
                </div>
                <div class="form-row">
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" value="${client.address}">
                </div>
                <div class="form-row">
                    <label for="rating">Rating:</label>
                    <input type="number" id="rating" name="rating" value="${client.rating}" min="1" max="5" required>
                </div>
                <div class="form-row">
                    <button type="submit">Update</button>
                    <button type="button" id="cancelButton">Cancel</button>
                </div>
            </form>
        </div>    
    `;
}

export function editClientForm(client) {
    const formContainer = document.getElementById('formContainer');
    const clientList = document.getElementById('clientManagement');

    clientList.classList.add('hidden');
    formContainer.classList.remove('hidden');
    formContainer.innerHTML = getEditClientFormHTML(client);

    const editForm = formContainer.querySelector('#editClientForm');
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const updatedData = Object.fromEntries(formData.entries());

        const result = await updateClient(client._id, updatedData);

        alert(result.message);
        if (result.success) {
            formContainer.classList.add('hidden');
            clientList.classList.remove('hidden');
            loadClients();
        }
    });

    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        clientList.classList.remove('hidden');
    });
}
