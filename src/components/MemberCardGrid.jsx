import React from "react";

export default function MemberCardGrid({
  members,
  onOpenDossier,
  onEdit,
  onDelete,
  onStatusChange,
  onQuickRenew,
}) {
  const getBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return { bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.35)", color: "#34d399", dot: "#10b981" };
      case "EXPIRING":
        return { bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", color: "#fbbf24", dot: "#f59e0b" };
      case "EXPIRED":
        return { bg: "rgba(225, 29, 72, 0.15)", border: "rgba(225, 29, 72, 0.4)", color: "#fb7185", dot: "#e11d48" };
      case "FROZEN":
        return { bg: "rgba(148, 163, 184, 0.12)", border: "rgba(148, 163, 184, 0.3)", color: "#94a3b8", dot: "#64748b" };
      default:
        return { bg: "rgba(255, 255, 255, 0.06)", border: "rgba(255, 255, 255, 0.12)", color: "#fff", dot: "#fff" };
    }
  };

  if (!members || members.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          borderRadius: 20,
          padding: "60px 20px",
          textAlign: "center",
          color: "#71717a",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>No athletes found</div>
        <div style={{ fontSize: 13 }}>Try adjusting your search query or status filter.</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
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
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s",
            }}
          >
            {/* Top row: Avatar + Member info */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    onClick={() => onOpenDossier(m)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #1f1f26 0%, #0d0d11 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#fff",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                      cursor: "pointer",
                    }}
                  >
                    {m.name ? m.name.slice(0, 2).toUpperCase() : "AT"}
                  </div>

                  <div>
                    <h3
                      onClick={() => onOpenDossier(m)}
                      style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#fff",
                        cursor: "pointer",
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
                    padding: "4px 10px",
                    borderRadius: 20,
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

              {/* ID & Plan row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.35)",
                  padding: "10px 14px",
                  borderRadius: 12,
                  marginBottom: 16,
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
                  <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>Duration</div>
                  <div style={{ fontSize: 12, color: "#e4e4e7", fontWeight: 700 }}>
                    {m.duration}
                  </div>
                </div>
              </div>

              {/* Countdown status bar */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: "#a1a1aa" }}>Membership Status</span>
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

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#71717a" }}>
                  <span>From: {m.start_date || "—"}</span>
                  <span>Exp: {m.expiry_date || "—"}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 14,
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                gap: 8,
              }}
            >
              <button
                onClick={() => onOpenDossier(m)}
                style={{
                  flex: 1,
                  background: "rgba(225, 29, 72, 0.12)",
                  border: "1px solid rgba(225, 29, 72, 0.3)",
                  color: "#fb7185",
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                View
              </button>

              <button
                onClick={() => onQuickRenew(m, "1 Month")}
                title="Quick Renew: Extend by 1 Month"
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  color: "#34d399",
                  padding: "8px 10px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                +1M
              </button>

              <button
                onClick={() => onStatusChange(m, m.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
                title={m.status === "FROZEN" ? "Unfreeze athlete" : "Freeze athlete"}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d4d4d8",
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {m.status === "FROZEN" ? "❄️ Unfreeze" : "❄️"}
              </button>

              <button
                onClick={() => onEdit(m)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d4d4d8",
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                ✏️
              </button>

              <button
                onClick={() => onDelete(m.id)}
                style={{
                  background: "rgba(244, 63, 94, 0.08)",
                  border: "1px solid rgba(244, 63, 94, 0.2)",
                  color: "#fb7185",
                  padding: "8px 10px",
                  borderRadius: 10,
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
  );
}
