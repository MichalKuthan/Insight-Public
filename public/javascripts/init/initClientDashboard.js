import { fetchClientInfo } from '../services/clientService.js';

async function initializeDashboard() {
    const clientData = await fetchClientInfo();

    if (clientData) {
        const dashboardTitle = document.getElementById('dashboardTitle');
        if (dashboardTitle && clientData.name && clientData.surname) {
            dashboardTitle.textContent = `${clientData.name} ${clientData.surname}'s Dashboard`;
        }
    } else {
        console.error('Failed to initialize dashboard with client data');
    }
}

export { initializeDashboard };
