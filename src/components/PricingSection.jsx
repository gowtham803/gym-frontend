import React from "react";

export default function PricingSection({ onSelectPlan }) {
  const plans = [
    {
      name: "1 Month Pass",
      duration: "1 Month",
      subtitle: "Flexible Athletic Access",
      price: "₹3,500",
      period: "per month",
      popular: false,
      features: [
        "Full facility access during club hours",
        "Biometric turnstile keycard entry",
        "Access to daily group classes (capped at 12)",
        "Complimentary towel service & locker access",
        "Freezed pass allowed: up to 7 days",
      ],
      tag: "Standard",
    },
    {
      name: "3 Months Plan",
      duration: "3 Months",
      subtitle: "Quarterly Conditioning",
      price: "₹9,200",
      period: "for 3 months",
      popular: false,
      features: [
        "All 1 Month amenities included",
        "1x Complimentary Movement & InBody Scan",
        "Access to infrared sauna & recovery suite",
        "2 Guest passes per quarter",
        "Freezed pass allowed: up to 14 days",
      ],
      tag: "Value",
    },
    {
      name: "6 Months Plan",
      duration: "6 Months",
      subtitle: "Performance Commitment",
      price: "₹16,500",
      period: "for 6 months",
      popular: true,
      features: [
        "All 3 Months amenities included",
        "2x InBody Body Composition Scans",
        "Priority class reservation window",
        "5 Guest passes included",
        "Freezed pass allowed: up to 30 days",
        "Sanctum Athlete Kit (Gym Bag + Shaker)",
      ],
      tag: "Most Popular",
    },
    {
      name: "1 Year Black Pass",
      duration: "1 Year",
      subtitle: "Exclusive VIP Privileges",
      price: "₹28,000",
      period: "for 12 months",
      popular: false,
      features: [
        "24/7 Unlimited Facility & Keycard Access",
        "Private VIP locker reservation",
        "Quarterly 1-on-1 Personal Training Consultation",
        "Unlimited Cold Plunge & Infrared Sauna access",
        "12 Guest passes for friends/family",
        "Flexible membership freeze: up to 60 days",
      ],
      tag: "VIP Black",
    },
  ];

  return (
    <section id="plans" style={{ padding: "80px 24px", maxWidth: 1360, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
          Transparent Tiers
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 14px", letterSpacing: "-0.03em" }}>
          MEMBERSHIP PLANS
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 560, margin: "0 auto" }}>
          No hidden sign-up fees. Transparent pricing with complimentary recovery amenities and freeze flexibility.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 22,
          alignItems: "stretch",
        }}
      >
        {plans.map((p) => (
          <div
            key={p.name}
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: "32px 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: p.popular
                ? "1.5px solid #e11d48"
                : "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: p.popular
                ? "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(225, 29, 72, 0.2)"
                : "0 14px 34px rgba(0, 0, 0, 0.4)",
              position: "relative",
              overflow: "hidden",
              transform: p.popular ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {p.popular && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                  background: "linear-gradient(135deg, #e11d48, #be123c)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 20,
                  boxShadow: "0 4px 12px rgba(225, 29, 72, 0.4)",
                }}
              >
                {p.tag}
              </div>
            )}

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {p.subtitle}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "6px 0 16px" }}>
                {p.name}
              </h3>

              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: "#fff", fontFamily: "Syne" }}>
                  {p.price}
                </span>
                <span style={{ fontSize: 12, color: "#71717a" }}>{p.period}</span>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: 20, marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                  Privileges Included:
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#cbd5e1", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4 }}>
                      <span style={{ color: "#10b981", fontWeight: 900, flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan(p.duration)}
              style={{
                width: "100%",
                background: p.popular
                  ? "linear-gradient(135deg, #e11d48 0%, #be123c 100%)"
                  : "rgba(255, 255, 255, 0.06)",
                border: p.popular ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                padding: "13px 20px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: p.popular ? "0 8px 24px rgba(225, 29, 72, 0.35)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!p.popular) {
                  e.currentTarget.style.background = "#e11d48";
                  e.currentTarget.style.borderColor = "#e11d48";
                }
              }}
              onMouseLeave={(e) => {
                if (!p.popular) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }
              }}
            >
              Enquire for {p.duration}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
