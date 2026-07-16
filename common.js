// ============================================================
// Footy Legends Pub — COMMON
// Shared client + tiny helpers. Loaded by host / join / display.
// Requires config.js and the Supabase CDN script to load first.
// ============================================================

// One Supabase client for the whole app (named "db" to avoid clashing
// with the CDN's global "supabase" object).
const db = window.supabase.createClient(
  window.FLPUB.SUPABASE_URL,
  window.FLPUB.SUPABASE_KEY
);

// Base URL used to build the join link inside the QR code.
function baseUrl() {
  if (window.FLPUB.BASE_URL) return window.FLPUB.BASE_URL.replace(/\/+$/, "");
  // auto-detect: the folder these pages sit in
  return location.origin + location.pathname.replace(/\/[^\/]*$/, "");
}

// Random 4-char room code — no easily-confused characters (no 0/O, 1/I).
function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// Read a query-string value, e.g. ?room=ABCD  ->  qp("room")
function qp(name) {
  return new URLSearchParams(location.search).get(name);
}

// Escape user text before putting it on screen (team names!)
function safe(txt) {
  const d = document.createElement("div");
  d.textContent = txt == null ? "" : String(txt);
  return d.innerHTML;
}
