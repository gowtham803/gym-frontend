import React from "react";
import { GYM_CONFIG } from "../config/gymConfig";

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        padding: "60px 24px 80px",
        maxWidth: 1360,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left Editorial Copy */}
        <div>
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(225, 29, 72, 0.1)",
              border: "1px solid rgba(225, 29, 72, 0.3)",
              padding: "6px 14px",
              borderRadius: 30,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#fb7185",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#e11d48",
                boxShadow: "0 0 10px #e11d48",
              }}
            />
            {GYM_CONFIG.brandSubtitle}
          </div>

          {/* Headline with fluid clamp() */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#fff",
              margin: "0 0 20px",
              letterSpacing: "-0.035em",
            }}
          >
            FORGED IN <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 30%, #e11d48 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DISCIPLINE.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "#a1a1aa",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 0 32px",
            }}
          >
            {GYM_CONFIG.description}
          </p>

          {/* Calls to Action */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => scrollTo("#enquiry")}
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                color: "#fff",
                border: "none",
                padding: "15px 32px",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(225, 29, 72, 0.4)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 38px rgba(225, 29, 72, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(225, 29, 72, 0.4)";
              }}
            >
              Book Complimentary Pass →
            </button>

            <button
              onClick={() => scrollTo("#timetable")}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "#f4f4f5",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "15px 26px",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              }}
            >
              Weekly Timetable
            </button>
          </div>

          {/* Social Proof / Facility Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: "Syne" }}>
                15,000<span style={{ color: "#e11d48" }}>sq.ft</span>
              </div>
              <div style={{ fontSize: 11, color: "#71717a", fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>
                Private Facility
              </div>
            </div>

            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: "Syne" }}>
                1:4<span style={{ color: "#e11d48" }}> ratio</span>
              </div>
              <div style={{ fontSize: 11, color: "#71717a", fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>
                Coach to Athlete
              </div>
            </div>

            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#10b981", fontFamily: "Syne" }}>
                24<span style={{ color: "#fff" }}>/7</span>
              </div>
              <div style={{ fontSize: 11, color: "#71717a", fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>
                Biometric Pass
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual Composition */}
        <div style={{ position: "relative" }}>
          {/* Glowing backplate */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(225, 29, 72, 0.25) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div
            className="glass-panel"
            style={{
              borderRadius: 30,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              position: "relative",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=900"
              alt="Athlete training with barbell at Sanctum Athletic Club"
              style={{
                width: "100%",
                height: 480,
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.9) contrast(1.1)",
              }}
              loading="eager"
            />

            {/* Floating Live Club Pass Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                background: "rgba(10, 10, 16, 0.82)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 18,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #e11d48, #881337)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  ✦
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Sanctum Black Pass</div>
                  <div style={{ fontSize: 11, color: "#a1a1aa" }}>Private Keycard Access</div>
                </div>
              </div>

              <span
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  color: "#34d399",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                ● Active Club
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
