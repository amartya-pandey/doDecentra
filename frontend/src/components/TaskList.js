import { useEffect, useState } from "react";
import { getTasks, removeTask } from "../blockchain";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setTasks(await getTasks());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={async () => { await removeTask(index); fetchTasks(); }}>
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
