import { useState, useEffect, useCallback } from "react";

// Netlify function URL — set via REACT_APP_API_URL in .env
const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // id of the todo being edited
  const [editText, setEditText] = useState("");      // draft text while editing

  // Fetch todos from Netlify Blobs on first render
  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const contentType = r.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON (Netlify CLI not running locally)");
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setTodos(data);
      })
      .catch((err) => console.warn("Could not load stored todos:", err.message))
      .finally(() => setLoading(false));
  }, []);

  // Update local state + persist the full list to Netlify Blobs
  const saveTodos = useCallback(async (next) => {
    setTodos(next);
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
    } catch (e) {
      console.error("Failed to save todos", e);
    }
  }, []);

  // Add a new todo; ignore empty input
  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    saveTodos([...todos, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

  // Toggle completed status of a single todo
  const toggleTodo = (id) => {
    saveTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Remove a todo by id
  const deleteTodo = (id) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  // Enter edit mode for a todo
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Commit edit — delete todo if text is cleared, otherwise update
  const saveEdit = () => {
    if (!editText.trim()) {
      deleteTodo(editingId);
    } else {
      saveTodos(
        todos.map((t) =>
          t.id === editingId ? { ...t, text: editText.trim() } : t
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  // Show loading state while fetching initial data
  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">Loading todos…</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>

      {/* Input row */}
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a URL or todo"
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-md transition gap-2"
          >
            {/* Completed toggle */}
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />

            {/* Inline edit input or display text */}
            {editingId === todo.id ? (
              <input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                onBlur={saveEdit}
                className="flex-1 px-2 py-1 border rounded"
              />
            ) : (
              <span
                onDoubleClick={() => startEdit(todo)}
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                } flex-1 cursor-pointer`}
                title="Double-click to edit"
              >
                {todo.text}
              </span>
            )}

            <button
              onClick={() => startEdit(todo)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
