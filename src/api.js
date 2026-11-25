const API_BASE = import.meta.env.VITE_API_BASE || "https://gym-backend-4tbh.onrender.com";
const LOCAL_STORAGE_KEY = "sanctum_local_roster_v2";

// High-fidelity seeded roster used as fallback when FastAPI backend is offline or sleeping
const INITIAL_ROSTER = [
  {
    id: 101,
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    member_id: "ITK-1025",
    phone: "+91 98450 12345",
    duration: "6 Months",
    start_date: "2026-06-01",
    expiry_date: "2026-12-01",
    status: "ACTIVE",
  },
  {
    id: 102,
    name: "Rohan Varma",
    email: "rohan.v@outlook.com",
    member_id: "ITK-1026",
    phone: "+91 98765 43211",
    duration: "1 Month",
    start_date: "2026-10-30",
    expiry_date: "2026-11-29",
    status: "EXPIRING",
  },
  {
    id: 103,
    name: "Priya Nair",
    email: "priya.nair@icloud.com",
    member_id: "ITK-1027",
    phone: "+91 97412 88901",
    duration: "3 Months",
    start_date: "2026-09-01",
    expiry_date: "2026-12-01",
    status: "ACTIVE",
  },
  {
    id: 104,
    name: "Kabir Mehta",
    email: "kabir.m@gmail.com",
    member_id: "ITK-1028",
    phone: "+91 91234 56789",
    duration: "1 Year",
    start_date: "2025-11-15",
    expiry_date: "2026-11-15",
    status: "EXPIRED",
  },
  {
    id: 105,
    name: "Ananya Deshmukh",
    email: "ananya.d@gmail.com",
    member_id: "ITK-1029",
    phone: "+91 99887 76655",
    duration: "3 Months",
    start_date: "2026-08-10",
    expiry_date: "2026-11-10",
    status: "EXPIRED",
  },
  {
    id: 106,
    name: "Devendra Patel",
    email: "devendra.p@techcorp.in",
    member_id: "ITK-1030",
    phone: "+91 94433 22110",
    duration: "6 Months",
    start_date: "2026-07-01",
    expiry_date: "2027-01-01",
    status: "FROZEN",
  },
  {
    id: 107,
    name: "Mira Kapoor",
    email: "mira.kapoor@artstudio.com",
    member_id: "ITK-1031",
    phone: "+91 98860 33445",
    duration: "1 Month",
    start_date: "2026-11-01",
    expiry_date: "2026-12-01",
    status: "ACTIVE",
  },
  {
    id: 108,
    name: "Siddharth Rao",
    email: "siddharth.rao@invest.co",
    member_id: "ITK-1032",
    phone: "+91 98200 44556",
    duration: "1 Year",
    start_date: "2026-02-14",
    expiry_date: "2027-02-14",
    status: "ACTIVE",
  },
  {
    id: 109,
    name: "Natasha Roy",
    email: "natasha.roy@media.in",
    member_id: "ITK-1033",
    phone: "+91 97112 33445",
    duration: "1 Month",
    start_date: "2026-10-28",
    expiry_date: "2026-11-27",
    status: "EXPIRING",
  },
];

// Helper to calculate expiry date string from start_date and duration
function calculateExpiry(startDateStr, duration) {
  let start = new Date(startDateStr);
  if (isNaN(start.getTime())) {
    start = new Date();
  }

  const d = new Date(start);
  if (duration.includes("1 Month")) {
    d.setDate(d.getDate() + 30);
  } else if (duration.includes("3 Month")) {
    d.setDate(d.getDate() + 90);
  } else if (duration.includes("6 Month")) {
    d.setDate(d.getDate() + 180);
  } else if (duration.includes("1 Year")) {
    d.setDate(d.getDate() + 365);
  } else {
    d.setDate(d.getDate() + 30);
  }

  return d.toISOString().split("T")[0];
}

// Compute dynamic days left and active status relative to today
function computeStatus(member) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let daysLeft = 0;
  let computedStatus = member.status || "ACTIVE";

  if (member.status === "FROZEN") {
    computedStatus = "FROZEN";
  }

  if (member.expiry_date) {
    const exp = new Date(member.expiry_date);
    exp.setHours(0, 0, 0, 0);
    const diffTime = exp.getTime() - today.getTime();
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (computedStatus !== "FROZEN") {
      if (daysLeft < 0) {
        computedStatus = "EXPIRED";
      } else if (daysLeft <= 7) {
        computedStatus = "EXPIRING";
      } else {
        computedStatus = "ACTIVE";
      }
    }
  }

  return {
    ...member,
    days_left: daysLeft,
    status: computedStatus,
  };
}

// Local Storage Fallback Helpers
function getLocalRoster() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ROSTER));
    return INITIAL_ROSTER.map(computeStatus);
  }
  try {
    const parsed = JSON.parse(data);
    return parsed.map(computeStatus);
  } catch {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ROSTER));
    return INITIAL_ROSTER.map(computeStatus);
  }
}

function saveLocalRoster(list) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
}

// Attach Firebase bearer token if present
function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem("sanctum_auth_token");
  const headers = { ...extra };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchMembers(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/members${query ? `?${query}` : ""}`, {
      headers: getAuthHeaders(),
      signal: AbortSignal.timeout(4000), // Fail quickly to local storage if Render is cold-starting
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("API server unavailable. Using resilient local fallback roster.", err.message);
    let list = getLocalRoster();

    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter(
        (m) =>
          (m.name && m.name.toLowerCase().includes(s)) ||
          (m.email && m.email.toLowerCase().includes(s)) ||
          (m.member_id && m.member_id.toLowerCase().includes(s))
      );
    }

    if (params.status && params.status !== "All") {
      list = list.filter((m) => m.status.toUpperCase() === params.status.toUpperCase());
    }

    return list;
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getAuthHeaders(),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Stats API unavailable. Computing stats locally from roster cache.", err);
    const members = getLocalRoster();
    return {
      total: members.length,
      active: members.filter((m) => m.status === "ACTIVE").length,
      expiring: members.filter((m) => m.status === "EXPIRING").length,
      expired: members.filter((m) => m.status === "EXPIRED").length,
      frozen: members.filter((m) => m.status === "FROZEN").length,
    };
  }
}

export async function addMember(data) {
  try {
    const res = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const created = await res.json();
    // Sync into local cache
    const current = getLocalRoster();
    saveLocalRoster([created, ...current]);
    return created;
  } catch (err) {
    console.warn("FastAPI unreachable for addMember. Storing record locally in browser database.", err);
    const current = getLocalRoster();
    const stDate = data.start_date || new Date().toISOString().split("T")[0];
    const expDate = calculateExpiry(stDate, data.duration || "1 Month");
    const newMember = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      member_id: data.member_id || `ITK-${1030 + current.length}`,
      phone: data.phone || "+91 ",
      duration: data.duration || "1 Month",
      start_date: stDate,
      expiry_date: expDate,
      status: "ACTIVE",
    };
    const computed = computeStatus(newMember);
    saveLocalRoster([computed, ...current]);
    return computed;
  }
}

export async function updateMember(id, data) {
  try {
    const res = await fetch(`${API_BASE}/members/${id}`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const updated = await res.json();
    const current = getLocalRoster();
    const nextList = current.map((m) => (m.id === id ? updated : m));
    saveLocalRoster(nextList);
    return updated;
  } catch (err) {
    console.warn("FastAPI unreachable for updateMember. Updating record locally in browser database.", err);
    const current = getLocalRoster();
    const stDate = data.start_date || new Date().toISOString().split("T")[0];
    const expDate = calculateExpiry(stDate, data.duration || "1 Month");
    const updatedRecord = computeStatus({
      ...data,
      id,
      start_date: stDate,
      expiry_date: expDate,
    });
    const nextList = current.map((m) => (m.id === id ? updatedRecord : m));
    saveLocalRoster(nextList);
    return updatedRecord;
  }
}

export async function deleteMember(id) {
  try {
    const res = await fetch(`${API_BASE}/members/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();
    const current = getLocalRoster();
    saveLocalRoster(current.filter((m) => m.id !== id));
    return result;
  } catch (err) {
    console.warn("FastAPI unreachable for deleteMember. Removing record from local database.", err);
    const current = getLocalRoster();
    saveLocalRoster(current.filter((m) => m.id !== id));
    return { message: "Deleted from local store" };
  }
}