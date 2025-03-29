import { useState, useEffect } from "react";
import { getContract } from "./blockchain";
import "./App.css"; // Import custom CSS

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const contract = await getContract();
            if (contract) {
                const taskList = await contract.getTasks();
                setTasks(taskList);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!newTask.trim()) return;
        setLoading(true);
        try {
            const contract = await getContract();
            await contract.addTask(newTask);
            setTasks([...tasks, newTask]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
        setLoading(false);
    };

    const removeTask = async (index) => {
        setLoading(true);
        try {
            const contract = await getContract();
            await contract.removeTask(index);
            setTasks(tasks.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error removing task:", error);
        }
        setLoading(false);
    };

    return (
        <div className="app-container">
            <header>
                <h1>Todo List App</h1>
            </header>

            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask} disabled={loading}>
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </div>

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span>{task}</span>
                        <button onClick={() => removeTask(index)}>&times;</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
