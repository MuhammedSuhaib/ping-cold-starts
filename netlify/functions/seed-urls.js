import { getStore } from "@netlify/blobs";

const DEFAULT_URLS = [
  "https://muhammedsuhaib.github.io/todo.React/",
  // add more free-tier app URLs here (Streamlit, HF Spaces, etc.)
];

export default async (req) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const store = getStore("keep-alive");
  await store.setJSON("ping-list", DEFAULT_URLS);

  const saved = await store.get("ping-list", { type: "json" });

  return new Response(
    JSON.stringify({ ok: true, urls: saved }, null, 2),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const config = {
  path: "/api/seed-urls",
};
