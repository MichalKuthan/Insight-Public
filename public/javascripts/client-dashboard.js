import { setupClientInfo } from './init/initClientInfo.js';
import { setupContractsList } from './init/initContracts.js';
import { setupContractForm } from './init/initContractForm.js';
import { setupSettingsForm } from './init/initSettingsForm.js';
import { setupSortTable } from './init/initSortTable.js';
import { initLogout } from './globalActions/logout.js';
import { initializeDashboard } from './init/initClientDashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const mainContent = document.getElementById('mainContent');
    const clientManagement = document.getElementById('clientManagement');

    setupClientInfo();
    initLogout();
    setupContractsList();
    setupContractForm(formContainer, clientManagement);
    setupSettingsForm(mainContent, clientManagement);
    setupSortTable();
    initializeDashboard(); 
});
