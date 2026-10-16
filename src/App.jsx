import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchMembers, fetchStats, addMember, updateMember, deleteMember } from "./api";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TimetableSection from "./components/TimetableSection";
import PricingSection from "./components/PricingSection";
import BmiCalculatorSection from "./components/BmiCalculatorSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import EnquirySection from "./components/EnquirySection";
import Footer from "./components/Footer";

import KpiCards from "./components/KpiCards";
import FilterBar from "./components/FilterBar";
import MemberTable from "./components/MemberTable";
import MemberCardGrid from "./components/MemberCardGrid";
import MemberModal from "./components/MemberModal";
import AthleteDossierModal from "./components/AthleteDossierModal";
import Toast from "./components/Toast";
import { playSound } from "./utils/audio";
import { exportRosterToCsv } from "./utils/exportCsv";
import { GYM_CONFIG } from "./config/gymConfig";

const getTodayStr = () => new Date().toISOString().split("T")[0];

export default function App() {
  // Member Roster State
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, expired: 0, frozen: 0 });
  const [statusFilter, setStatusFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modal & Dossier State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedDossierMember, setSelectedDossierMember] = useState(null);

  // Add Member Performance & Loading States (Bug Fix)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Selected Plan from Pricing Cards to pass to Enquiry form
  const [enquirySelectedPlan, setEnquirySelectedPlan] = useState("");

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

  // High Performance Add / Edit Member Submit Handler
  const handleModalSubmit = async (formData) => {
    if (isSubmitting) return; // Prevent duplicate clicks
    triggerSound("click");
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (editingMember) {
        const updated = await updateMember(editingMember.id, formData);
        triggerSound("success");
        addToast(`Updated details for ${formData.name}`, "success", "Athlete Updated");

        // Immediate optimistic state update
        setMembers((prev) =>
          prev.map((m) =>
            m.id === editingMember.id ? (updated && updated.id ? updated : { ...m, ...formData }) : m
          )
        );
      } else {
        const created = await addMember(formData);
        triggerSound("success");
        addToast(`Registered ${formData.name} to Sanctum Roster`, "success", "Athlete Enrolled");

        // Immediate optimistic state update
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

      // Re-sync with backend in background
      loadData();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setSubmitError("Failed to save to club database. Please check connection and try again.");
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

  // When user clicks "Enquire for this Plan" on pricing cards
  const handleSelectPlan = (duration) => {
    setEnquirySelectedPlan(duration);
    const target = document.querySelector("#enquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      {/* Dynamic Ambient Crimson & Obsidian Lighting Glows */}
      <div className="glow-red" style={{ top: "-140px", right: "-120px", opacity: 0.7 }} />
      <div className="glow-red" style={{ top: "35%", left: "-140px", width: 600, height: 600, opacity: 0.45 }} />
      <div className="glow-red" style={{ bottom: "-180px", right: "-120px", width: 650, height: 650, opacity: 0.55 }} />

      {/* Floating Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Sticky Navigation Bar with Mobile Drawer */}
      <Navbar soundEnabled={soundEnabled} onToggleSound={handleToggleSound} />

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: Weekly Class Timetable */}
      <TimetableSection />

      {/* Section 3: Membership Plans & Pricing */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Section 4: Interactive BMI Calculator */}
      <BmiCalculatorSection />

      {/* Section 5: Facility Image Gallery with Lightbox */}
      <GallerySection />

      {/* Section 6: Athlete Testimonials */}
      <TestimonialsSection />

      {/* Section 7: Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* Section 8: Live Club Roster & Member Management Portal */}
      <section
        id="roster"
        style={{
          padding: "80px 24px",
          maxWidth: 1360,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
            Operational Management
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 12px", letterSpacing: "-0.03em" }}>
            SANCTUM ATHLETE ROSTER
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 580, margin: "0 auto" }}>
            Real-time athlete registry, biometric turnstile status, live expiry countdowns, and instant membership renewals.
          </p>
        </div>

        {/* Action Header with Fast Add Button */}
        <div
          className="roster-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>
              Live Database Connected ({stats.total} Enrolled Athletes)
            </span>
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

        {/* Interactive KPI Cards */}
        <KpiCards
          stats={stats}
          currentFilter={statusFilter}
          onSelectFilter={(filterKey) => {
            triggerSound("pop");
            setStatusFilter(filterKey);
          }}
        />

        {/* Interactive Filter Bar */}
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

        {/* Table View / Card Grid View */}
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
      </section>

      {/* Section 9: Enquiry & Guest Pass Request */}
      <EnquirySection key={enquirySelectedPlan || "default"} selectedPlan={enquirySelectedPlan} />

      {/* Footer */}
      <Footer />

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

      {/* Floating WhatsApp Quick Action Button for Mobile & Desktop */}
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
          width: 52,
          height: 52,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
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
    </div>
  );
}