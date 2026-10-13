import React from "react";

export default function MemberTable({ members, onEdit, onDelete, onStatusChange }) {
  const getBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return {
          bg: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.3)",
          color: "#34d399",
          dot: "#10b981",
        };
      case "EXPIRING":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          border: "rgba(245, 158, 11, 0.35)",
          color: "#fbbf24",
          dot: "#f59e0b",
        };
      case "EXPIRED":
        return {
          bg: "rgba(225, 29, 72, 0.12)",
          border: "rgba(225, 29, 72, 0.35)",
          color: "#fb7185",
          dot: "#e11d48",
        };
      case "FROZEN":
        return {
          bg: "rgba(148, 163, 184, 0.1)",
          border: "rgba(148, 163, 184, 0.25)",
          color: "#94a3b8",
          dot: "#64748b",
        };
      default:
        return {
          bg: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          color: "#fff",
          dot: "#fff",
        };
    }
  };

  return (
    <div className="glass-panel" style={{ borderRadius: 20, overflow: "hidden", position: "relative", zIndex: 1 }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(10, 10, 14, 0.6)" }}>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>ATHLETE</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>ID</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>CONTACT</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>MEMBERSHIP</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>TIMELINE</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>EXPIRY TIMER</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a", textTransform: "uppercase", textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "50px 20px", color: "#52525b", fontStyle: "italic" }}>
                  No member records found.
                </td>
              </tr>
            ) : (
              members.map((m) => {
                const badge = getBadge(m.status);
                const days = m.days_left;

                return (
                  <tr
                    key={m.id}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Athlete Avatar & Name */}
                    <td style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: "linear-gradient(135deg, #27272a 0%, #09090b 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#e4e4e7",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        }}
                      >
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#fafafa", fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: "#71717a" }}>{m.email}</div>
                      </div>
                    </td>

                    {/* Member ID */}
                    <td style={{ padding: "18px 22px" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 13, color: "#e11d48", fontWeight: 700, letterSpacing: "0.05em" }}>
                        {m.member_id}
                      </span>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: "18px 22px", fontSize: 13, color: "#a1a1aa" }}>{m.phone}</td>

                    {/* Membership Tier */}
                    <td style={{ padding: "18px 22px" }}>
                      <span
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "6px 12px",
                          borderRadius: 30,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#d4d4d8",
                        }}
                      >
                        {m.duration}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td style={{ padding: "18px 22px", fontSize: 12, color: "#71717a" }}>
                      <div>Starts: <span style={{ color: "#d4d4d8" }}>{m.start_date}</span></div>
                      <div>Ends: <span style={{ color: "#d4d4d8" }}>{m.expiry_date}</span></div>
                    </td>

                    {/* Live Timer */}
                    <td style={{ padding: "18px 22px" }}>
                      {m.status === "FROZEN" ? (
                        <span style={{ color: "#71717a", fontSize: 12, fontWeight: 600 }}>PAUSED</span>
                      ) : days < 0 ? (
                        <span style={{ color: "#fb7185", fontWeight: 700, fontSize: 13 }}>
                          Expired ({Math.abs(days)}d ago)
                        </span>
                      ) : (
                        <span
                          style={{
                            color: days <= 7 ? "#fbbf24" : "#34d399",
                            fontWeight: 700,
                            fontSize: 13,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span style={{ fontSize: 14 }}>⏱</span> {days} {days === 1 ? "day" : "days"} left
                        </span>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td style={{ padding: "18px 22px" }}>
                      <span
                        style={{
                          background: badge.bg,
                          border: `1px solid ${badge.border}`,
                          color: badge.color,
                          padding: "5px 12px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.dot }} />
                        {m.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "18px 22px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        <button
                          onClick={() => onStatusChange(m, m.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#d4d4d8",
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {m.status === "FROZEN" ? "Unfreeze" : "Freeze"}
                        </button>
                        <button
                          onClick={() => onEdit(m)}
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            color: "#fff",
                            padding: "6px 14px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(m.id)}
                          style={{
                            background: "rgba(225, 29, 72, 0.12)",
                            border: "1px solid rgba(225, 29, 72, 0.3)",
                            color: "#fb7185",
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}