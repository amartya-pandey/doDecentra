import { useState, useEffect } from "react";
import { getContract } from "./blockchain";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the contract
  const fetchTasks = async () => {
    const contract = await getContract();
    if (contract) {
      try {
        const taskList = await contract.getTasks();
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const contract = await getContract();
    if (contract) {
      try {
        const tx = await contract.addTask(newTask);
        await tx.wait();
        setNewTask("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Remove a task
  const removeTask = async (index) => {
    const contract = await getContract();
    if (contract) {
      try {
        const tx = await contract.removeTask(index);
        await tx.wait();
        fetchTasks();
      } catch (error) {
        console.error("Error removing task:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Todo List DApp</h1>
      <input
        type="text"
        placeholder="Enter a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
