import { createContractForm, handleContractSubmission } from '../contractActions/createContract.js';

export const setupContractForm = (formContainer, contractManagement) => {
    const createContractButton = document.getElementById('createContractButton');
    createContractButton.addEventListener('click', () => {
        console.log('Create Contract Button clicked');
        formContainer.innerHTML = ''; // Clear any existing form before creating a new one
        const contractForm = createContractForm();
        formContainer.appendChild(contractForm);
        handleContractSubmission(contractForm);
        formContainer.classList.remove('hidden');
        contractManagement.classList.add('hidden');
    });
};
