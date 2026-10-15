import React, { useRef, useEffect } from "react";

export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  durationFilter,
  onDurationChange,
  viewMode,
  onViewModeChange,
  stats,
  soundEnabled,
  onToggleSound,
  onExportCsv,
  onOpenAdd,
}) {
  const searchInputRef = useRef(null);

  // Global keyboard shortcuts: "/" to focus search, "N" for new athlete
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is already typing in an input
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) {
        if (e.key === "Escape") {
          e.target.blur();
        }
        return;
      }

      if (e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k") || (e.metaKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        onOpenAdd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenAdd]);

  const statusOptions = [
    { key: "All", label: "All Athletes", count: stats?.total ?? 0, dot: "#e11d48" },
    { key: "ACTIVE", label: "Active", count: stats?.active ?? 0, dot: "#10b981" },
    { key: "EXPIRING", label: "Expiring 7d", count: stats?.expiring ?? 0, dot: "#f59e0b" },
    { key: "EXPIRED", label: "Expired", count: stats?.expired ?? 0, dot: "#f43f5e" },
    { key: "FROZEN", label: "Frozen", count: stats?.frozen ?? 0, dot: "#94a3b8" },
  ];

  return (
    <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top Filter Controls Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Status Filter Pills */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(14, 14, 20, 0.7)",
            padding: "5px",
            borderRadius: 30,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {statusOptions.map((opt) => {
            const active = statusFilter.toUpperCase() === opt.key.toUpperCase();
            return (
              <button
                key={opt.key}
                onClick={() => onStatusChange(opt.key)}
                style={{
                  background: active ? "#e11d48" : "transparent",
                  color: active ? "#fff" : "#a1a1aa",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: active ? "0 4px 14px rgba(225, 29, 72, 0.4)" : "none",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: active ? "#fff" : opt.dot,
                  }}
                />
                <span>{opt.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 10,
                    background: active ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.06)",
                    color: active ? "#fff" : "#71717a",
                    fontWeight: 800,
                  }}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher, Sound & CSV Export Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute UI sounds" : "Enable UI audio feedback"}
            style={{
              background: soundEnabled ? "rgba(225, 29, 72, 0.12)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${soundEnabled ? "rgba(225, 29, 72, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
              color: soundEnabled ? "#fb7185" : "#71717a",
              padding: "8px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            <span>{soundEnabled ? "🔊" : "🔇"}</span>
            <span style={{ fontSize: 11 }}>{soundEnabled ? "Sound" : "Muted"}</span>
          </button>

          {/* Table / Card View Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(14, 14, 20, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 20,
              padding: 3,
            }}
          >
            <button
              onClick={() => onViewModeChange("table")}
              title="Table View"
              style={{
                background: viewMode === "table" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                color: viewMode === "table" ? "#fff" : "#71717a",
                border: "none",
                padding: "6px 12px",
                borderRadius: 16,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>▤</span> Table
            </button>
            <button
              onClick={() => onViewModeChange("grid")}
              title="Card Grid View"
              style={{
                background: viewMode === "grid" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                color: viewMode === "grid" ? "#fff" : "#71717a",
                border: "none",
                padding: "6px 12px",
                borderRadius: 16,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>▦</span> Cards
            </button>
          </div>

          {/* Export to CSV */}
          <button
            onClick={onExportCsv}
            title="Download roster as spreadsheet CSV"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#e4e4e7",
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            <span>📥</span> Export CSV
          </button>
        </div>
      </div>

      {/* Second Row: Search bar & Duration dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {/* Search input with keyboard shortcut */}
        <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#71717a",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search athlete by name, email, or pass ID..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(18, 18, 24, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 30,
              padding: "12px 75px 12px 42px",
              color: "#fff",
              fontSize: 13,
              outline: "none",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#e11d48")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
          />

          <div
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {search && (
              <button
                onClick={() => onSearchChange("")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#71717a",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: 4,
                }}
              >
                ✕
              </button>
            )}
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "#71717a",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "2px 6px",
                borderRadius: 4,
                userSelect: "none",
              }}
            >
              /
            </span>
          </div>
        </div>

        {/* Duration Filter Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            value={durationFilter}
            onChange={(e) => onDurationChange(e.target.value)}
            style={{
              background: "#15151c",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#d4d4d8",
              padding: "11px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="All">Duration: All Plans</option>
            <option value="1 Month">Plan: 1 Month</option>
            <option value="3 Months">Plan: 3 Months</option>
            <option value="6 Months">Plan: 6 Months</option>
            <option value="1 Year">Plan: 1 Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
