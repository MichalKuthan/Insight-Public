import { getContracts } from '../services/contractService.js';
import { updateContractTable } from '../ui/contractTableUI.js';

export async function loadContracts() {
    try {
        const contracts = await getContracts();
        updateContractTable(contracts);
    } catch (error) {
        console.error('Failed to load and display contracts:', error);
    }
}
