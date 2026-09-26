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
      <div className="max-w-lg mx-auto p-6 text-center">Loading cold-start registry...</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="text-center space-y-1.5 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
           🥶<a href="https://www.fontspace.com/category/lettering"><img src="https://see.fontimg.com/api/rf5/dE0g/NmU5ZTRmNmJkZGFkNDMzNjg3YWFmMjk2NjUzMGY4YTEudHRm/UGluZyBDb2xkIFN0YXJ0/beautiful-people-personal-use.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65" alt="Lettering fonts"/></a>
        </h1>
        <p className="text-gray-500 text-sm font-normal">
          Prevent serverless apps from sleeping by registering their URLs for automated pings.
        </p>
      </header>

      {/* Input Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
      <div className="flex gap-2">
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Enter endpoint URL (e.g. https://my-app.hf.space)"
          className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 px-4 py-2.5 rounded-lg "
        />
        <button
          onClick={addTodo}
          className="text-slate-950 font-semibold px-6 py-2.5 rounded-lg transition text-sm flex items-center gap-1 shrink-0"
        >
          Add
        </button>
      </div>
    </div>

      {/* Endpoints List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 px-1 font-medium">
          <span>Registered Endpoints ({todos.length})</span>
          <span>Double-click text to edit</span>
        </div>

        {todos.length === 0 ? (
          <div className="rounded-xl p-8 text-center text-slate-500 text-sm">
            No endpoints added yet. Paste your app URL above!
          </div>
        ) : (
          <ul className="space-y-2.5">
            {todos.map((todo) => {
              const isUrl = /^https?:\/\//i.test(todo.text);
              return (
                <li
                  key={todo.id}
                  className={`flex items-center p-3.5 bg-slate-800 border ${
                    todo.completed
                      ? "border-slate-800/80 opacity-60"
                      : "border-slate-700/80"
                  } rounded-xl shadow-sm hover:border-slate-600 transition gap-3`}
                >
                  {/* Active/Pause toggle */}
                  <input
                    type="checkbox"
                    checked={!!todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 bg-slate-900 cursor-pointer"
                  />

                  {/* Content */}
                  {editingId === todo.id ? (
                    <input
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      onBlur={saveEdit}
                      className="flex-1 px-3 py-1 border rounded text-sm"
                    />
                  ) : (
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span
                        onDoubleClick={() => startEdit(todo)}
                        className={`${
                          todo.completed
                            ? "line-through text-slate-500"
                            : "text-slate-200"
                        } truncate text-sm cursor-pointer`}
                        title="Double-click to edit"
                      >
                        {todo.text}
                      </span>
                      {isUrl && (
                        <a
                          href={todo.text}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-[10px] bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-2 py-0.5 rounded font-mono transition flex items-center gap-1"
                          title="Open URL in new tab"
                        >
                          <span>URL</span>
                          <svg
                            className="w-2.5 h-2.5 opacity-70"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-slate-400 hover:text-amber-400 p-1.5 rounded hover:bg-slate-700/50 transition text-xs font-medium"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-400 hover:text-rose-400 p-1.5 rounded hover:bg-slate-700/50 transition text-xs font-medium"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
