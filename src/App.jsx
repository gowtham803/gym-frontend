import React, { useState, useEffect } from "react";
import { fetchMembers, fetchStats, addMember, updateMember, deleteMember } from "./api";
import MemberTable from "./components/MemberTable";

export default function App() {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, expired: 0, frozen: 0 });
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91 ",
    duration: "1 Month",
    start_date: todayStr,
  });

  const loadData = async () => {
    try {
      const data = await fetchMembers({
        status: statusFilter === "All" ? "" : statusFilter,
        search,
      });
      setMembers(Array.isArray(data) ? data : []);
      const s = await fetchStats();
      if (s) setStats(s);
    } catch (e) {
      console.error("Failed to load records:", e);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, search]);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      email: "",
      phone: "+91 ",
      duration: "1 Month",
      start_date: todayStr,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      name: m.name || "",
      email: m.email || "",
      phone: m.phone || "+91 ",
      duration: m.duration || "1 Month",
      start_date: m.start_date || todayStr,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove athlete permanently from the roster?")) {
      await deleteMember(id);
      loadData();
    }
  };

  const handleStatusChange = async (m, newStatus) => {
    await updateMember(m.id, { ...m, status: newStatus });
    loadData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await updateMember(editingMember.id, formData);
      } else {
        await addMember(formData);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error saving record.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", padding: "40px 32px 80px" }}>
      {/* Ambient Red & Crimson Lighting Glows (Inspired by your screenshots) */}
      <div className="glow-red" style={{ top: "-120px", right: "-100px", opacity: 0.8 }} />
      <div className="glow-red" style={{ bottom: "-150px", left: "-100px", width: 600, height: 600, opacity: 0.5 }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top Editorial Nav Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 20,
                color: "#fff",
                boxShadow: "0 8px 24px rgba(225, 29, 72, 0.4)",
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
                Private Athletic Club
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#fff" }}>
                SANCTUM ROSTER
              </h1>
            </div>
          </div>

          <button
            onClick={handleOpenAdd}
            style={{
              background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
              color: "#fff",
              border: "none",
              padding: "13px 26px",
              borderRadius: 30,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(225, 29, 72, 0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            + Register New Athlete
          </button>
        </header>

        {/* Top Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { label: "TOTAL ROSTER", val: stats.total, tag: "Enrolled" },
            { label: "ACTIVE MEMBERS", val: stats.active, tag: "In Good Standing", highlight: "#10b981" },
            { label: "EXPIRING IN 7D", val: stats.expiring, tag: "Action Required", highlight: "#f59e0b" },
            { label: "EXPIRED", val: stats.expired, tag: "Renewal Due", highlight: "#e11d48" },
          ].map((c, i) => (
            <div key={i} className="glass-panel" style={{ padding: "24px 26px", borderRadius: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#71717a", textTransform: "uppercase" }}>
                {c.label}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: c.highlight || "#fafafa", marginTop: 8 }} className="brand-font">
                {c.val}
              </div>
              <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>{c.tag}</div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          {/* Status Tabs */}
          <div style={{ display: "flex", gap: 8, background: "rgba(18, 18, 24, 0.7)", padding: "6px", borderRadius: 30, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            {["All", "ACTIVE", "EXPIRING", "EXPIRED", "FROZEN"].map((s) => {
              const active = statusFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    background: active ? "#e11d48" : "transparent",
                    color: active ? "#fff" : "#a1a1aa",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", minWidth: 320 }}>
            <input
              type="text"
              placeholder="Search athlete by name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(18, 18, 24, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 30,
                padding: "12px 20px",
                color: "#fff",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <MemberTable
          members={members}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Add / Edit Luxury Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: 480,
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#e11d48", textTransform: "uppercase" }}>
              Roster Management
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginTop: 4, marginBottom: 24, color: "#fff" }}>
              {editingMember ? "Edit Athlete Details" : "Register Athlete"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>Joining Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    style={{
                      width: "100%",
                      marginTop: 6,
                      padding: "12px 14px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>Membership Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    style={{
                      width: "100%",
                      marginTop: 6,
                      padding: "12px 14px",
                      background: "#18181b",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 13,
                      outline: "none",
                    }}
                  >
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: "transparent",
                    color: "#a1a1aa",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "10px 20px",
                    borderRadius: 24,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 24,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(225, 29, 72, 0.35)",
                  }}
                >
                  {editingMember ? "Save Changes" : "Confirm & Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}