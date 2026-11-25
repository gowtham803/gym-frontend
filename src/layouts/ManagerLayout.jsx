import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { GYM_CONFIG } from "../config/gymConfig";
import { playSound } from "../utils/audio";

export default function ManagerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState("roster"); // 'roster' | 'outreach' | 'ai-insights'

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playSound("pop", true);
  };

  const triggerSound = (type = "click") => {
    playSound(type, soundEnabled);
  };

  const handleSignOut = async () => {
    await logout();
    navigate("/admin/login");
  };

  const managerName = user?.displayName || user?.email?.split("@")[0] || "Operations Director";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080c",
        color: "#f4f4f6",
        position: "relative",
      }}
    >
      {/* Top Operations Utility Bar */}
      <header
        style={{
          background: "rgba(10, 10, 15, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Brand & Security Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #e11d48, #881337)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(225, 29, 72, 0.4)",
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "0.02em", fontFamily: "Syne" }}>
                {GYM_CONFIG.shortName} OPERATIONAL MANAGEMENT
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                <span>Restricted Staff Operations Clear</span>
              </div>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              to="/"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#cbd5e1",
                padding: "7px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              ← Back to Public Site
            </Link>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? "Mute UI sounds" : "Enable sound feedback"}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: soundEnabled ? "#fb7185" : "#71717a",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>

            {/* Manager Profile Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(225, 29, 72, 0.08)",
                border: "1px solid rgba(225, 29, 72, 0.25)",
                padding: "5px 12px",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#e11d48",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                {managerName.slice(0, 1).toUpperCase()}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                {managerName}
              </div>
              <span
                style={{
                  background: "rgba(225, 29, 72, 0.2)",
                  color: "#fb7185",
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "2px 6px",
                  borderRadius: 6,
                  letterSpacing: "0.06em",
                }}
              >
                MANAGER
              </span>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              style={{
                background: "rgba(244, 63, 94, 0.12)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                color: "#fb7185",
                padding: "7px 14px",
                borderRadius: 18,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Tabs */}
      <div
        style={{
          background: "rgba(14, 14, 20, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            gap: 8,
            overflowX: "auto",
          }}
        >
          {[
            { id: "roster", label: "⚡ Athlete Roster & Biometric Registry" },
            { id: "outreach", label: "⏱ Renewal Outreach Queue (Expiring/Expired)" },
            { id: "ai-insights", label: "✦ AI Retention Insights & Health" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                triggerSound("pop");
                setActiveSubTab(tab.id);
              }}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: activeSubTab === tab.id ? "2.5px solid #e11d48" : "2.5px solid transparent",
                color: activeSubTab === tab.id ? "#fff" : "#71717a",
                padding: "14px 18px",
                fontSize: 13,
                fontWeight: activeSubTab === tab.id ? 800 : 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Content (Zero marketing clutter) */}
      <main style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 24px 60px" }}>
        <Outlet context={{ activeSubTab, setActiveSubTab, triggerSound }} />
      </main>
    </div>
  );
}
