import React, { useState } from "react";
import { GYM_CONFIG } from "../config/gymConfig";

export default function EnquirySection({ selectedPlan }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: selectedPlan ? `${selectedPlan} Plan` : "6 Months Plan",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      errs.phone = "Please enter a valid phone number (8–15 digits).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate client submission dispatch
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
    `Hello Sanctum Athletic Club, my name is ${formData.name || "a visitor"}. I am enquiring about ${formData.service || "membership"} (Phone: ${formData.phone || "not provided"}). ${formData.message ? `Note: ${formData.message}` : ""}`
  )}`;

  return (
    <section id="enquiry" style={{ padding: "80px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left Contact Card & Direct Channels */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
            Begin Your Journey
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 16px", letterSpacing: "-0.03em" }}>
            CONNECT WITH CONCIERGE
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: "0 0 32px" }}>
            Schedule an athletic screening, request a 1-day guest pass, or speak directly with our membership director.
          </p>

          {/* Quick Direct Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                GYM_CONFIG.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                background: "rgba(37, 211, 102, 0.08)",
                border: "1px solid rgba(37, 211, 102, 0.25)",
                borderRadius: 18,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37, 211, 102, 0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(37, 211, 102, 0.08)")}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "#25d366",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                💬
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Direct WhatsApp Concierge</div>
                <div style={{ fontSize: 12, color: "#86efac", marginTop: 2 }}>Instant response within 10 minutes</div>
              </div>
            </a>

            {/* Phone Call Card */}
            <a
              href={`tel:${GYM_CONFIG.phone}`}
              style={{
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 18,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)")}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                📞
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Front Desk Concierge</div>
                <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>{GYM_CONFIG.phone}</div>
              </div>
            </a>
          </div>

          {/* Location & Hours */}
          <div style={{ fontSize: 13, color: "#71717a", lineHeight: 1.6 }}>
            <div><strong style={{ color: "#d4d4d8" }}>Location:</strong> {GYM_CONFIG.address}, {GYM_CONFIG.city}</div>
            <div style={{ marginTop: 4 }}><strong style={{ color: "#d4d4d8" }}>Hours:</strong> Mon–Fri: {GYM_CONFIG.hours.weekdays} | Sat–Sun: {GYM_CONFIG.hours.weekends}</div>
          </div>
        </div>

        {/* Right Interactive Enquiry Form */}
        <div
          className="glass-panel"
          style={{
            borderRadius: 28,
            padding: "36px 32px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            position: "relative",
          }}
        >
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 10px" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  color: "#34d399",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  margin: "0 auto 20px",
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>
                Enquiry Registered
              </h3>
              <p style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 1.5, maxWidth: 380, margin: "0 auto 24px" }}>
                Thank you, <strong style={{ color: "#fff" }}>{formData.name}</strong>. Our athletic concierge team has received your enquiry and will contact you at <strong style={{ color: "#fff" }}>{formData.phone}</strong>.
              </p>

              {/* Forward to WhatsApp button */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25d366",
                  color: "#000",
                  textDecoration: "none",
                  padding: "12px 24px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                <span>💬</span> Also Chat on WhatsApp
              </a>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", phone: "", service: "6 Months Plan", message: "" });
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#71717a",
                    fontSize: 12,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: 0 }}>
                  Enquiry & Guest Pass Request
                </h3>
                <p style={{ fontSize: 12, color: "#a1a1aa", margin: "4px 0 0" }}>
                  Fill out the form below and concierge will arrange your private facility visit.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Liam Anderson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: errors.name ? "1px solid #e11d48" : "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                {errors.name && <span style={{ color: "#fb7185", fontSize: 11, marginTop: 4, display: "block" }}>{errors.name}</span>}
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                  Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: errors.phone ? "1px solid #e11d48" : "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                {errors.phone && <span style={{ color: "#fb7185", fontSize: 11, marginTop: 4, display: "block" }}>{errors.phone}</span>}
              </div>

              {/* Service Selection */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                  Area of Interest / Membership Tier
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                  }}
                >
                  <option value="1-Day Guest Pass">1-Day Guest Pass (Complimentary Trial)</option>
                  <option value="1 Month Plan">1 Month Pass (Standard)</option>
                  <option value="3 Months Plan">3 Months Plan (Quarterly)</option>
                  <option value="6 Months Plan">6 Months Plan (Most Popular)</option>
                  <option value="1 Year Black Pass">1 Year Black Pass (VIP 24/7)</option>
                  <option value="Personal Training Coaching">1-on-1 Personal Coaching Package</option>
                </select>
              </div>

              {/* Optional Message */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                  Optional Message / Goals
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific training goals or preferred visit timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 13,
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting
                    ? "rgba(225, 29, 72, 0.5)"
                    : "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: isSubmitting ? "wait" : "pointer",
                  boxShadow: "0 8px 24px rgba(225, 29, 72, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 8,
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
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Submit Guest Pass Enquiry →</span>
                )}
              </button>

              <div style={{ fontSize: 11, color: "#71717a", textAlign: "center" }}>
                🔒 Your contact details are stored securely and never shared with third parties.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
