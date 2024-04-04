import { createClientForm, handleFormSubmission } from '../clientActions/createClient.js';

export const setupClientForm = () => {
    const createClientButton = document.getElementById('createClientButton');
    const formContainer = document.getElementById('formContainer');

    createClientButton.addEventListener('click', () => {
        const clientForm = createClientForm();
        formContainer.appendChild(clientForm);
        handleFormSubmission(clientForm);
    });
};
