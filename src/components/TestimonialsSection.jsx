import React from "react";

const MEMBER_REVIEWS = [
  {
    id: "r1",
    name: "Dr. Vikram Sethi",
    role: "Orthopedic Surgeon & Masters Lifter",
    tier: "Annual Black Pass (Member for 14 mos)",
    quote:
      "What stands out at Sanctum is the equipment calibration and lack of overcrowding. Having Eleiko bars that aren't bent and platforms that are always available at 6:00 AM completely changed my morning training routine.",
    highlight: "Unmatched Equipment Standards",
  },
  {
    id: "r2",
    name: "Ananya Deshmukh",
    role: "Marathon Runner & Tech Lead",
    tier: "6 Months Plan (Member for 7 mos)",
    quote:
      "The contrast therapy suites (cold plunge & infrared sauna) cut my half-marathon recovery down by days. The coaches genuinely understand athletic periodization rather than just giving generic bootcamp workouts.",
    highlight: "World-Class Recovery Facilities",
  },
  {
    id: "r3",
    name: "Kabir Malhotra",
    role: "Competitive Powerlifter",
    tier: "1 Year Pass (Member for 2 yrs)",
    quote:
      "The atmosphere is focused. There are no gimmicks, no influencers blocking equipment for photos, and the keycard system means I can train late at night without any disruption. It feels like an elite private athletic sanctum.",
    highlight: "Focused Training Culture",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: "80px 24px", maxWidth: 1360, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
          Member Experiences
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 14px", letterSpacing: "-0.03em" }}>
          ATHLETE VOICES
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 560, margin: "0 auto" }}>
          Unfiltered feedback from dedicated professionals, competitive lifters, and endurance athletes who train at Sanctum daily.
        </p>
      </div>

      {/* Testimonials Grid (No annoying auto-carousels) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 22,
        }}
      >
        {MEMBER_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              position: "relative",
            }}
          >
            <div>
              {/* Highlight Tag */}
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(225, 29, 72, 0.1)",
                  border: "1px solid rgba(225, 29, 72, 0.25)",
                  color: "#fb7185",
                  padding: "4px 10px",
                  borderRadius: 14,
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                ★ {review.highlight}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 14,
                  color: "#e4e4e7",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  margin: "0 0 24px",
                }}
              >
                "{review.quote}"
              </p>
            </div>

            {/* Author Profile */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingTop: 18,
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #24242e 0%, #101015 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  color: "#fb7185",
                }}
              >
                {review.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                  {review.name}
                </div>
                <div style={{ fontSize: 12, color: "#a1a1aa" }}>{review.role}</div>
                <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>{review.tier}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
