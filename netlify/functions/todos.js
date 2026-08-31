import { getStore } from "@netlify/blobs";

const store = () => getStore("todos");

export default async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method === "GET") {
      const data = await store().get("list", { type: "json" });
      return new Response(JSON.stringify(data || []), { status: 200, headers });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const list = Array.isArray(body) ? body : [];
      await store().setJSON("list", list);
      return new Response(JSON.stringify({ ok: true, count: list.length }), {
        status: 200,
        headers,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers,
    });
  }
};

export const config = {
  path: "/api/todos",
};
