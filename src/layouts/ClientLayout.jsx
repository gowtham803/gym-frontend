import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AiConciergeChat from "../components/AiConciergeChat";
import Toast from "../components/Toast";
import { playSound } from "../utils/audio";
import { GYM_CONFIG } from "../config/gymConfig";

export default function ClientLayout() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playSound("pop", true);
    }
  };

  const triggerSound = (type = "click") => {
    playSound(type, soundEnabled);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        paddingBottom: 96, // Prevents floating buttons from covering bottom content
      }}
    >
      {/* Ambient Crimson & Obsidian Lighting Glows */}
      <div className="glow-red" style={{ top: "-140px", right: "-120px", opacity: 0.7 }} />
      <div className="glow-red" style={{ top: "35%", left: "-140px", width: 600, height: 600, opacity: 0.45 }} />
      <div className="glow-red" style={{ bottom: "-180px", right: "-120px", width: 650, height: 650, opacity: 0.55 }} />

      {/* Floating Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Public / Client Navigation Bar */}
      <Navbar soundEnabled={soundEnabled} onToggleSound={handleToggleSound} />

      {/* Main Outlet for LandingPage or ClientPortalPage */}
      <main>
        <Outlet context={{ triggerSound }} />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${GYM_CONFIG.whatsapp.number}?text=${encodeURIComponent(
          GYM_CONFIG.whatsapp.defaultMessage
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
          background: "#25d366",
          color: "#000",
          width: 50,
          height: 50,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 211, 102, 0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.4)";
        }}
      >
        💬
      </a>

      {/* Floating AI Concierge Assistant (Cleanly stacked above WhatsApp with 12px gap) */}
      <AiConciergeChat onSound={triggerSound} />
    </div>
  );
}
