import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GYM_CONFIG } from "../config/gymConfig";

export default function Footer() {
  const currentYear = 2026;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#050508",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "60px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
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
            <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "Syne" }}>{GYM_CONFIG.shortName}</span>
          </div>
          <p style={{ color: "#71717a", fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
            {GYM_CONFIG.description}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Navigation
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Overview", href: "#hero" },
              { label: "Weekly Schedule", href: "#timetable" },
              { label: "Membership Plans", href: "#plans" },
              { label: "AI Workout Coach", href: "#ai-coach" },
              { label: "BMI Calculator", href: "#calculator" },
              { label: "Facility Gallery", href: "#gallery" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{ color: "#a1a1aa", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/portal"
                style={{ color: "#fb7185", fontSize: 13, textDecoration: "none", fontWeight: 700 }}
              >
                ✦ Sanctum Member Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Club Operating Hours
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>
            <div><strong style={{ color: "#fff" }}>Weekdays:</strong> {GYM_CONFIG.hours.weekdays}</div>
            <div style={{ marginTop: 6 }}><strong style={{ color: "#fff" }}>Weekends:</strong> {GYM_CONFIG.hours.weekends}</div>
            <div style={{ marginTop: 6, color: "#e11d48", fontWeight: 700 }}>{GYM_CONFIG.hours.access}</div>
          </div>
        </div>

        {/* Direct Contact */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Concierge Desk
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>
            <div>Phone: <a href={`tel:${GYM_CONFIG.phone}`} style={{ color: "#fff", textDecoration: "none" }}>{GYM_CONFIG.phone}</a></div>
            <div style={{ marginTop: 6 }}>Email: <a href={`mailto:${GYM_CONFIG.email}`} style={{ color: "#fff", textDecoration: "none" }}>{GYM_CONFIG.email}</a></div>
            <div style={{ marginTop: 6 }}>Location: {GYM_CONFIG.address}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          paddingTop: 24,
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 12,
          color: "#71717a",
        }}
      >
        <div>© {currentYear} {GYM_CONFIG.name}. All rights reserved.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span>Private Athletic Facility • Engineered for Performance</span>
          <span style={{ color: "#3f3f46" }}>•</span>
          {/* Subtle Staff Portal link */}
          <Link
            to="/admin/login"
            style={{
              color: "#71717a",
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fb7185")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
          >
            Staff Portal ⚡
          </Link>
        </div>
      </div>
    </footer>
  );
}
