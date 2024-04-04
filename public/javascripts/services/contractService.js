export async function getContracts() {
    try {
        const response = await fetch('/client/contracts', { method: 'GET' });
        if (!response.ok) throw new Error('Failed to load contracts');
        const contracts = await response.json();
        return contracts;
    } catch (error) {
        console.error('Error in getContracts:', error);
        throw error;
    }
}
