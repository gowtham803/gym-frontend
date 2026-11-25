import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchMembers, fetchStats, addMember, updateMember, deleteMember } from "../api";
import AiRosterInsights from "../components/AiRosterInsights";
import KpiCards from "../components/KpiCards";
import FilterBar from "../components/FilterBar";
import MemberTable from "../components/MemberTable";
import MemberModal from "../components/MemberModal";
import AthleteDossierModal from "../components/AthleteDossierModal";
import Toast from "../components/Toast";
import { exportRosterToCsv } from "../utils/exportCsv";

const getTodayStr = () => new Date().toISOString().split("T")[0];

export default function ManagerRosterPage() {
  const context = useOutletContext() || {};
  const { activeSubTab, triggerSound = () => {} } = context;

  // Member Roster State
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, expired: 0, frozen: 0 });
  const [statusFilter, setStatusFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  // Modal & Dossier State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedDossierMember, setSelectedDossierMember] = useState(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [toasts, setToasts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "days_left", direction: "asc" });

  const todayStr = useMemo(() => getTodayStr(), []);

  // Derive active status filter according to sub-tab
  const effectiveStatusFilter = useMemo(() => {
    if (activeSubTab === "outreach" && statusFilter === "All") {
      return "EXPIRING";
    }
    return statusFilter;
  }, [activeSubTab, statusFilter]);

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
        status: effectiveStatusFilter === "All" ? "" : effectiveStatusFilter,
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
      addToast("Could not sync with club database. Using cached data.", "error", "Sync Warning");
    }
  }, [effectiveStatusFilter, search, addToast]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await fetchMembers({
          status: effectiveStatusFilter === "All" ? "" : effectiveStatusFilter,
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
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [effectiveStatusFilter, search]);

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

    if (durationFilter !== "All") {
      result = result.filter((m) => m.duration === durationFilter);
    }

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
    setSubmitError(null);
    setIsSubmitting(false);
    setIsModalOpen(true);
  }, [triggerSound]);

  const handleOpenEdit = (m) => {
    triggerSound("click");
    setEditingMember(m);
    setSubmitError(null);
    setIsSubmitting(false);
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

  // Add / Edit Member Submit Handler
  const handleModalSubmit = async (formData) => {
    if (isSubmitting) return;
    triggerSound("click");
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (editingMember) {
        const updated = await updateMember(editingMember.id, formData);
        triggerSound("success");
        addToast(`Updated details for ${formData.name}`, "success", "Athlete Updated");

        setMembers((prev) =>
          prev.map((m) =>
            m.id === editingMember.id ? (updated && updated.id ? updated : { ...m, ...formData }) : m
          )
        );
      } else {
        const created = await addMember(formData);
        triggerSound("success");
        addToast(`Registered ${formData.name} to Sanctum Roster`, "success", "Athlete Enrolled");

        if (created && created.id) {
          setMembers((prev) => [created, ...prev]);
        }
        setStats((prev) => ({
          ...prev,
          total: (prev.total || 0) + 1,
          active: (prev.active || 0) + 1,
        }));
      }

      setIsSubmitting(false);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setSubmitError("Failed to save to database. Please retry.");
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

  const handleCopyPassId = (id) => {
    triggerSound("pop");
    addToast(`Copied ${id} to clipboard!`, "info");
  };

  return (
    <div>
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Header with Title and Register Athlete Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
            Operational Database
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#fff", margin: "4px 0", fontFamily: "Syne" }}>
            SANCTUM ATHLETE ROSTER
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: 13, color: "#a1a1aa", fontWeight: 600 }}>
              Live Database Connected ({stats.total} Enrolled Athletes)
            </span>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{
            background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
            color: "#fff",
            border: "none",
            padding: "13px 26px",
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
              background: "rgba(0, 0, 0, 0.25)",
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

      {/* AI Roster Diagnostics & Retention Intelligence Banner */}
      <AiRosterInsights members={processedMembers} stats={stats} />

      {/* Interactive KPI Cards */}
      <KpiCards
        stats={stats}
        currentFilter={effectiveStatusFilter}
        onSelectFilter={(filterKey) => {
          triggerSound("pop");
          setStatusFilter(filterKey);
        }}
      />

      {/* Interactive Filter Bar */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={effectiveStatusFilter}
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
        soundEnabled={true}
        onToggleSound={() => {}}
        onExportCsv={handleExportCsv}
        onOpenAdd={handleOpenAdd}
      />

      {/* Unified Responsive Member Table / Cards */}
      <MemberTable
        members={processedMembers}
        sortConfig={sortConfig}
        onSort={handleSort}
        onOpenDossier={handleOpenDossier}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onQuickRenew={handleQuickRenew}
        viewMode={viewMode}
      />

      {/* Interactive Athlete Dossier Modal */}
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

      {/* High-Performance Add / Edit Member Registration Modal */}
      <MemberModal
        key={isModalOpen ? (editingMember ? `edit-${editingMember.id}` : "new") : "closed"}
        isOpen={isModalOpen}
        editingMember={editingMember}
        isSubmitting={isSubmitting}
        submitError={submitError}
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
          setIsSubmitting(false);
          setSubmitError(null);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
