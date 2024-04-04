import { setupLogout } from './init/initLogout.js';
import { setupClientsList } from './init/loadClients.js';
import { setupClientForm } from './init/clientForm.js';

document.addEventListener('DOMContentLoaded', () => {
    setupLogout();
    setupClientsList();  
    setupClientForm();
    
});
