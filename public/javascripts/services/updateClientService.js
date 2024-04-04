async function updateClientInfo(updatedData) {
    try {
        const response = await fetch('/client/update-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            return { success: true, message: 'Information updated successfully' };
        } else if (response.status === 401) {
            // Handle unauthorized status
            return { success: false, message: 'Wrong current password' };
        } else {
            const errorText = await response.text();
            return { success: false, message: `Failed to update information: ${errorText}` };
        }
    } catch (error) {
        console.error('Error updating client information:', error);
        return { success: false, message: 'Error updating client information' };
    }
}

export default updateClientInfo;

