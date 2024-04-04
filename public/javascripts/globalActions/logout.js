async function initLogout() {
    const logoutButton = document.getElementById('logoutButton');
    if (!logoutButton) return;

    logoutButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', { method: 'GET' });
            if (response.ok) {
                alert('Logout successful');
                window.location.href = '/';
            } else {
                console.error('Failed to log out');
                alert('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Error logging out');
        }
    });
}

export { initLogout };
