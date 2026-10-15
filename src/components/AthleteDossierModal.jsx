import React, { useState } from "react";

export default function AthleteDossierModal({
  member,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  onQuickRenew,
  onCopyId,
}) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!member) return null;

  const handleCopy = () => {
    if (member.member_id) {
      navigator.clipboard.writeText(member.member_id);
      setCopied(true);
      if (onCopyId) onCopyId(member.member_id);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.4)" };
      case "EXPIRING":
        return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)" };
      case "EXPIRED":
        return { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.15)", border: "rgba(244, 63, 94, 0.4)" };
      case "FROZEN":
        return { color: "#94a3b8", bg: "rgba(148, 163, 184, 0.15)", border: "rgba(148, 163, 184, 0.4)" };
      default:
        return { color: "#e2e8f0", bg: "rgba(255, 255, 255, 0.1)", border: "rgba(255, 255, 255, 0.2)" };
    }
  };

  const statusStyle = getStatusColor(member.status);
  const days = member.days_left ?? 0;

  // Clean phone number for WhatsApp
  const rawPhone = (member.phone || "").replace(/[^0-9]/g, "");
  const waUrl = rawPhone
    ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(
        `Hello ${member.name}, this is Sanctum Athletic Club regarding your membership (${member.member_id}).`
      )}`
    : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 20,
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: 580,
          borderRadius: 28,
          padding: "36px 36px 32px",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(225, 29, 72, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent Glow in Modal */}
        <div
          style={{
            position: "absolute",
            top: -70,
            right: -70,
            width: 220,
            height: 220,
            background: "radial-gradient(circle, rgba(225, 29, 72, 0.3) 0%, rgba(225, 29, 72, 0) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: "linear-gradient(135deg, #e11d48 0%, #4c0519 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 22,
                color: "#fff",
                boxShadow: "0 10px 25px rgba(225, 29, 72, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {member.name ? member.name.slice(0, 2).toUpperCase() : "AT"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background: statusStyle.bg,
                    border: `1px solid ${statusStyle.border}`,
                    color: statusStyle.color,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusStyle.color }} />
                  {member.status}
                </span>

                <button
                  onClick={handleCopy}
                  title="Click to copy ID"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: copied ? "#34d399" : "#a1a1aa",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {member.member_id} {copied ? "✓" : "❐"}
                </button>
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, margin: "6px 0 0", color: "#fff" }}>
                {member.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#a1a1aa",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Contact Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {waUrl ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                background: "rgba(37, 211, 102, 0.1)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                color: "#25d366",
                padding: "10px 12px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "transform 0.2s",
              }}
            >
              <span>💬</span> WhatsApp
            </a>
          ) : (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                color: "#71717a",
                padding: "10px 12px",
                borderRadius: 12,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              No Phone
            </div>
          )}

          <a
            href={`tel:${member.phone}`}
            style={{
              textDecoration: "none",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38bdf8",
              padding: "10px 12px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span>📞</span> Call
          </a>

          <a
            href={`mailto:${member.email}`}
            style={{
              textDecoration: "none",
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fb7185",
              padding: "10px 12px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span>✉️</span> Email
          </a>
        </div>

        {/* Membership Info Card */}
        <div
          style={{
            background: "rgba(10, 10, 15, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            borderRadius: 18,
            padding: "20px 22px",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Membership Tier
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 4 }}>
                {member.duration} Plan
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Status / Countdown
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: statusStyle.color, marginTop: 4 }}>
                {member.status === "FROZEN"
                  ? "Membership Frozen"
                  : days < 0
                  ? `Expired (${Math.abs(days)}d ago)`
                  : `${days} Days Remaining`}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 14, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div>
              <div style={{ fontSize: 11, color: "#71717a" }}>Joined / Activated</div>
              <div style={{ fontSize: 13, color: "#e4e4e7", fontWeight: 600, marginTop: 2 }}>{member.start_date || "—"}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#71717a" }}>Expiry Date</div>
              <div style={{ fontSize: 13, color: "#e4e4e7", fontWeight: 600, marginTop: 2 }}>{member.expiry_date || "—"}</div>
            </div>
          </div>
        </div>

        {/* Quick Fast-Renew Extension */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#e11d48", textTransform: "uppercase" }}>
              ⚡ Quick Extend / Renew Pass
            </span>
            <span style={{ fontSize: 11, color: "#71717a" }}>1-Click Extension</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: "+1 Month", val: "1 Month" },
              { label: "+3 Months", val: "3 Months" },
              { label: "+6 Months", val: "6 Months" },
              { label: "+1 Year", val: "1 Year" },
            ].map((dur) => (
              <button
                key={dur.val}
                onClick={() => onQuickRenew(member, dur.val)}
                style={{
                  background: "rgba(225, 29, 72, 0.08)",
                  border: "1px solid rgba(225, 29, 72, 0.25)",
                  color: "#fff",
                  padding: "10px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e11d48";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(225, 29, 72, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(244, 63, 94, 0.25)",
                  color: "#fb7185",
                  padding: "10px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Delete Athlete
              </button>
            ) : (
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => {
                    onDelete(member.id);
                    onClose();
                  }}
                  style={{
                    background: "#e11d48",
                    border: "none",
                    color: "#fff",
                    padding: "10px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    color: "#fff",
                    padding: "10px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onStatusChange(member, member.status === "FROZEN" ? "ACTIVE" : "FROZEN")}
              style={{
                background: member.status === "FROZEN" ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: member.status === "FROZEN" ? "#34d399" : "#e4e4e7",
                padding: "10px 18px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {member.status === "FROZEN" ? "❄️ Unfreeze" : "❄️ Freeze Pass"}
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(member);
              }}
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                border: "none",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(225, 29, 72, 0.35)",
              }}
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
