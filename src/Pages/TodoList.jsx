import React, { useState, useEffect } from "react";

const TodoList = () => {
  // Store todos as objects with id, text, and done status
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from jsonplaceholder.typicode.com/todos on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        // Transform each todo so that title becomes text and completed becomes done
        const transformed = data.map((todo) => ({
          id: todo.id,
          text: todo.title,
          done: todo.completed,
        }));
        setTodos(transformed);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(), // Use Date.now() for new tasks
      text: task.trim(),
      done: false,
    };
    setTodos((prev) => [...prev, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (id) => {
    // Confirm deletion with an alert
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 p-2 border rounded mr-2"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTask(todo.id)}
                    className="mr-2"
                  />
                  <span
                    className={todo.done ? "line-through text-gray-500" : ""}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(todo.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;