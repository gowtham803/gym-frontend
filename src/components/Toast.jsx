import React from "react";

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 380,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => {
        const isError = t.type === "error";
        const isInfo = t.type === "info";

        const bg = isError
          ? "linear-gradient(135deg, rgba(38, 12, 18, 0.95), rgba(20, 8, 12, 0.95))"
          : isInfo
          ? "linear-gradient(135deg, rgba(16, 26, 46, 0.95), rgba(10, 15, 26, 0.95))"
          : "linear-gradient(135deg, rgba(20, 24, 22, 0.95), rgba(12, 16, 14, 0.95))";

        const borderColor = isError
          ? "rgba(225, 29, 72, 0.4)"
          : isInfo
          ? "rgba(56, 189, 248, 0.4)"
          : "rgba(16, 185, 129, 0.4)";

        const iconColor = isError ? "#fb7185" : isInfo ? "#38bdf8" : "#34d399";
        const icon = isError ? "✕" : isInfo ? "ℹ" : "✓";

        return (
          <div
            key={t.id}
            className="toast-item"
            style={{
              pointerEvents: "auto",
              background: bg,
              border: `1px solid ${borderColor}`,
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 14,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
                color: iconColor,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            <div style={{ flex: 1 }}>
              {t.title && (
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                  {t.title}
                </div>
              )}
              <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.4 }}>
                {t.message}
              </div>
            </div>

            <button
              onClick={() => onDismiss(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#71717a",
                cursor: "pointer",
                padding: 4,
                fontSize: 14,
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
