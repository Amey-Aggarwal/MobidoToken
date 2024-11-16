// Check if MetaMask is installed by detecting window.ethereum or window.web3
if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
    console.log('MetaMask is installed!');
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', async () => {
        try {
            // Request account access
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            // Get the first account
            const account = accounts[0];
            console.log('Connected account:', account);
            
            // Optionally, you can use the account to send transactions or interact with the blockchain
            alert(`Logged in with account: ${account}`);
        } catch (error) {
            console.error('User denied account access or an error occurred:', error);
        }
    });
} else {
    alert('MetaMask is not installed or not detected. Please install MetaMask to login.');
}
