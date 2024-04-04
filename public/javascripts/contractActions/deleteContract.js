import { loadContracts } from './loadContractsList.js';

export async function deleteContract(contractId) {
    if (confirm('Are you sure you want to delete this contract?')) {
        const response = await fetch(`/admin/contracts/${contractId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Contract deleted successfully');
            loadContracts();
        } else {
            alert('Failed to delete contract');
        }
    }
}
