import React from "react";

export default function MemberTable({
  members,
  sortConfig,
  onSort,
  onOpenDossier,
  onEdit,
  onDelete,
  onStatusChange,
  onQuickRenew,
}) {
  const getBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          border: "rgba(16, 185, 129, 0.35)",
          color: "#34d399",
          dot: "#10b981",
        };
      case "EXPIRING":
        return {
          bg: "rgba(245, 158, 11, 0.15)",
          border: "rgba(245, 158, 11, 0.4)",
          color: "#fbbf24",
          dot: "#f59e0b",
        };
      case "EXPIRED":
        return {
          bg: "rgba(225, 29, 72, 0.15)",
          border: "rgba(225, 29, 72, 0.4)",
          color: "#fb7185",
          dot: "#e11d48",
        };
      case "FROZEN":
        return {
          bg: "rgba(148, 163, 184, 0.12)",
          border: "rgba(148, 163, 184, 0.3)",
          color: "#94a3b8",
          dot: "#64748b",
        };
      default:
        return {
          bg: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.12)",
          color: "#fff",
          dot: "#fff",
        };
    }
  };

  const renderSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span style={{ opacity: 0.25, marginLeft: 4 }}>↕</span>;
    }
    return (
      <span style={{ color: "#e11d48", marginLeft: 4, fontWeight: 900 }}>
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="glass-panel" style={{ borderRadius: 24, overflow: "hidden", position: "relative", zIndex: 1, border: "1px solid rgba(255, 255, 255, 0.08)" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(12, 12, 18, 0.75)" }}>
              <th
                onClick={() => onSort("name")}
                style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
              >
                ATHLETE {renderSortIndicator("name")}
              </th>
              <th
                onClick={() => onSort("member_id")}
                style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
              >
                PASS ID {renderSortIndicator("member_id")}
              </th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase" }}>
                CONTACT
              </th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase" }}>
                TIER
              </th>
              <th
                onClick={() => onSort("expiry_date")}
                style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
              >
                TIMELINE {renderSortIndicator("expiry_date")}
              </th>
              <th
                onClick={() => onSort("days_left")}
                style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
              >
                COUNTDOWN {renderSortIndicator("days_left")}
              </th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase" }}>
                STATUS
              </th>
              <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", textAlign: "right" }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "64px 20px", color: "#71717a" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>No athletes found</div>
                  <div style={{ fontSize: 13 }}>Try switching filter tabs or clearing your search term.</div>
                </td>
              </tr>
            ) : (
              members.map((m) => {
                const badge = getBadge(m.status);
                const days = m.days_left ?? 0;

                return (
                  <tr
                    key={m.id}
                    className="roster-row"
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* Athlete Avatar & Name */}
                    <td style={{ padding: "18px 22px" }}>
                      <div
                        onClick={() => onOpenDossier(m)}
                        style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: "linear-gradient(135deg, #24242e 0%, #0c0c10 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 14,
                            color: "#f4f4f5",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                            transition: "transform 0.2s",
                          }}
                        >
                          {m.name ? m.name.slice(0, 2).toUpperCase() : "AT"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                            {m.name}
                            <span style={{ fontSize: 11, color: "#71717a", fontWeight: 400 }}>→</span>
                          </div>
                          <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{m.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Member ID */}
                    <td style={{ padding: "18px 22px" }}>
                      <span
                        onClick={() => onOpenDossier(m)}
                        style={{
                          fontFamily: "monospace",
                          fontSize: 13,
                          color: "#e11d48",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          background: "rgba(225, 29, 72, 0.08)",
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: "1px solid rgba(225, 29, 72, 0.2)",
                          cursor: "pointer",
                        }}
                      >
                        {m.member_id}
                      </span>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: "18px 22px", fontSize: 13, color: "#a1a1aa" }}>
                      <div>{m.phone}</div>
                    </td>

                    {/* Membership Tier */}
                    <td style={{ padding: "18px 22px" }}>
                      <span
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "5px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#e4e4e7",
                        }}
                      >
                        {m.duration}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td style={{ padding: "18px 22px", fontSize: 12, color: "#71717a" }}>
                      <div>Starts: <span style={{ color: "#d4d4d8" }}>{m.start_date || "—"}</span></div>
                      <div style={{ marginTop: 2 }}>Ends: <span style={{ color: "#d4d4d8" }}>{m.expiry_date || "—"}</span></div>
                    </td>

                    {/* Live Timer */}
                    <td style={{ padding: "18px 22px" }}>
                      {m.status === "FROZEN" ? (
                        <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700 }}>❄️ PAUSED</span>
                      ) : days < 0 ? (
                        <span
                          style={{
                            color: "#fb7185",
                            fontWeight: 800,
                            fontSize: 12,
                            background: "rgba(225, 29, 72, 0.12)",
                            padding: "4px 10px",
                            borderRadius: 16,
                            border: "1px solid rgba(225, 29, 72, 0.3)",
                            display: "inline-block",
                          }}
                        >
                          Expired ({Math.abs(days)}d ago)
                        </span>
                      ) : (
                        <span
                          style={{
                            color: days <= 7 ? "#fbbf24" : "#34d399",
                            fontWeight: 700,
                            fontSize: 12,
                            background: days <= 7 ? "rgba(245, 158, 11, 0.12)" : "rgba(16, 185, 129, 0.12)",
                            border: `1px solid ${days <= 7 ? "rgba(245, 158, 11, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
                            padding: "4px 10px",
                            borderRadius: 16,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <span>⏱</span> {days} {days === 1 ? "day" : "days"} left
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
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          textTransform: "uppercase",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: badge.dot,
                            boxShadow: `0 0 8px ${badge.dot}`,
                          }}
                        />
                        {m.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "18px 22px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                        <button
                          onClick={() => onOpenDossier(m)}
                          title="View Athlete Dossier"
                          style={{
                            background: "rgba(225, 29, 72, 0.12)",
                            border: "1px solid rgba(225, 29, 72, 0.3)",
                            color: "#fb7185",
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          View
                        </button>

                        <button
                          onClick={() => onQuickRenew(m, "1 Month")}
                          title="Quick Renew: Add 1 Month"
                          style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            color: "#34d399",
                            padding: "6px 10px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          +1M
                        </button>

                        <button
                          onClick={() => onStatusChange(m, m.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
                          title={m.status === "FROZEN" ? "Unfreeze Athlete" : "Freeze Athlete"}
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#d4d4d8",
                            padding: "6px 10px",
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          {m.status === "FROZEN" ? "❄️ Unfreeze" : "❄️"}
                        </button>

                        <button
                          onClick={() => onEdit(m)}
                          title="Edit Details"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#d4d4d8",
                            padding: "6px 10px",
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => onDelete(m.id)}
                          title="Delete Athlete"
                          style={{
                            background: "rgba(244, 63, 94, 0.08)",
                            border: "1px solid rgba(244, 63, 94, 0.25)",
                            color: "#fb7185",
                            padding: "6px 10px",
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          🗑
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