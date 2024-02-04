import Web3 from 'web3';
import ABI from './ABI.json';

const contract_adrress = process.env.REACT_APP_CONTRACT_ADDRESS

export async function doLogin(){
    if(!window.ethereum) throw new Error('MetaMask not found')
    
    const web3 = Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();

    if(!accounts || !accounts.length) throw new Error('No Wallet');

    localStorage.setItem('wallet', accounts[0]);
    return accounts[0];
}

function getContract() {
    const wallet = localStorage.getItem('wallet')
    if(!wallet) throw new Error('No Wallet');

    const web3 = Web3(window.ethereum);
    return contract = new web3.eth.Contract(ABI, contract_adrress , {from:wallet}); // Application Binary Aplicationn  - https://remix.ethereum.org
}

export async function getCurrentVoting() {
    const contract = getContract();
    return contract.methods.getCurrentVoting().call();
}
export async function addVote(choice) {
    const contract = getContract();
    return contract.methods.addVote(choice).send();
}