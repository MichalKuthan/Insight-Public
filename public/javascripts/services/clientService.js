async function createClient(clientData) {
    const response = await fetch('/admin/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    });

    if (response.ok) {
        return { success: true, message: 'Client created successfully' };
    } else {
        const errorText = await response.text();
        return { success: false, message: `Failed to create client: ${errorText}`, status: response.status };
    }
}

export { createClient };



async function updateClient(clientId, clientData) {
    const response = await fetch(`/admin/clients/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    });

    if (response.ok) {
        return { success: true, message: 'Client updated successfully' };
    } else {
        const errorText = await response.text();
        return { success: false, message: `Failed to update client: ${errorText}` };
    }
}

export { updateClient };



async function fetchClientInfo() {
    try {
        const response = await fetch('/current-client', { method: 'GET' });
        if (response.ok) {
            return await response.json();  // Return the client data
        } else {
            console.error('Failed to fetch client data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching client data:', error);
        return null;
    }
}

export { fetchClientInfo };

