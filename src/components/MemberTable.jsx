import React from "react";

export default function MemberTable({
  members = [],
  sortConfig,
  onSort,
  onOpenDossier,
  onEdit,
  onDelete,
  onStatusChange,
  onQuickRenew,
  viewMode = "table",
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

  if (!members || members.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          borderRadius: 24,
          padding: "60px 20px",
          textAlign: "center",
          color: "#71717a",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          No athletes found
        </div>
        <div style={{ fontSize: 13, color: "#a1a1aa" }}>Try adjusting your search query or status filter.</div>
      </div>
    );
  }

  const isGridExplicit = viewMode === "grid";

  return (
    <div style={{ width: "100%" }}>
      {/* 1. Desktop High-Density Table Layout (Hidden on mobile <768px or if viewMode === 'grid') */}
      <div
        className={isGridExplicit ? "force-hide" : "desktop-roster-view"}
        style={{
          display: isGridExplicit ? "none" : undefined,
        }}
      >
        <div
          className="glass-panel"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(12, 12, 18, 0.75)" }}>
                  <th
                    onClick={() => onSort?.("name")}
                    style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
                  >
                    ATHLETE {renderSortIndicator("name")}
                  </th>
                  <th
                    onClick={() => onSort?.("member_id")}
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
                    onClick={() => onSort?.("expiry_date")}
                    style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
                  >
                    TIMELINE {renderSortIndicator("expiry_date")}
                  </th>
                  <th
                    onClick={() => onSort?.("days_left")}
                    style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}
                  >
                    COUNTDOWN {renderSortIndicator("days_left")}
                  </th>
                  <th style={{ padding: "18px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#a1a1aa", textTransform: "uppercase", textAlign: "right" }}>
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>
                {members.map((m) => {
                  const badge = getBadge(m.status);
                  const days = m.days_left ?? 0;

                  return (
                    <tr
                      key={m.id}
                      className="roster-row"
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                        transition: "background 0.15s ease",
                      }}
                    >
                      {/* Athlete Name + Avatar */}
                      <td style={{ padding: "16px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div
                            onClick={() => onOpenDossier?.(m)}
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 12,
                              background: "linear-gradient(135deg, #1f1f26 0%, #0d0d11 100%)",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: 13,
                              color: "#fff",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                              cursor: "pointer",
                            }}
                          >
                            {m.name ? m.name.slice(0, 2).toUpperCase() : "AT"}
                          </div>
                          <div>
                            <div
                              onClick={() => onOpenDossier?.(m)}
                              style={{
                                fontWeight: 800,
                                fontSize: 14,
                                color: "#fff",
                                cursor: "pointer",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {m.name}
                            </div>
                            <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{m.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Pass ID */}
                      <td style={{ padding: "16px 22px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#e11d48",
                            background: "rgba(225, 29, 72, 0.08)",
                            padding: "3px 8px",
                            borderRadius: 6,
                            border: "1px solid rgba(225, 29, 72, 0.2)",
                          }}
                        >
                          {m.member_id}
                        </span>
                      </td>

                      {/* Phone */}
                      <td style={{ padding: "16px 22px", fontSize: 13, color: "#cbd5e1", fontVariantNumeric: "tabular-nums" }}>
                        {m.phone || "—"}
                      </td>

                      {/* Duration Tier */}
                      <td style={{ padding: "16px 22px" }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#e4e4e7",
                            background: "rgba(255, 255, 255, 0.04)",
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          {m.duration}
                        </span>
                      </td>

                      {/* Timeline: Start -> Expiry */}
                      <td style={{ padding: "16px 22px", fontSize: 12, color: "#a1a1aa", fontVariantNumeric: "tabular-nums" }}>
                        <div>{m.start_date || "—"}</div>
                        <div style={{ color: "#71717a", fontSize: 11 }}>Exp: {m.expiry_date || "—"}</div>
                      </td>

                      {/* Countdown & Status */}
                      <td style={{ padding: "16px 22px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <span
                            style={{
                              background: badge.bg,
                              border: `1px solid ${badge.border}`,
                              color: badge.color,
                              padding: "3px 8px",
                              borderRadius: 16,
                              fontSize: 10,
                              fontWeight: 800,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              width: "fit-content",
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.dot }} />
                            {m.status}
                          </span>

                          <span style={{ fontSize: 11, color: "#71717a", fontVariantNumeric: "tabular-nums" }}>
                            {m.status === "FROZEN"
                              ? "Paused membership"
                              : days < 0
                              ? `Expired ${Math.abs(days)}d ago`
                              : `${days}d remaining`}
                          </span>
                        </div>
                      </td>

                      {/* Row Actions */}
                      <td style={{ padding: "16px 22px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                          <button
                            onClick={() => onOpenDossier?.(m)}
                            title="Inspect Athlete Dossier"
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
                            onClick={() => onQuickRenew?.(m, "1 Month")}
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
                            onClick={() => onStatusChange?.(m, m.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
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
                            onClick={() => onEdit?.(m)}
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
                            onClick={() => onDelete?.(m.id)}
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Responsive Card Grid Layout (Shown on mobile screens <768px or if viewMode === 'grid') */}
      <div
        className={isGridExplicit ? "force-show-grid" : "mobile-roster-cards"}
        style={{
          display: isGridExplicit ? "grid" : undefined,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 18,
        }}
      >
        {members.map((m) => {
          const badge = getBadge(m.status);
          const days = m.days_left ?? 0;

          return (
            <div
              key={m.id}
              className="glass-panel athlete-card"
              style={{
                borderRadius: 22,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div
                      onClick={() => onOpenDossier?.(m)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #1f1f26 0%, #0d0d11 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#fff",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                        cursor: "pointer",
                      }}
                    >
                      {m.name ? m.name.slice(0, 2).toUpperCase() : "AT"}
                    </div>

                    <div>
                      <h3
                        onClick={() => onOpenDossier?.(m)}
                        style={{
                          margin: 0,
                          fontSize: 15,
                          fontWeight: 800,
                          color: "#fff",
                          cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {m.name}
                      </h3>
                      <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{m.email}</div>
                    </div>
                  </div>

                  <span
                    style={{
                      background: badge.bg,
                      border: `1px solid ${badge.border}`,
                      color: badge.color,
                      padding: "4px 8px",
                      borderRadius: 16,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.dot }} />
                    {m.status}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.35)",
                    padding: "10px 14px",
                    borderRadius: 12,
                    marginBottom: 14,
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>Pass ID</div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#e11d48", fontWeight: 700 }}>
                      {m.member_id}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>Tier</div>
                    <div style={{ fontSize: 12, color: "#e4e4e7", fontWeight: 700 }}>
                      {m.duration}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>
                    <span style={{ color: "#a1a1aa" }}>Status:</span>
                    {m.status === "FROZEN" ? (
                      <span style={{ color: "#94a3b8", fontWeight: 700 }}>PAUSED</span>
                    ) : days < 0 ? (
                      <span style={{ color: "#fb7185", fontWeight: 700 }}>Expired ({Math.abs(days)}d ago)</span>
                    ) : (
                      <span style={{ color: days <= 7 ? "#fbbf24" : "#34d399", fontWeight: 700 }}>
                        ⏱ {days} {days === 1 ? "day" : "days"} left
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#71717a", fontVariantNumeric: "tabular-nums" }}>
                    <span>Start: {m.start_date || "—"}</span>
                    <span>Exp: {m.expiry_date || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  gap: 6,
                }}
              >
                <button
                  onClick={() => onOpenDossier?.(m)}
                  style={{
                    flex: 1,
                    background: "rgba(225, 29, 72, 0.12)",
                    border: "1px solid rgba(225, 29, 72, 0.3)",
                    color: "#fb7185",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View
                </button>

                <button
                  onClick={() => onQuickRenew?.(m, "1 Month")}
                  title="Extend 1 Month"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    color: "#34d399",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  +1M
                </button>

                <button
                  onClick={() => onStatusChange?.(m, m.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#d4d4d8",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {m.status === "FROZEN" ? "❄️" : "❄️"}
                </button>

                <button
                  onClick={() => onEdit?.(m)}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#d4d4d8",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => onDelete?.(m.id)}
                  style={{
                    background: "rgba(244, 63, 94, 0.08)",
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                    color: "#fb7185",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}