import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoadingFallback({ label = "Authenticating Sanctum Credentials..." }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#08080c",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "3px solid rgba(225, 29, 72, 0.2)",
          borderTopColor: "#e11d48",
          animation: "spin 0.8s linear infinite",
          marginBottom: 16,
        }}
      />
      <div style={{ fontSize: 13, fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

// Route guard for authenticated clients / members
export function ClientRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingFallback label="Accessing Member Sanctuary..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Route guard for authorized gym managers & operations staff
export function ManagerRoute({ children }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingFallback label="Verifying Managerial Clearance..." />;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (role !== "manager") {
    return (
      <Navigate
        to="/admin/login"
        state={{
          from: location,
          error: "Access Denied: Operational Manager authorization required. Please sign in with staff credentials.",
        }}
        replace
      />
    );
  }

  return children;
}
