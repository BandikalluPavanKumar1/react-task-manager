import { useState, useEffect } from "react";
import Task from "./components/Task";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load from localStorage (on first render)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="container">
      <h1>⚛️ React Task Manager</h1>

      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      ))}
    </div>
  );
}

export default App;
