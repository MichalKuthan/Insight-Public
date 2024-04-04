import { createClient } from '../services/clientService.js';
import { loadClients } from "./loadClientsList.js";

function getCreateClientFormHTML() {
    return `
        <h2>Create Client</h2>
        <div class="form-container">
            <form id="createClientForm">
                <div class="form-row">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-row">
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" name="surname" required>
                </div>
                <div class="form-row">
                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" required>
                </div>
                <div class="form-row">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone">
                </div>
                <div class="form-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-row">
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address">
                </div>
                <div class="form-row">
                    <label for="rating">Rating:</label>
                    <input type="number" id="rating" name="rating" min="1" max="5" required>
                </div>
                <div class="form-row">
                    <button type="submit">Save</button>
                    <button type="button" id="cancelButton">Cancel</button>
                </div>
            </form>
        </div>`;
}

export function createClientForm() {
    const clientList = document.getElementById('clientManagement');
    const formContainer = document.getElementById('formContainer');

    clientList.classList.add('hidden');
    formContainer.classList.remove('hidden');
    formContainer.innerHTML = getCreateClientFormHTML();

    return formContainer.querySelector('#createClientForm');
}

export function handleFormSubmission(formElement) {
    const clientList = document.getElementById('clientManagement');
    const formContainer = document.getElementById('formContainer');
    const cancelButton = formElement.querySelector('#cancelButton');

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formElement);
        const clientData = Object.fromEntries(formData.entries());

        // Assign the role 'client' when creating a new client
        clientData.role = 'client';

        const result = await createClient(clientData);

        if (result.success) {
            alert('Client created successfully');
            formContainer.classList.add('hidden');
            clientList.classList.remove('hidden');
            formElement.reset();
            loadClients();
        } else {
            alert('Client NOT created');
        }
    });

    cancelButton.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        clientList.classList.remove('hidden');
    });
}