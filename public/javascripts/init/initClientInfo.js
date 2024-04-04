import { fetchClientInfo } from "../services/clientService.js";

export const setupClientInfo = async () => {
    const clientInfo = await fetchClientInfo();
    
};

