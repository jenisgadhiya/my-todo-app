import { useState } from "react";
import "./App.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, newTodo]);
      }
      setNewTodo("");
    }
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo} className="add-todo-btn">
        {editIndex !== null ? "Update Todo" : "Add Todo"}
      </button>
      <ul>
        {todos?.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <div className="action-wrap">
              <button onClick={() => editTodo(index)} className="edit-button">
                Edit
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
