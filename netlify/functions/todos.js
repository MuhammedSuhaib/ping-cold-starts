import { getStore } from "@netlify/blobs";

// Read env vars once at module load
const STORE_NAME = process.env.BLOB_STORE_NAME;
const LIST_KEY = process.env.BLOB_LIST_KEY;

// Lazy store accessor for the "todos" blob store
const store = () => getStore(STORE_NAME);

export default async (req) => {
  // Same-origin — only Content-Type needed
  const headers = { "Content-Type": "application/json" };

  try {
    // Return the stored todo list
    if (req.method === "GET") {
      const data = await store().get(LIST_KEY, { type: "json" });
      return new Response(JSON.stringify(data || []), { status: 200, headers });
    }

    // Replace the entire todo list with the posted array
    if (req.method === "POST") {
      const body = await req.json();
      const list = Array.isArray(body) ? body : []; // guard: ensure array
      await store().setJSON(LIST_KEY, list);
      return new Response(JSON.stringify({ ok: true, count: list.length }), {
        status: 200,
        headers,
      });
    }

    // Any other method is not supported
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (err) {
    // Unexpected server error
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers,
    });
  }
};

