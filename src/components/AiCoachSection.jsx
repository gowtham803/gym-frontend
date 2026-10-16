import React, { useState } from "react";
import {
  AI_GOALS,
  AI_EXPERIENCE,
  AI_SPLITS,
  generateAiWorkoutPlan,
} from "../utils/aiEngine";
import { GYM_CONFIG } from "../config/gymConfig";

export default function AiCoachSection({ onNotify }) {
  const [goal, setGoal] = useState("hypertrophy");
  const [experience, setExperience] = useState("intermediate");
  const [days, setDays] = useState("4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(() =>
    generateAiWorkoutPlan({ goal: "hypertrophy", experience: "intermediate", daysPerWeek: "4" })
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const plan = generateAiWorkoutPlan({
        goal,
        experience,
        daysPerWeek: days,
      });
      setGeneratedPlan(plan);
      setIsGenerating(false);
      if (onNotify) {
        onNotify("AI Athletic Protocol generated successfully!", "success", "AI Coach Ready");
      }
    }, 450);
  };

  const handleCopy = () => {
    if (!generatedPlan) return;

    let text = `✦ SANCTUM ATHLETIC CLUB — AI TRAINING PROTOCOL\n`;
    text += `Goal: ${generatedPlan.goalName} | Level: ${generatedPlan.experienceName}\n\n`;

    generatedPlan.schedule.forEach((s) => {
      text += `[${s.day}] - Focus: ${s.focus}\n`;
      s.exercises.forEach((ex) => {
        text += `  • ${ex.name} — ${ex.sets} (Rest: ${ex.rest})\n`;
      });
      text += `\n`;
    });

    text += `Coaching Guidelines:\n`;
    generatedPlan.coachingTips.forEach((tip) => {
      text += `• ${tip}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onNotify) onNotify("Routine copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = generatedPlan
    ? `Hello Coach, I just generated my AI Training Protocol at Sanctum Club (${generatedPlan.goalName}, ${days} Days/Week). I would like to schedule an athletic screening.`
    : "";

  const whatsappShareUrl = `https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(shareText)}`;

  return (
    <section id="ai-coach" style={{ padding: "80px 24px", maxWidth: 1360, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(225, 29, 72, 0.1)", border: "1px solid rgba(225, 29, 72, 0.3)", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 800, color: "#fb7185", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          <span>✦</span> Intelligent Athletic Coaching
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.03em" }}>
          AI ATHLETIC WORKOUT GENERATOR
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 580, margin: "0 auto" }}>
          Engineered training splits customized to your physiological goals, athletic level, and weekly frequency.
        </p>
      </div>

      {/* Control Selector Panel */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 24,
          padding: "32px 28px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: 36,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        <form onSubmit={handleGenerate}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 28 }}>
            {/* Primary Goal */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "#d4d4d8", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Primary Training Focus
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{
                  width: "100%",
                  background: "#181822",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#fff",
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  outline: "none",
                }}
              >
                {AI_GOALS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "#d4d4d8", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Experience Tier
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  width: "100%",
                  background: "#181822",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#fff",
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  outline: "none",
                }}
              >
                {AI_EXPERIENCE.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Frequency Split */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "#d4d4d8", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Weekly Training Commitment
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                style={{
                  width: "100%",
                  background: "#181822",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#fff",
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  outline: "none",
                }}
              >
                {AI_SPLITS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <button
              type="submit"
              disabled={isGenerating}
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                borderRadius: 30,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: isGenerating ? "wait" : "pointer",
                boxShadow: "0 10px 28px rgba(225, 29, 72, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{isGenerating ? "✦ Synthesizing Protocol..." : "✦ Synthesize AI Workout Protocol"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Plan Output */}
      {generatedPlan && (
        <div style={{ animation: "fadeIn 0.3s ease-out" }}>
          {/* Action Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                AI Personalized Output
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "2px 0 0" }}>
                {generatedPlan.goalName} — {days}-Day Split
              </h3>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${copied ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.12)"}`,
                  color: copied ? "#34d399" : "#fff",
                  padding: "9px 18px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{copied ? "✓ Copied" : "📋 Copy Protocol"}</span>
              </button>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  background: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25d366",
                  padding: "9px 18px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>💬 Discuss with Coach on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Days Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 28 }}>
            {generatedPlan.schedule.map((dayItem, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 20,
                  padding: "24px 22px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {dayItem.day}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e4e4e7", margin: "4px 0 16px" }}>
                    Focus: <span style={{ color: "#a1a1aa", fontWeight: 400 }}>{dayItem.focus}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {dayItem.exercises.map((ex, exIdx) => (
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
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                            {ex.name}
                          </div>
                          <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>
                            {ex.sets}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            fontFamily: "monospace",
                            background: "rgba(225, 29, 72, 0.12)",
                            color: "#fb7185",
                            padding: "3px 8px",
                            borderRadius: 6,
                            border: "1px solid rgba(225, 29, 72, 0.25)",
                          }}
                        >
                          {ex.rest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coaching Guidelines Card */}
          <div
            style={{
              background: "rgba(10, 10, 16, 0.65)",
              border: "1px solid rgba(225, 29, 72, 0.25)",
              borderRadius: 18,
              padding: "22px 26px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              ✦ Sanctum AI Coaching & Nutritional Directives
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {generatedPlan.coachingTips.map((tip, tIdx) => (
                <li key={tIdx} style={{ fontSize: 13, color: "#cbd5e1", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                  <span style={{ color: "#e11d48", fontWeight: 900 }}>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
