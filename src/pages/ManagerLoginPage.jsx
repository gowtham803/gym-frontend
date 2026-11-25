import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { GYM_CONFIG } from "../config/gymConfig";

export default function ManagerLoginPage() {
  const { user, role, loginWithGoogle, loginWithEmail, loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(location.state?.error || "");
  const [loading, setLoading] = useState(false);

  // If already authenticated with manager clearance, redirect to roster
  if (user && role === "manager") {
    navigate("/admin/roster", { replace: true });
  }

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const signedInUser = await loginWithGoogle();
      const isMgr = GYM_CONFIG.isManagerEmail(signedInUser.email);
      if (!isMgr) {
        await logout();
        setErrorMsg("Access Denied: Manager authorization required. Please authenticate with an authorized staff account.");
      } else {
        navigate("/admin/roster", { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || "Staff Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const signedInUser = await loginWithEmail(email, password);
      const isMgr = GYM_CONFIG.isManagerEmail(signedInUser.email);
      if (!isMgr) {
        await logout();
        setErrorMsg("Access Denied: Manager authorization required. Your account lacks operational clearance.");
      } else {
        navigate("/admin/roster", { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || "Invalid manager credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoManagerSignIn = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginAsDemo("manager");
      navigate("/admin/roster", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Failed to initiate demo manager session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060609",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        position: "relative",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 24,
          padding: "44px 36px",
          border: "1.5px solid rgba(225, 29, 72, 0.35)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(225, 29, 72, 0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Operations Security Crest */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(225, 29, 72, 0.15)",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              color: "#fb7185",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span>🔒</span> Restricted Operational Workspace
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "4px 0", fontFamily: "Syne" }}>
            STAFF CLEARANCE
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 13, margin: 0 }}>
            Sanctum Athletic Club • Member Database & Operational Management
          </p>
        </div>

        {/* Access Denied / Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: "rgba(225, 29, 72, 0.2)",
              border: "1px solid #e11d48",
              color: "#fff",
              padding: "12px 14px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 20,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              lineHeight: 1.4,
            }}
          >
            <span style={{ fontSize: 16 }}>⛔</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Google Staff Sign In */}
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
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 800,
            cursor: loading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 4px 16px rgba(255, 255, 255, 0.15)",
            marginBottom: 20,
          }}
        >
          <span>✦ Continue with Google (Staff ID)</span>
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.08)" }} />
          <span style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            or Manager Credentials
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.08)" }} />
        </div>

        {/* Manager Credentials Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d8", display: "block", marginBottom: 6 }}>
              Manager Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@sanctum.club"
              style={{
                width: "100%",
                background: "#111118",
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
              Security Clearance Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "#111118",
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
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.04em",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 8px 24px rgba(225, 29, 72, 0.45)",
            }}
          >
            {loading ? "Authenticating..." : "Authenticate as Operations Manager →"}
          </button>
        </form>

        {/* 1-Click Demo Manager Sign In */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleDemoManagerSignIn}
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34d399",
              padding: "10px 16px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
              width: "100%",
            }}
          >
            ⚡ 1-Click Demo Manager Sign In (Evaluator Clearance)
          </button>
        </div>

        {/* Return to Public Site */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Link to="/" style={{ color: "#71717a", fontSize: 12, textDecoration: "none" }}>
            ← Return to Public Club Site
          </Link>
        </div>
      </div>
    </div>
  );
}
