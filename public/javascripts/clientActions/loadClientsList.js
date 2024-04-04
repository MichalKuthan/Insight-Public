import { handleDeleteClient } from './deleteClient.js';
import { editClientForm } from './editClient.js';

async function loadClients() {
    const response = await fetch('/admin/clients', { method: 'GET' });
    if (response.ok) {
        const clients = await response.json();
        const clientTableBody = document.getElementById('clientTable').getElementsByTagName('tbody')[0];
        clientTableBody.innerHTML = '';

        clients.forEach(client => {
            const row = clientTableBody.insertRow();
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.surname}</td>
                <td>${client.phone}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
                <td>${client.rating}</td>
                <td>
                    <button class="editButton"><img src="../../images/edit_icon.png" alt="Edit" style="width: 20px; height: 20px;"></button>
                    <button class="deleteButton"><img src="../../images/delete_icon.png" alt="Edit" style="width: 20px; height: 20px;"></button>
                </td>
            `;

            row.querySelector('.editButton').addEventListener('click', () => editClientForm(client));
            row.querySelector('.deleteButton').addEventListener('click', () => handleDeleteClient(client._id));
        });
    } else {
        console.error('Failed to load clients:', response.statusText);
    }
}

export { loadClients };
