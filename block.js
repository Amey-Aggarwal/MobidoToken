var web3;

async function Connect() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access (MetaMask connection)
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Initialize Web3 with the current provider (MetaMask)
            web3 = new Web3(window.ethereum);
            console.log('Connected to MetaMask');
            alert('Connected to MetaMask successfully!');
        } catch (error) {
            console.error('User denied access', error);
            alert('Access to MetaMask was denied. Please try again.');
        }
    } else if (typeof window.web3 !== 'undefined') {
        // Legacy MetaMask provider
        web3 = new Web3(window.web3.currentProvider);
        console.log('Connected to MetaMask (Legacy)');
        alert('Connected to MetaMask successfully!');
    } else {
        alert('MetaMask is not installed.');
        window.open('https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
    }
}
