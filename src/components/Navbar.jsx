import React, { useState, useEffect } from "react";
import { GYM_CONFIG } from "../config/gymConfig";

export default function Navbar({ soundEnabled, onToggleSound }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Schedule", href: "#timetable" },
    { label: "Memberships", href: "#plans" },
    { label: "AI Coach", href: "#ai-coach" },
    { label: "BMI Tool", href: "#calculator" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Club Roster", href: "#roster" },
    { label: "Enquire", href: "#enquiry" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappUrl = `https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
    GYM_CONFIG.whatsapp.defaultMessage
  )}`;

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isScrolled ? "rgba(8, 8, 12, 0.88)" : "rgba(8, 8, 12, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.04)",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#fff",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 18,
                color: "#fff",
                boxShadow: "0 6px 18px rgba(225, 29, 72, 0.4)",
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
                {GYM_CONFIG.shortName}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase", marginTop: 3 }}>
                Athletic Club
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  color: link.href === "#roster" ? "#fb7185" : "#a1a1aa",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "color 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: link.href === "#roster" ? 4 : 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = link.href === "#roster" ? "#fb7185" : "#a1a1aa")
                }
              >
                {link.href === "#roster" && <span style={{ fontSize: 10 }}>⚡</span>}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: WhatsApp, Call, Sound & Mobile Menu Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* WhatsApp Quick Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              title="Chat with membership concierge on WhatsApp"
              className="nav-btn-whatsapp"
              style={{
                textDecoration: "none",
                background: "rgba(37, 211, 102, 0.12)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                color: "#25d366",
                padding: "8px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "transform 0.2s, background 0.2s",
              }}
            >
              <span>💬</span>
              <span className="hide-on-mobile">WhatsApp</span>
            </a>

            {/* Click to Call */}
            <a
              href={`tel:${GYM_CONFIG.phone}`}
              title={`Call Sanctum at ${GYM_CONFIG.phone}`}
              className="nav-btn-call"
              style={{
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#e4e4e7",
                padding: "8px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <span>📞</span>
              <span className="hide-on-mobile">{GYM_CONFIG.phone}</span>
            </a>

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? "Mute UI sounds" : "Enable UI audio feedback"}
              style={{
                background: soundEnabled ? "rgba(225, 29, 72, 0.12)" : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${soundEnabled ? "rgba(225, 29, 72, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                color: soundEnabled ? "#fb7185" : "#71717a",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                width: 38,
                height: 38,
                borderRadius: 10,
                display: "none", // enabled via CSS media query
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "82%",
              maxWidth: 320,
              background: "#0d0d12",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #e11d48, #881337)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 900,
                    }}
                  >
                    ✦
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>{GYM_CONFIG.shortName}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#a1a1aa",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      color: link.href === "#roster" ? "#fb7185" : "#e4e4e7",
                      textDecoration: "none",
                      fontSize: 16,
                      fontWeight: 700,
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: 12, color: "#71717a" }}>→</span>
                  </a>
                ))}
              </nav>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 20, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  background: "rgba(37, 211, 102, 0.15)",
                  border: "1px solid rgba(37, 211, 102, 0.35)",
                  color: "#25d366",
                  padding: "12px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  display: "block",
                }}
              >
                💬 Chat on WhatsApp
              </a>

              <a
                href={`tel:${GYM_CONFIG.phone}`}
                style={{
                  textDecoration: "none",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  display: "block",
                }}
              >
                📞 Call {GYM_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
