// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    string[] private tasks;

    event TaskAdded(string task);
    event TaskRemoved(uint256 index);

    function addTask(string memory _task) public {
        tasks.push(_task);
        emit TaskAdded(_task);
    }

    function getTasks() public view returns (string[] memory) {
        return tasks;
    }

    function removeTask(uint256 _index) public {
        require(_index < tasks.length, "Invalid index");
        tasks[_index] = tasks[tasks.length - 1];
        tasks.pop();
        emit TaskRemoved(_index);
    }
}
