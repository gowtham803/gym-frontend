import React from "react";

export default function KpiCards({ stats, currentFilter, onSelectFilter }) {
  const s = stats || { total: 0, active: 0, expiring: 0, expired: 0, frozen: 0 };
  const total = s.total || 0;

  const cards = [
    {
      key: "All",
      label: "TOTAL ROSTER",
      count: s.total,
      tag: "All registered athletes",
      color: "#f43f5e",
      barColor: "linear-gradient(90deg, #e11d48, #fb7185)",
      pct: 100,
      icon: "✦",
    },
    {
      key: "ACTIVE",
      label: "ACTIVE MEMBERS",
      count: s.active,
      tag: "In good standing",
      color: "#10b981",
      barColor: "linear-gradient(90deg, #10b981, #34d399)",
      pct: total ? Math.round((s.active / total) * 100) : 0,
      icon: "⚡",
    },
    {
      key: "EXPIRING",
      label: "EXPIRING IN 7D",
      count: s.expiring,
      tag: "Renewal required",
      color: "#f59e0b",
      barColor: "linear-gradient(90deg, #f59e0b, #fbbf24)",
      pct: total ? Math.round((s.expiring / total) * 100) : 0,
      icon: "⏱",
    },
    {
      key: "EXPIRED",
      label: "EXPIRED PASSES",
      count: s.expired,
      tag: "Follow-up due",
      color: "#f43f5e",
      barColor: "linear-gradient(90deg, #e11d48, #f43f5e)",
      pct: total ? Math.round((s.expired / total) * 100) : 0,
      icon: "⚠️",
    },
    {
      key: "FROZEN",
      label: "FROZEN PASSES",
      count: s.frozen,
      tag: "Paused memberships",
      color: "#94a3b8",
      barColor: "linear-gradient(90deg, #64748b, #94a3b8)",
      pct: total ? Math.round((s.frozen / total) * 100) : 0,
      icon: "❄️",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 16,
        marginBottom: 36,
      }}
    >
      {cards.map((c) => {
        const isSelected = currentFilter?.toUpperCase() === c.key.toUpperCase();

        return (
          <div
            key={c.key}
            onClick={() => onSelectFilter(c.key)}
            className="glass-panel kpi-card-hover"
            style={{
              padding: "22px 24px",
              borderRadius: 20,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              border: isSelected
                ? `1.5px solid ${c.color}`
                : "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: isSelected
                ? `0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${c.color}33`
                : "0 10px 25px rgba(0, 0, 0, 0.35)",
              transform: isSelected ? "scale(1.02)" : "scale(1)",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Top row with icon & active badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#71717a", textTransform: "uppercase" }}>
                {c.label}
              </div>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: isSelected ? `${c.color}25` : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${isSelected ? c.color : "rgba(255, 255, 255, 0.08)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: isSelected ? c.color : "#a1a1aa",
                }}
              >
                {c.icon}
              </div>
            </div>

            {/* Metric Value */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
              <span
                className="brand-font"
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: c.color || "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {c.count}
              </span>
              {c.key !== "All" && total > 0 && (
                <span style={{ fontSize: 12, color: "#71717a", fontWeight: 600 }}>
                  ({c.pct}%)
                </span>
              )}
            </div>

            {/* Note & Progress bar */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#a1a1aa", marginBottom: 6 }}>
                <span>{c.tag}</span>
                {isSelected && (
                  <span style={{ color: c.color, fontWeight: 700, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Active View
                  </span>
                )}
              </div>

              <div
                style={{
                  width: "100%",
                  height: 4,
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, Math.max(c.count > 0 ? 6 : 0, c.pct))}%`,
                    height: "100%",
                    background: c.barColor,
                    borderRadius: 10,
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
