# ❌ Avoid Use of MetaMask in doDecentra  

This guide explains how to use **doDecentra** without needing **MetaMask** while still interacting with your **local Hardhat blockchain**.  

---

## 🚀 Running doDecentra Without MetaMask  

Instead of using MetaMask, we'll directly use **Hardhat's local blockchain** with a default private key and provider.

---

## 🛠️ Step 1: Start Hardhat Blockchain  

Before running doDecentra, make sure the **local blockchain** is running.  

```sh
npx hardhat node
```

This will start a blockchain on `http://127.0.0.1:8545` and generate **test accounts with ETH**.

---

## 🛠️ Step 2: Deploy the Smart Contract  

Now, deploy your contract to the local blockchain:  

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Copy the **contract address** from the output and save it for later.

---

## 🛠️ Step 3: Modify `blockchain.js`  

Since we're not using MetaMask, we need to connect directly using a Hardhat test account.  

### 📜 `blockchain.js`  

```javascript
import { ethers } from "ethers";
import contractABI from "./abi.json"; // Ensure this file contains your ABI

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
const RPC_URL = "http://127.0.0.1:8545"; // Hardhat's local network
const PRIVATE_KEY = "YOUR_HARDHAT_TEST_PRIVATE_KEY"; // Replace with a Hardhat private key

export const getContract = async () => {
    try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        return new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);
    } catch (error) {
        console.error("Error connecting to contract:", error);
        return null;
    }
};
```

🔹 **Replace** `YOUR_DEPLOYED_CONTRACT_ADDRESS` with the address from the deployment step.  
🔹 **Replace** `YOUR_HARDHAT_TEST_PRIVATE_KEY` with a **private key** from `npx hardhat node`.  

---

## 🛠️ Step 4: Start the Frontend  

Run your frontend without MetaMask:

```sh
npm run dev
```

Now, **doDecentra** will work without requiring MetaMask, using a test account from **Hardhat**.

---

## 🛠️ Step 5: Testing  

Try **adding and removing tasks**. All transactions will be signed automatically using the test wallet.  

---

## 🎯 Conclusion  

✅ You've successfully configured **doDecentra** to work without MetaMask! 🎉  
Instead of signing transactions manually, your app now uses a **local test wallet** to interact with the blockchain.