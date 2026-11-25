import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { GYM_CONFIG } from "../config/gymConfig";

export default function ClientPortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [freezeRequested, setFreezeRequested] = useState(false);
  const [activeTab, setActiveTab] = useState("pass"); // 'pass' | 'workout' | 'biometrics'

  const memberName = user?.displayName || "Sanctum Athlete";
  const memberId = user?.memberId || "ITK-1042";
  const passTier = "1 Year Black Pass";
  const expiryDate = "2027-04-30";
  const daysLeft = 156;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleFreezeRequest = () => {
    setFreezeRequested(true);
  };

  const savedSplit = {
    title: "Muscle Hypertrophy & Density – 4-Day Split",
    focus: "Targeted myofibrillar growth with heavy compound foundation",
    days: [
      {
        day: "Day 1 – Upper Body Power & Chest Hypertrophy",
        exercises: [
          { name: "Incline Barbell Bench Press", sets: "4 sets × 6-8 reps", rest: "2-3 mins" },
          { name: "Weighted Neutral-Grip Pull-ups", sets: "4 sets × 6-8 reps", rest: "2 mins" },
          { name: "Standing Overhead Press", sets: "3 sets × 8-10 reps", rest: "2 mins" },
          { name: "Chest-Supported T-Bar Row", sets: "3 sets × 10-12 reps", rest: "90s" },
        ],
      },
      {
        day: "Day 2 – Lower Body Strength & Posterior Chain",
        exercises: [
          { name: "Barbell Back Squats (High Bar)", sets: "4 sets × 6-8 reps", rest: "3 mins" },
          { name: "Romanian Deadlift (RDL)", sets: "4 sets × 8-10 reps", rest: "2 mins" },
          { name: "Bulgarian Split Squats", sets: "3 sets × 10 reps/leg", rest: "90s" },
          { name: "Standing Calf Machine Raise", sets: "4 sets × 12-15 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 3 – Upper Body Hypertrophy & Arm Density",
        exercises: [
          { name: "Weighted Dips", sets: "3 sets × 8-10 reps", rest: "2 mins" },
          { name: "Lat Pulldown (Neutral Grip)", sets: "4 sets × 10-12 reps", rest: "90s" },
          { name: "Dumbbell Lateral Raises", sets: "4 sets × 12-15 reps", rest: "60s" },
          { name: "Incline Dumbbell Bicep Curl", sets: "3 sets × 10-12 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 4 – Posterior Chain, Hamstrings & Conditioning",
        exercises: [
          { name: "Conventional Deadlifts", sets: "3 sets × 5 reps", rest: "3 mins" },
          { name: "Leg Press (High & Wide Stance)", sets: "3 sets × 12-15 reps", rest: "90s" },
          { name: "Lying Hamstring Curls", sets: "4 sets × 10-12 reps", rest: "60s" },
          { name: "Hanging Leg Raises", sets: "3 sets × 15 reps", rest: "60s" },
        ],
      },
    ],
  };

  const bmiData = {
    score: 22.8,
    category: "Normal / Athletic Baseline",
    color: "#10b981",
    height: "182 cm",
    weight: "75.4 kg",
    lastTested: "12 Nov 2026",
    nextScanRecommended: "12 Dec 2026",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Top Welcome Header */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 24,
          padding: "28px 32px",
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #e11d48, #881337)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 20,
              boxShadow: "0 8px 24px rgba(225, 29, 72, 0.4)",
            }}
          >
            {memberName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0, fontFamily: "Syne" }}>
                {memberName}
              </h1>
              <span
                style={{
                  background: "rgba(225, 29, 72, 0.15)",
                  border: "1px solid rgba(225, 29, 72, 0.35)",
                  color: "#fb7185",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                ✦ Black Pass Member
              </span>
            </div>
            <div style={{ color: "#a1a1aa", fontSize: 13, marginTop: 4 }}>
              {user?.email} • ID: <strong style={{ color: "#fff", fontFamily: "monospace" }}>{memberId}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            to="/"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#cbd5e1",
              padding: "10px 18px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            ← Public Club Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fb7185",
              padding: "10px 18px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 32,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: 16,
          overflowX: "auto",
        }}
      >
        {[
          { id: "pass", label: "💳 Digital Black Pass & Expiry" },
          { id: "workout", label: "✦ Saved AI Workout Protocol" },
          { id: "biometrics", label: "📊 Biometrics & BMI Screening" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: activeTab === t.id ? "rgba(225, 29, 72, 0.15)" : "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${activeTab === t.id ? "rgba(225, 29, 72, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
              color: activeTab === t.id ? "#fff" : "#a1a1aa",
              padding: "10px 20px",
              borderRadius: 16,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Digital Black Pass & Expiry Countdown */}
      {activeTab === "pass" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, animation: "fadeIn 0.25s ease-out" }}>
          {/* Card Visual */}
          <div
            style={{
              background: "linear-gradient(145deg, #161622 0%, #0d0d14 60%, #1f0d14 100%)",
              border: "1.5px solid rgba(225, 29, 72, 0.35)",
              borderRadius: 24,
              padding: "32px 28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(225, 29, 72, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 280,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Watermark Crest */}
            <div
              style={{
                position: "absolute",
                right: -20,
                bottom: -20,
                fontSize: 140,
                opacity: 0.06,
                fontWeight: 900,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              ✦
            </div>

            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#e11d48", fontWeight: 800, textTransform: "uppercase" }}>
                  Sanctum Athletic Club
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "Syne", marginTop: 4 }}>
                  SANCTUM BLACK PASS
                </div>
              </div>
              <div
                style={{
                  width: 38,
                  height: 28,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
                  boxShadow: "0 2px 8px rgba(212, 175, 55, 0.3)",
                }}
              />
            </div>

            {/* Mid row: ID & Status */}
            <div style={{ margin: "24px 0" }}>
              <div style={{ fontSize: 11, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Member Pass Identification
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "monospace", letterSpacing: "0.15em", marginTop: 4 }}>
                {memberId}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#34d399", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Turnstile Biometrics Active
                </span>
              </div>
            </div>

            {/* Bottom row: Name & Valid Thru */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase" }}>Cardholder</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{memberName}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase" }}>Valid Thru</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#cbd5e1", fontVariantNumeric: "tabular-nums" }}>
                  {expiryDate}
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Countdown & Actions */}
          <div
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#fb7185", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Pass Health & Timeline
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "6px 0 16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {passTier}
              </h3>

              {/* Countdown box */}
              <div style={{ background: "rgba(0, 0, 0, 0.35)", borderRadius: 16, padding: "18px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#a1a1aa" }}>Active Pass Countdown</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#10b981", fontVariantNumeric: "tabular-nums" }}>
                    ⏱ {daysLeft} Days Remaining
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: "100%", height: 6, background: "rgba(255, 255, 255, 0.08)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: "70%", height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 10 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#71717a", marginTop: 8 }}>
                  <span>Cycle Started: 01 Nov 2026</span>
                  <span>Cycle Expiry: {expiryDate}</span>
                </div>
              </div>

              {/* Pass Amenities Included */}
              <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                <div>✓ 24/7 Biometric Keycard Turnstile Entry</div>
                <div>✓ Unlimited Infrared Sauna & Cold Plunge Suite Access</div>
                <div>✓ Private Locker #42 Reserved</div>
                <div>✓ 5 Complimentary Athlete Guest Passes Available</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
              {freezeRequested ? (
                <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", padding: "12px", borderRadius: 12, fontSize: 13, textAlign: "center", fontWeight: 700 }}>
                  ✓ Pass freeze request submitted. Concierge will confirm within 2 hours.
                </div>
              ) : (
                <button
                  onClick={handleFreezeRequest}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e4e4e7",
                    padding: "12px 18px",
                    borderRadius: 14,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  ❄️ Request Pass Freeze (Up to 30 Days)
                </button>
              )}

              <a
                href={`https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  `Hello Sanctum Desk, I am member ${memberName} (${memberId}). I would like to enquire about fast-tracking my pass extension.`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg, #e11d48, #be123c)",
                  color: "#fff",
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: "none",
                  textAlign: "center",
                  boxShadow: "0 8px 24px rgba(225, 29, 72, 0.35)",
                }}
              >
                ✦ Early Pass Renewal via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved AI Workout Protocol */}
      {activeTab === "workout" && (
        <div style={{ animation: "fadeIn 0.25s ease-out" }}>
          <div
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "28px 30px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Active Athletic Prescription
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "4px 0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {savedSplit.title}
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: 13, margin: 0 }}>
                  {savedSplit.focus}
                </p>
              </div>

              <Link
                to="/#ai-coach"
                style={{
                  background: "rgba(225, 29, 72, 0.15)",
                  border: "1px solid rgba(225, 29, 72, 0.4)",
                  color: "#fb7185",
                  padding: "10px 20px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                ✦ Synthesize New Protocol
              </Link>
            </div>
          </div>

          {/* Days Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {savedSplit.days.map((d, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 20,
                  padding: "22px 20px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fb7185", marginBottom: 16 }}>
                  {d.day}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {d.exercises.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{ex.name}</div>
                        <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>{ex.sets}</div>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "monospace",
                          background: "rgba(225, 29, 72, 0.12)",
                          color: "#fb7185",
                          padding: "3px 8px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ex.rest}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Biometrics & BMI Screening */}
      {activeTab === "biometrics" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, animation: "fadeIn 0.25s ease-out" }}>
          <div
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Baseline Body Screening
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "16px 0" }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: bmiData.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontVariantNumeric: "tabular-nums" }}>
                {bmiData.score}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {bmiData.category}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "14px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase" }}>Tested Height</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 2 }}>{bmiData.height}</div>
              </div>
              <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "14px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase" }}>Logged Weight</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 2 }}>{bmiData.weight}</div>
              </div>
            </div>

            <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.5 }}>
              Your body composition indicates optimal lean muscle foundation. Last validated at Sanctum Screening Desk on {bmiData.lastTested}.
            </p>
          </div>

          <div
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                InBody Diagnostic Scans
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "6px 0 12px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Quarterly Body Composition Review
              </h3>
              <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>
                As part of your <strong>{passTier}</strong> privileges, you receive complimentary full-body biometric DEXA-equivalent scans every 90 days.
              </p>
              <div style={{ background: "rgba(225, 29, 72, 0.08)", border: "1px solid rgba(225, 29, 72, 0.25)", padding: "12px 16px", borderRadius: 12, marginTop: 14 }}>
                <div style={{ fontSize: 12, color: "#fb7185", fontWeight: 700 }}>
                  ✦ Next Scan Available: {bmiData.nextScanRecommended}
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                `Hello Sanctum Desk, I would like to book my complimentary InBody scan appointment for member ${memberName} (${memberId}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 24,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                padding: "12px",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              📅 Schedule InBody Scan with Coach
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
