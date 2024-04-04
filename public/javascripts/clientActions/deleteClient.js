import { loadClients } from './loadClientsList.js';

async function deleteClient(clientId) {
    const response = await fetch(`/admin/clients/${clientId}`, {
        method: 'DELETE'
    });

    return response.ok;
}

export async function handleDeleteClient(clientId) {
    if (confirm('Are you sure you want to delete this client?')) {
        const success = await deleteClient(clientId);
        if (success) {
            alert('Client deleted successfully');
            loadClients();
        } else {
            alert('Failed to delete client');
        }
    }
}
