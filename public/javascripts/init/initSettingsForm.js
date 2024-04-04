import { clientSettingsForm } from '../clientActions/clientSettings.js';

export const setupSettingsForm = (mainContent, clientManagement) => {
    const settingsButton = document.getElementById('settingsButton');
    settingsButton.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        clientSettingsForm();
        clientManagement.classList.remove('hidden');
    });
};
