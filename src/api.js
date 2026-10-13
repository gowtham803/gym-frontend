const API_BASE = "https://gym-backend-4tbh.onrender.com";

export async function fetchMembers(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/members${query ? `?${query}` : ""}`);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
}

export async function addMember(data) {
  const res = await fetch(`${API_BASE}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMember(id, data) {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    method: "DELETE",
  });
  return res.json();
}