// async function getBal(account) {
//     try {
//         // Use Web3 to fetch the balance of the account
//         let balance = await window.web3.eth.getBalance(account);
        
//         // Convert the balance from Wei to Ether
//         let balanceInEther = window.web3.utils.fromWei(balance, 'ether');
        
//         // Log the balance in Ether
//         console.log('Balance:', balanceInEther, 'ETH');
//         alert('Balance: ' + balanceInEther + ' ETH');
//     } catch (error) {
//         console.error('Error fetching balance:', error);
//         alert('Error fetching balance.');
//     }
// }