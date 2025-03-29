import { useState, useEffect } from "react";
import { ethers } from "ethers";

function MetaMaskLogin({ setUserAddress }) {
    const [walletAddress, setWalletAddress] = useState(null);

    // Function to connect MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setWalletAddress(accounts[0]);
                setUserAddress(accounts[0]); // Pass address to parent
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("MetaMask is required! Please install MetaMask.");
        }
    };

    // Check if wallet is already connected
    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setUserAddress(accounts[0]);
                }
            }
        };
        checkIfWalletIsConnected();
    }, []);

    return (
        <div>
            {walletAddress ? (
                <p>Connected: {walletAddress}</p>
            ) : (
                <button 
                    onClick={connectWallet} 
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Connect MetaMask
                </button>
            )}
        </div>
    );
}

export default MetaMaskLogin;
