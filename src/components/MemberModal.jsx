import React, { useState } from "react";

export default function MemberModal({
  isOpen,
  editingMember,
  initialData,
  isSubmitting = false,
  submitError = null,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  // Calculate live preview expiry date based on start date & duration
  const getEstimatedExpiry = (startStr, duration) => {
    try {
      const parts = (startStr || "").split("-");
      if (parts.length !== 3) return "—";
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (isNaN(d.getTime())) return "—";

      let daysToAdd = 30;
      if (duration.includes("3 Month")) daysToAdd = 90;
      else if (duration.includes("6 Month")) daysToAdd = 180;
      else if (duration.includes("1 Year")) daysToAdd = 365;

      d.setDate(d.getDate() + daysToAdd);
      return d.toISOString().split("T")[0];
    } catch {
      return "—";
    }
  };

  const previewExpiry = getEstimatedExpiry(formData.start_date, formData.duration);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submit
    onSubmit(formData);
  };

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
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 26,
          padding: "32px 30px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(225, 29, 72, 0.15)",
          position: "relative",
          overflow: "hidden",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Accent Glow in Modal */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(225, 29, 72, 0.35) 0%, rgba(225, 29, 72, 0) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#e11d48", textTransform: "uppercase" }}>
              Roster Registration
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginTop: 4, marginBottom: 0, color: "#fff" }}>
              {editingMember ? "Edit Athlete Details" : "Register New Athlete"}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#a1a1aa",
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Error Banner if Submission Failed */}
        {submitError && (
          <div
            style={{
              background: "rgba(225, 29, 72, 0.15)",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              color: "#fca5a5",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 12,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>⚠️</span>
            <span>{submitError}</span>
          </div>
        )}

        {/* Live Athlete Pass Preview Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 20, 28, 0.7) 0%, rgba(12, 12, 16, 0.8) 100%)",
            border: "1px solid rgba(225, 29, 72, 0.25)",
            borderRadius: 16,
            padding: "16px 20px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              {formData.name ? formData.name.slice(0, 2).toUpperCase() : "✦"}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {formData.name.trim() ? formData.name : "Athlete Name"}
              </div>
              <div style={{ fontSize: 12, color: "#a1a1aa" }}>
                {formData.email.trim() ? formData.email : "athlete@sanctum.club"}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e11d48", textTransform: "uppercase" }}>
              {formData.duration}
            </div>
            <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>
              Exp: <span style={{ color: "#fff", fontWeight: 600 }}>{previewExpiry}</span>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>
              Full Name *
            </label>
            <input
              required
              disabled={isSubmitting}
              type="text"
              placeholder="e.g. Marcus Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 14,
                outline: "none",
                transition: "border 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e11d48")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>
              Email Address *
            </label>
            <input
              required
              disabled={isSubmitting}
              type="email"
              placeholder="athlete@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 14,
                outline: "none",
                transition: "border 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e11d48")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>
              Phone Number
            </label>
            <input
              disabled={isSubmitting}
              type="text"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 14,
                outline: "none",
                transition: "border 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e11d48")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>
                Start Date
              </label>
              <input
                disabled={isSubmitting}
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  background: "#121217",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", textTransform: "uppercase" }}>
                Membership Duration
              </label>
              <select
                disabled={isSubmitting}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  background: "#18181f",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 18 }}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              style={{
                background: "transparent",
                color: "#a1a1aa",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "11px 22px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 600,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.5 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: isSubmitting
                  ? "rgba(225, 29, 72, 0.5)"
                  : "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                color: "#fff",
                border: "none",
                padding: "11px 26px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 700,
                cursor: isSubmitting ? "wait" : "pointer",
                boxShadow: isSubmitting ? "none" : "0 8px 24px rgba(225, 29, 72, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  <span>Saving Athlete...</span>
                </>
              ) : (
                <span>{editingMember ? "Save Changes" : "Register Athlete"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
