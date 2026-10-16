import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Can I freeze or pause my membership if I travel or sustain an injury?",
    answer:
      "Yes. All Sanctum memberships include built-in freeze privileges. 1 Month passes can be frozen for up to 7 days, 3 Months for 14 days, 6 Months for 30 days, and Annual Black Passes for up to 60 days. You can pause or unfreeze directly from the Member Portal or by messaging concierge on WhatsApp.",
  },
  {
    question: "Are class bookings included, or do they cost extra?",
    answer:
      "All coach-led group sessions—including Barbell Hypertrophy, Olympic Lifting, VO2 Conditioning, and Mobility—are 100% included in all memberships. To maintain our strict 1:12 coach-to-athlete standard, sessions must be reserved in advance through your member account or front desk.",
  },
  {
    question: "What are the club's operating hours and 24/7 keycard rules?",
    answer:
      "Staffed coaching hours are Monday through Friday from 05:30 AM to 11:00 PM, and weekends from 06:30 AM to 09:30 PM. Annual Black Pass members receive 24/7 private biometric keycard turnstile access to the main floor.",
  },
  {
    question: "Do you offer a trial pass before committing to a full membership?",
    answer:
      "Yes. Prospective athletes can apply for a Complimentary 1-Day Athlete Pass. This gives you complete access to the lifting platforms, sprint turf, and a recovery contrast therapy session. Simply submit the enquiry form below or message concierge on WhatsApp.",
  },
  {
    question: "What amenities are provided in the locker and recovery suites?",
    answer:
      "We provide keyless digital security lockers, high-pressure rain showers, chilled eucalyptus towels, hair grooming stations with Dyson hair dryers, full-spectrum infrared dry saunas, and temperature-controlled cold plunge pools at 8°C.",
  },
  {
    question: "Is personal training available for beginners?",
    answer:
      "Yes. We offer 1-on-1 private coaching packages with certified strength and conditioning specialists. Every new athlete receives an initial InBody body composition scan and an athletic movement screening during their first week.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: "80px 24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
          Got Questions?
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 14px", letterSpacing: "-0.03em" }}>
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 540, margin: "0 auto" }}>
          Everything you need to know regarding memberships, access hours, training protocols, and facility policies.
        </p>
      </div>

      {/* Accordion Stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: 18,
                border: isOpen
                  ? "1px solid rgba(225, 29, 72, 0.35)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ lineHeight: 1.4 }}>{item.question}</span>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isOpen ? "#e11d48" : "rgba(255, 255, 255, 0.06)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                    transition: "transform 0.25s, background 0.2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    color: "#cbd5e1",
                    fontSize: 14,
                    lineHeight: 1.65,
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: 16,
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
