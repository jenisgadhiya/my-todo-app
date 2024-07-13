import { useEffect, useState } from "react";
import "./App.css";
import instance from "./axios";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await instance.get("/todos");
      setTodos(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      if (editIndex !== null) {
        try {
          const response = await instance.put(`/todos/${todos[editIndex].id}`, {
            text: newTodo,
          });
          const updatedTodos = [...todos];
          updatedTodos[editIndex] = response.data;
          setTodos(updatedTodos);
          setEditIndex(null);
        } catch (error) {
          console.error("Failed to edit todo:", error);
        }
      } else {
        try {
          const response = await instance.post("/todos", { text: newTodo });
          setTodos([...todos, response.data]);
        } catch (error) {
          console.error("Failed to add todo:", error);
        }
      }
      setNewTodo("");
    }
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]?.text);
    setEditIndex(index);
  };

  const deleteTodo = async (index) => {
    try {
      await instance.delete(`/todos/${todos[index].id}`);
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
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
            <span>{todo?.text}</span>
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
