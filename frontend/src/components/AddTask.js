import { useState } from "react";
import { addTask } from "../blockchain";

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      await addTask(task);
      onTaskAdded(); // Refresh tasks
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
