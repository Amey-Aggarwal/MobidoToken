const provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "0xfcDc46E10377304FeF90746F99C39ECf748dc29B";
const rewardTokenAddress = senderAddress;

// ABI for the TransactionReward contract (simplified version)
const abi = [
    "function recordTransaction() public",
    "function getTransactionCount(address user) public view returns (uint256)",
    "function getRewardsGiven(address user) public view returns (uint256)",
    "function issueReward(address user) public",
    "event RewardGiven(address indexed user, uint256 amount)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

const recordTransactionButton = document.getElementById('recordTransaction');
const redeemRewardsButton = document.getElementById('redeemRewards');

// Connect to MetaMask
async function connectWallet() {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        alert('Please install MetaMask to interact with this website.');
        return null;
    }
}

// Get current account
async function getCurrentAccount() {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
}

// Update transaction count from backend
async function updateTransactionDetails(userAddress) {
    try {
        const response = await fetch(`http://localhost:3000/api/transactionCount/${userAddress}`);
        const data = await response.json();
        document.getElementById('transactionCount').textContent = data.transactionCount.toString();
    } catch (error) {
        console.error('Error fetching transaction details:', error);
    }
}

// Record a transaction and update count
async function recordTransaction() {
    const signer = await provider.getSigner();
    const userAddress = await getCurrentAccount();

    // Call the smart contract to record the transaction
    const contractWithSigner = contract.connect(signer);
    try {
        const tx = await contractWithSigner.recordTransaction();
        await tx.wait(); // Wait for transaction to be mined
        
        // Send the transaction count to the backend for persistence
        await fetch(`http://localhost:3000/api/recordTransaction/${userAddress}`, {
            method: 'POST'
        });

        alert('Transaction recorded successfully!');
        updateTransactionDetails(userAddress);
    } catch (error) {
        console.error('Error recording transaction:', error);
        alert('Error recording transaction.');
    }
}

// Redeem rewards (this part remains unchanged from previous code)
async function redeemRewards() {
    const signer = await provider.getSigner();
    const userAddress = await getCurrentAccount();
    
    const contractWithSigner = contract.connect(signer);
    try {
        const tx = await contractWithSigner.issueReward(userAddress);
        await tx.wait(); // Wait for transaction to be mined
        alert('Rewards redeemed successfully!');
        updateTransactionDetails(userAddress);
    } catch (error) {
        console.error('Error redeeming rewards:', error);
        alert('Error redeeming rewards.');
    }
}

// Event listeners for buttons
recordTransactionButton.addEventListener('click', recordTransaction);
redeemRewardsButton.addEventListener('click', redeemRewards);

// Initial setup: Connect wallet and load details
async function init() {
    await connectWallet();
    const userAddress = await getCurrentAccount();
    updateTransactionDetails(userAddress);
}

init();
