import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { GYM_CONFIG } from "../config/gymConfig";

export default function ClientLoginPage() {
  const { user, loginWithGoogle, loginWithEmail, signupWithEmail, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = location.state?.from?.pathname || "/portal";

  // Redirect if already logged in as client
  if (user && user.role !== "manager") {
    navigate("/portal", { replace: true });
  }

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Failed to authenticate with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!email || !password) {
          throw new Error("Please fill in email and password.");
        }
        await signupWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginAsDemo("client");
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Demo sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07070a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div className="glow-red" style={{ top: "10%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, opacity: 0.4 }} />

      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 28,
          padding: "40px 32px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand Crest */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg, #e11d48, #881337)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 22,
              boxShadow: "0 6px 20px rgba(225, 29, 72, 0.45)",
              marginBottom: 12,
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
            {GYM_CONFIG.shortName} ATHLETIC CLUB
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "4px 0 6px", fontFamily: "Syne" }}>
            MEMBER PORTAL
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 13, margin: 0 }}>
            Sign in to access your digital Black Pass, saved workouts, and biometrics.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: "rgba(225, 29, 72, 0.15)",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              color: "#fb7185",
              padding: "10px 14px",
              borderRadius: 12,
              fontSize: 12,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: "100%",
            background: "#fff",
            color: "#18181b",
            border: "none",
            padding: "13px 20px",
            borderRadius: 22,
            fontSize: 13,
            fontWeight: 800,
            cursor: loading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 4px 16px rgba(255, 255, 255, 0.15)",
            marginBottom: 20,
            transition: "transform 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.08)" }} />
          <span style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            or Email / Password
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.08)" }} />
        </div>

        {/* Tabs: Sign In vs Sign Up */}
        <div
          style={{
            display: "flex",
            background: "rgba(0, 0, 0, 0.4)",
            padding: 4,
            borderRadius: 14,
            marginBottom: 20,
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            style={{
              flex: 1,
              background: mode === "login" ? "rgba(225, 29, 72, 0.25)" : "transparent",
              color: mode === "login" ? "#fff" : "#71717a",
              border: "none",
              padding: "8px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
            }}
            style={{
              flex: 1,
              background: mode === "signup" ? "rgba(225, 29, 72, 0.25)" : "transparent",
              color: mode === "signup" ? "#fff" : "#71717a",
              border: "none",
              padding: "8px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d8", display: "block", marginBottom: 6 }}>
                Full Athlete Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Marcus Vance"
                style={{
                  width: "100%",
                  background: "#12121a",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#fff",
                  padding: "11px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d8", display: "block", marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@sanctum.club"
              style={{
                width: "100%",
                background: "#12121a",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                padding: "11px 14px",
                borderRadius: 10,
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d8", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "#12121a",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                padding: "11px 14px",
                borderRadius: 10,
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 6,
              background: "linear-gradient(135deg, #e11d48, #be123c)",
              color: "#fff",
              border: "none",
              padding: "13px",
              borderRadius: 22,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.04em",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 8px 24px rgba(225, 29, 72, 0.4)",
            }}
          >
            {loading ? "Verifying..." : mode === "signup" ? "Enroll as Member →" : "Sign In to Portal →"}
          </button>
        </form>

        {/* 1-Click Demo Athlete Sign In */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleDemoSignIn}
            style={{
              background: "rgba(225, 29, 72, 0.08)",
              border: "1px solid rgba(225, 29, 72, 0.3)",
              color: "#fb7185",
              padding: "9px 16px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            ⚡ 1-Click Demo Athlete Sign In (Test Account)
          </button>
        </div>

        {/* Links to Public Home & Staff Portal */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#71717a" }}>
          <Link to="/" style={{ color: "#a1a1aa", textDecoration: "none" }}>
            ← Back to Public Sanctuary
          </Link>
          <Link to="/admin/login" style={{ color: "#71717a", textDecoration: "none" }}>
            Staff Portal Login ⚡
          </Link>
        </div>
      </div>
    </div>
  );
}
