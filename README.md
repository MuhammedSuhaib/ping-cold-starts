# About this Project
It is a basic React todo app the does nothing except 
- Taking Input
- Add that to the Ram using `useState`
- map those Todo items below the input area
- completed status using marked checkbox
- delete that todo

# Learnings from this Project

- This was my first React project 
    (This is not  even a project, just a First Hands on `React` After alot of `Next.js` Projects). 

- `useState` data lives **only in React’s memory (inside the component)**.   
When you refresh the page, React reloads → memory resets → all `useState` values reset.

So:

* not in localStorage
* not in sessionStorage
* not in cookies
* only in React component memory, temporary RAM.

## Lazy vs Eager Store Initialization

When working with Netlify Blobs, the store must be initialized **lazily** — only when the function actually runs — because the Netlify Blobs context isn't available at module import time.

```js
// ❌ Eager — store created immediately when the file is imported
//    Blobs context may not be ready yet → can throw an error
const store = getStore("todos");

// ✅ Lazy — store created only when store() is actually called
//    By then, the function is running and the context is ready
const store = () => getStore("todos");
```

Wrapping `getStore` inside `() =>` defers execution until `store()` is called inside the request handler, making it safe in a serverless environment.

## 🧠 Mental Model — How Data is Stored in Netlify Blobs

Think of Netlify Blobs like a **filing cabinet**:

```
Filing Cabinet  →  Store  (BLOB_STORE_NAME = "todos")
    Drawer      →  Key    (BLOB_LIST_KEY   = "list")
    Paper       →  Value  (the actual JSON array of todos)
```

| Concept | Blob term | Our value | What it is |
|---|---|---|---|
| Filing cabinet | **Store** | `"todos"` | A named bucket that groups related data |
| Drawer label | **Key** | `"list"` | The address of a specific piece of data inside the store |
| Paper inside | **Value** | `[{id, text, completed}, ...]` | The actual data blob stored at that key |

### In code

```js
// Open the filing cabinet called "todos"
const store = () => getStore("todos");

// Read the paper in the drawer labelled "list"
store().get("list", { type: "json" });

// Replace the paper in the drawer labelled "list"
store().setJSON("list", updatedArray);
```

> **Why one key?** The entire todo list is stored as a single JSON array under the key `"list"`.
> There is no row-per-todo — every save overwrites the whole array.
