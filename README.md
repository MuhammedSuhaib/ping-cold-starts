# Todo List (React + Netlify Blobs)

Basic React todo app. Todos are persisted in **Netlify Blobs**.

## Features
- Add / Edit / Delete / Toggle todos
- On every change the **whole list** is written to Blobs
- On load the list is read from Blobs

## API
- `GET  /api/todos` → returns the list
- `POST /api/todos` → body = full array of todos → saves to Blobs

Store: `todos` · Key: `list`

## Deploy
1. Link this repo to Netlify
2. Deploy (functions + Blobs work automatically)
3. Use the app — todos survive refreshes

Local: `netlify dev` (needed for `/api/todos` + Blobs)
