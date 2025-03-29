const { ethers } = require("hardhat");

async function main() {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.waitForDeployment();

    console.log("Contract deployed at:", await todoList.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
