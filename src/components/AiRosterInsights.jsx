import React, { useState } from "react";
import { GYM_CONFIG } from "../config/gymConfig";

export default function AiRosterInsights({ members, stats }) {
  const [isOpen, setIsOpen] = useState(false);

  const total = stats?.total || 0;
  const active = stats?.active || 0;
  const expiring = stats?.expiring || 0;
  const expired = stats?.expired || 0;
  const frozen = stats?.frozen || 0;

  const retentionScore = total > 0 ? Math.round(((active + expiring) / total) * 100) : 100;

  // Identify athletes expiring within 7 days
  const priorityFollowups = (members || []).filter(
    (m) => m.status === "EXPIRING" || (m.days_left !== undefined && m.days_left >= 0 && m.days_left <= 7)
  );

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 20,
        padding: "20px 24px",
        marginBottom: 28,
        border: "1px solid rgba(225, 29, 72, 0.25)",
        background: "linear-gradient(135deg, rgba(20, 14, 22, 0.75) 0%, rgba(10, 10, 14, 0.8) 100%)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #e11d48, #881337)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 16,
              boxShadow: "0 4px 14px rgba(225, 29, 72, 0.4)",
            }}
          >
            ✦
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
              AI Roster Intelligence & Retention Health
              <span
                style={{
                  background: retentionScore >= 80 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                  color: retentionScore >= 80 ? "#34d399" : "#fbbf24",
                  border: `1px solid ${retentionScore >= 80 ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                Health: {retentionScore}%
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
              Automated club diagnostics: {expiring} athletes flagged for immediate renewal outreach.
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(225, 29, 72, 0.12)",
            border: `1px solid ${isOpen ? "rgba(255, 255, 255, 0.2)" : "rgba(225, 29, 72, 0.3)"}`,
            color: isOpen ? "#fff" : "#fb7185",
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {isOpen ? "▲ Hide AI Insights" : "▼ View Actionable AI Recommendations"}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 18,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {/* Priority Outreach Box */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: "#fb7185", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              ⚡ High-Priority Renewal Queue ({priorityFollowups.length})
            </div>
            {priorityFollowups.length === 0 ? (
              <div style={{ fontSize: 12, color: "#a1a1aa" }}>
                ✓ No immediate pass expiries detected in the next 7 days.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {priorityFollowups.map((m) => {
                  const rawPhone = (m.phone || "").replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${rawPhone || GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                    `Hello ${m.name}, this is Sanctum Athletic Club. Your ${m.duration} pass expires in ${m.days_left} days (${m.expiry_date}). We have reserved your preferred renewal slot.`
                  )}`;

                  return (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 700, color: "#fff" }}>{m.name}</span>
                        <span style={{ color: "#fbbf24", marginLeft: 6 }}>({m.days_left}d left)</span>
                      </div>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textDecoration: "none",
                          background: "rgba(37, 211, 102, 0.15)",
                          color: "#25d366",
                          border: "1px solid rgba(37, 211, 102, 0.3)",
                          padding: "3px 8px",
                          borderRadius: 6,
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        💬 Notify WhatsApp
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Retention Strategy & Diagnostics */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              ✦ AI Performance Directives
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "#cbd5e1" }}>
              <li style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#34d399" }}>•</span>
                <span>
                  <strong>Pass Upgrades:</strong> {stats?.active || 0} active athletes eligible for complimentary InBody scans to encourage 6-month tier upgrades.
                </span>
              </li>
              <li style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#34d399" }}>•</span>
                <span>
                  <strong>Frozen Passes ({frozen}):</strong> {frozen > 0 ? "Review frozen athletes after 14 days to offer personal coaching unfreeze incentive." : "Zero paused passes currently."}
                </span>
              </li>
              <li style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#34d399" }}>•</span>
                <span>
                  <strong>Expired Re-engagement ({expired}):</strong> {expired > 0 ? `Trigger a re-activation promo for ${expired} expired accounts.` : "All athletes in good standing."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
