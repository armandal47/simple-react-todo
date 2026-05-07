import { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    const value = text.trim();
    if (!value) return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = value;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, value]);
    }

    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addTask();
  };

  const deleteTask = (i) => {
    setTodos(todos.filter((_, index) => index !== i));
  };

  const editTask = (i) => {
    setText(todos[i]);
    setEditIndex(i);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={addTask}>
          {editIndex !== null ? "Update" : "Add Task"}
        </button>
      </div>

      <ul>
        {todos.map((task, index) => (
          <li key={index} className="item">
            <span>{task}</span>
            <div>
              <span className="edit" onClick={() => editTask(index)}>
                edit
              </span>
              <span className="delete" onClick={() => deleteTask(index)}>
                remove
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
