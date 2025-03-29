# 🔗 Connect MetaMask to doDecentra  

This guide will help you **connect MetaMask** to your **local Ethereum blockchain** and interact with the **doDecentra** smart contract.  

---

## 📥 Install MetaMask  

1️⃣ Install the **MetaMask extension** for your browser:  
🔗 [Download MetaMask](https://metamask.io/download/)  

2️⃣ **Create a wallet** (or import an existing one).  

---

## 🔄 Switch to Localhost Network  

Since you're using a **local blockchain** (Hardhat), you need to **connect MetaMask** to it.  

1️⃣ Open **MetaMask**.  
2️⃣ Click on the **network dropdown** (top-right).  
3️⃣ Click **"Add Network"** → **"Add a network manually"**.  
4️⃣ Enter the following details:  

- **Network Name:** Hardhat Localhost  
- **New RPC URL:** `http://127.0.0.1:8545`  
- **Chain ID:** `31337`  
- **Currency Symbol:** ETH  

5️⃣ Click **Save**, then **switch to this network**.  

---

## 🔑 Import Hardhat Test Account  

When you start your Hardhat blockchain (`npx hardhat node`), it provides **test accounts** with ETH.  

1️⃣ In **MetaMask**, click **Profile Icon → Import Account**.  
2️⃣ Copy any **private key** from your Hardhat terminal.  
3️⃣ Paste it into MetaMask and click **Import**.  

Now, you have an account with **test ETH**! 🎉  

---

## 🔗 Connect MetaMask in doDecentra  

Inside the **React frontend**, update the **blockchain.js** file to connect MetaMask.  

### 📜 `blockchain.js`  

```javascript
import { ethers } from "ethers";
import contractABI from "./abi.json"; // Ensure this file contains your ABI

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address

export const getContract = async () => {
    if (!window.ethereum) {
        alert("MetaMask is required!");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    } catch (error) {
        console.error("Error connecting to contract:", error);
        return null;
    }
};
```

🔹 **Replace `YOUR_DEPLOYED_CONTRACT_ADDRESS`** with your deployed contract address (found in `npx hardhat run scripts/deploy.js --network localhost`).  

---

## 🖱️ Connecting MetaMask in the UI  

Modify your **App.jsx** file to add a "Connect Wallet" button.  

### 📜 `App.jsx`  

```javascript
import { useState, useEffect } from "react";
import { getContract } from "./blockchain";

function App() {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        } else {
            alert("Please install MetaMask.");
        }
    };

    return (
        <div>
            <h1>doDecentra - Decentralized Todo List</h1>
            <button onClick={connectWallet}>
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect MetaMask"}
            </button>
        </div>
    );
}

export default App;
```

---

## ✅ Testing  

1️⃣ Start your **Hardhat blockchain**:  

```sh
npx hardhat node
```

2️⃣ Deploy your **smart contract**:  

```sh
npx hardhat run scripts/deploy.js --network localhost
```

3️⃣ Copy the **contract address** from the output and paste it into **blockchain.js**.  

4️⃣ Run the frontend:  

```sh
npm run dev
```

5️⃣ Open `http://localhost:5173` and click **Connect MetaMask**.  

You’re now **connected to the blockchain!** 🚀  

---

## 🛠️ Troubleshooting  

- **MetaMask not detecting network?** Ensure Hardhat is running (`npx hardhat node`).  
- **No contract found?** Deploy it first (`npx hardhat run scripts/deploy.js --network localhost`).  
- **No ETH in account?** Import a Hardhat test account into MetaMask.  

---

## 🎯 Conclusion  

✅ You’ve successfully connected **MetaMask** to your **doDecentra** DApp! 🎉  
You can now interact with your **decentralized todo list** using blockchain transactions.  