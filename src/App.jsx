import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchMembers, fetchStats, addMember, updateMember, deleteMember } from "./api";
import KpiCards from "./components/KpiCards";
import FilterBar from "./components/FilterBar";
import MemberTable from "./components/MemberTable";
import MemberCardGrid from "./components/MemberCardGrid";
import MemberModal from "./components/MemberModal";
import AthleteDossierModal from "./components/AthleteDossierModal";
import Toast from "./components/Toast";
import { playSound } from "./utils/audio";
import { exportRosterToCsv } from "./utils/exportCsv";

const getTodayStr = () => new Date().toISOString().split("T")[0];

export default function App() {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, expired: 0, frozen: 0 });
  const [statusFilter, setStatusFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedDossierMember, setSelectedDossierMember] = useState(null);

  const [toasts, setToasts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "days_left", direction: "asc" });

  const todayStr = useMemo(() => getTodayStr(), []);

  const addToast = useCallback((message, type = "success", title = null) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const handleDismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchMembers({
        status: statusFilter === "All" ? "" : statusFilter,
        search,
      });
      const memberList = Array.isArray(data) ? data : [];
      setMembers(memberList);

      const s = await fetchStats();
      if (s) setStats(s);

      setSelectedDossierMember((prev) => {
        if (!prev) return null;
        const fresh = memberList.find((m) => m.id === prev.id);
        return fresh || prev;
      });
    } catch (e) {
      console.error("Failed to load records:", e);
      addToast("Could not sync with club database. Check connection.", "error", "Sync Warning");
    }
  }, [statusFilter, search, addToast]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await fetchMembers({
          status: statusFilter === "All" ? "" : statusFilter,
          search,
        });
        if (!ignore) {
          const memberList = Array.isArray(data) ? data : [];
          setMembers(memberList);
          setSelectedDossierMember((prev) => {
            if (!prev) return null;
            const fresh = memberList.find((m) => m.id === prev.id);
            return fresh || prev;
          });
        }
        const s = await fetchStats();
        if (!ignore && s) setStats(s);
      } catch (e) {
        if (!ignore) {
          console.error("Failed to load records:", e);
          addToast("Could not sync with club database. Check connection.", "error", "Sync Warning");
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [statusFilter, search, addToast]);

  // Audio helper
  const triggerSound = useCallback(
    (type = "click") => {
      playSound(type, soundEnabled);
    },
    [soundEnabled]
  );

  // Sorting logic
  const handleSort = (key) => {
    triggerSound("pop");
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Filtered & Sorted Members
  const processedMembers = useMemo(() => {
    let result = [...members];

    // Duration filter
    if (durationFilter !== "All") {
      result = result.filter((m) => m.duration === durationFilter);
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (sortConfig.key === "name") {
          valA = (valA || "").toLowerCase();
          valB = (valB || "").toLowerCase();
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        if (sortConfig.key === "days_left") {
          valA = valA ?? 0;
          valB = valB ?? 0;
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }

        if (sortConfig.key === "expiry_date") {
          valA = valA || "";
          valB = valB || "";
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        if (sortConfig.key === "member_id") {
          valA = (valA || "").toLowerCase();
          valB = (valB || "").toLowerCase();
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return 0;
      });
    }

    return result;
  }, [members, durationFilter, sortConfig]);

  // Modal actions
  const handleOpenAdd = useCallback(() => {
    triggerSound("click");
    setEditingMember(null);
    setIsModalOpen(true);
  }, [triggerSound]);

  const handleOpenEdit = (m) => {
    triggerSound("click");
    setEditingMember(m);
    setIsModalOpen(true);
  };

  const handleOpenDossier = (m) => {
    triggerSound("click");
    setSelectedDossierMember(m);
  };

  const handleDelete = async (id) => {
    triggerSound("pop");
    if (window.confirm("Remove athlete permanently from the club roster?")) {
      try {
        await deleteMember(id);
        triggerSound("success");
        addToast("Athlete record removed permanently.", "info", "Record Deleted");
        loadData();
      } catch {
        addToast("Error deleting member.", "error");
      }
    }
  };

  const handleStatusChange = async (m, newStatus) => {
    triggerSound("pop");
    try {
      await updateMember(m.id, { ...m, status: newStatus });
      triggerSound("success");
      addToast(
        `${m.name}'s pass is now ${newStatus}.`,
        "success",
        newStatus === "FROZEN" ? "Pass Paused" : "Pass Activated"
      );
      loadData();
    } catch {
      addToast("Failed to update status.", "error");
    }
  };

  // Quick 1-Click Fast Renewal
  const handleQuickRenew = async (m, durationExtension) => {
    triggerSound("pop");
    try {
      // If current expiry is in future, start from current expiry, else start from today
      const today = new Date();
      let startFrom = today;
      if (m.expiry_date) {
        const exp = new Date(m.expiry_date);
        if (exp > today) {
          startFrom = exp;
        }
      }

      const stDateStr = startFrom.toISOString().split("T")[0];

      await updateMember(m.id, {
        name: m.name,
        email: m.email,
        phone: m.phone,
        duration: durationExtension,
        start_date: stDateStr,
        status: "ACTIVE",
      });

      triggerSound("success");
      addToast(
        `Extended ${m.name}'s pass by ${durationExtension}!`,
        "success",
        "Membership Extended"
      );
      loadData();
    } catch {
      addToast("Failed to extend pass.", "error");
    }
  };

  const handleModalSubmit = async (formData) => {
    triggerSound("click");
    try {
      if (editingMember) {
        await updateMember(editingMember.id, formData);
        triggerSound("success");
        addToast(`Updated details for ${formData.name}`, "success", "Athlete Updated");
      } else {
        await addMember(formData);
        triggerSound("success");
        addToast(`Registered ${formData.name} to Sanctum Roster`, "success", "Athlete Enrolled");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      addToast("Error saving record to database.", "error");
    }
  };

  const handleExportCsv = () => {
    triggerSound("click");
    const success = exportRosterToCsv(processedMembers);
    if (success) {
      triggerSound("success");
      addToast(`Exported ${processedMembers.length} athletes to CSV.`, "info", "Roster Exported");
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playSound("pop", true);
      addToast("UI sound effects enabled", "info");
    } else {
      addToast("UI sounds muted", "info");
    }
  };

  const handleCopyPassId = (id) => {
    triggerSound("pop");
    addToast(`Copied ${id} to clipboard!`, "info");
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", padding: "40px 32px 90px" }}>
      {/* Dynamic Ambient Crimson & Obsidian Lighting Glows */}
      <div className="glow-red" style={{ top: "-140px", right: "-120px", opacity: 0.8 }} />
      <div className="glow-red" style={{ bottom: "-180px", left: "-120px", width: 650, height: 650, opacity: 0.55 }} />

      {/* Floating Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      <div style={{ maxWidth: 1360, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top Editorial Nav Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 44,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 22,
                color: "#fff",
                boxShadow: "0 10px 28px rgba(225, 29, 72, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#e11d48", textTransform: "uppercase" }}>
                Private Athletic Club
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 900, margin: "2px 0 0", color: "#fff", letterSpacing: "-0.03em" }}>
                SANCTUM ROSTER
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleOpenAdd}
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                color: "#fff",
                border: "none",
                padding: "14px 28px",
                borderRadius: 30,
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: "0 10px 28px rgba(225, 29, 72, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 34px rgba(225, 29, 72, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(225, 29, 72, 0.4)";
              }}
            >
              <span>+ Register Athlete</span>
              <span
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: "2px 6px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
              >
                N
              </span>
            </button>
          </div>
        </header>

        {/* Interactive KPI Cards (Clickable Filter Triggers) */}
        <KpiCards
          stats={stats}
          currentFilter={statusFilter}
          onSelectFilter={(filterKey) => {
            triggerSound("pop");
            setStatusFilter(filterKey);
          }}
        />

        {/* Interactive Filter, Search & View Controls */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={(status) => {
            triggerSound("click");
            setStatusFilter(status);
          }}
          durationFilter={durationFilter}
          onDurationChange={(dur) => {
            triggerSound("click");
            setDurationFilter(dur);
          }}
          viewMode={viewMode}
          onViewModeChange={(mode) => {
            triggerSound("click");
            setViewMode(mode);
          }}
          stats={stats}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onExportCsv={handleExportCsv}
          onOpenAdd={handleOpenAdd}
        />

        {/* Athlete Roster: Switch between Table View and Card Grid View */}
        {viewMode === "table" ? (
          <MemberTable
            members={processedMembers}
            sortConfig={sortConfig}
            onSort={handleSort}
            onOpenDossier={handleOpenDossier}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onQuickRenew={handleQuickRenew}
          />
        ) : (
          <MemberCardGrid
            members={processedMembers}
            onOpenDossier={handleOpenDossier}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onQuickRenew={handleQuickRenew}
          />
        )}
      </div>

      {/* Interactive Athlete Dossier / Profile Drawer Modal */}
      <AthleteDossierModal
        member={selectedDossierMember}
        onClose={() => {
          triggerSound("click");
          setSelectedDossierMember(null);
        }}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onQuickRenew={handleQuickRenew}
        onCopyId={handleCopyPassId}
      />

      {/* Add / Edit Luxury Registration Modal */}
      <MemberModal
        key={isModalOpen ? (editingMember ? `edit-${editingMember.id}` : "new") : "closed"}
        isOpen={isModalOpen}
        editingMember={editingMember}
        initialData={
          editingMember
            ? {
                name: editingMember.name || "",
                email: editingMember.email || "",
                phone: editingMember.phone || "+91 ",
                duration: editingMember.duration || "1 Month",
                start_date: editingMember.start_date || todayStr,
              }
            : {
                name: "",
                email: "",
                phone: "+91 ",
                duration: "1 Month",
                start_date: todayStr,
              }
        }
        onClose={() => {
          triggerSound("click");
          setIsModalOpen(false);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}