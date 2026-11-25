import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import { ClientRoute, ManagerRoute } from "./routes/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ClientPortalPage = lazy(() => import("./pages/ClientPortalPage"));
const ClientLoginPage = lazy(() => import("./pages/ClientLoginPage"));
const ManagerLoginPage = lazy(() => import("./pages/ManagerLoginPage"));
const ManagerRosterPage = lazy(() => import("./pages/ManagerRosterPage"));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid rgba(225, 29, 72, 0.2)",
          borderTopColor: "#e11d48",
          animation: "spin 0.8s linear infinite",
          marginBottom: 12,
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Loading Sanctum Module...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Public & Member Client Experience */}
        <Route element={<ClientLayout />}>
          {/* Landing Page with all public sections */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Authenticated Member Sanctuary */}
          <Route
            path="/portal"
            element={
              <ClientRoute>
                <ClientPortalPage />
              </ClientRoute>
            }
          />
        </Route>

        {/* 2. Authentication Pages */}
        <Route path="/login" element={<ClientLoginPage />} />
        <Route path="/admin/login" element={<ManagerLoginPage />} />

        {/* 3. Operational Management Workspace (Role-Protected for Managers) */}
        <Route
          path="/admin"
          element={
            <ManagerRoute>
              <ManagerLayout />
            </ManagerRoute>
          }
        >
          <Route index element={<Navigate to="/admin/roster" replace />} />
          <Route path="roster" element={<ManagerRosterPage />} />
        </Route>

        {/* 4. Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}