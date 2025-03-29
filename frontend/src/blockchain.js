import { ethers } from "ethers";
import abi from "./abi.json"; // Save your ABI in src/abi.json

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace this

// Your ABI from Hardhat compilation
const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "string", "name": "task", "type": "string" }],
    "name": "TaskAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }],
    "name": "TaskRemoved",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_task", "type": "string" }],
    "name": "addTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTasks",
    "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "removeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Function to get contract instance
export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
