import { getStore } from "@netlify/blobs";

// Lazy store accessor — reads store name dynamically from process.env inside request
const store = () => getStore(process.env.BLOB_STORE_NAME);

export default async (req) => {
  // Same-origin — only Content-Type needed
  const headers = { "Content-Type": "application/json" };
  const listKey = process.env.BLOB_LIST_KEY;

  try {
    // Return the stored todo list
    if (req.method === "GET") {
      const data = await store().get(listKey, { type: "json" });
      return new Response(JSON.stringify(data || []), { status: 200, headers });
    }

    // Replace the entire todo list with the posted array
    if (req.method === "POST") {
      const body = await req.json();
      const list = Array.isArray(body) ? body : []; // guard: ensure array
      await store().setJSON(listKey, list);
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

