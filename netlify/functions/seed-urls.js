// Removed — todos are now saved directly from the app via /api/todos
export default async () =>
  new Response("Use /api/todos instead", { status: 410 });
