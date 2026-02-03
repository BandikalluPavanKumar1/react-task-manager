function Task({ task, onDelete, onToggle }) {
  return (
    <div className="task">
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>❌</button>
    </div>
  );
}

export default Task;
