import React, { useState } from "react";

const WEEKLY_SCHEDULE = {
  Monday: [
    { id: "m1", name: "Heavy Barbell & Hypertrophy", time: "06:30 AM – 07:45 AM", coach: "Marcus Vance", category: "Strength", intensity: "High", studio: "Zone A (Barbell)" },
    { id: "m2", name: "Metabolic Conditioning (MetCon)", time: "08:30 AM – 09:30 AM", coach: "Elena Rostov", category: "Cardio", intensity: "High", studio: "Turf Zone" },
    { id: "m3", name: "Athletic Mobility & Hip Decompression", time: "05:30 PM – 06:15 PM", coach: "Siddharth Rao", category: "Recovery", intensity: "Low", studio: "Studio 2" },
    { id: "m4", name: "Olympic Weightlifting Mechanics", time: "06:30 PM – 07:45 PM", coach: "Marcus Vance", category: "Strength", intensity: "High", studio: "Lifting Platforms" },
  ],
  Tuesday: [
    { id: "t1", name: "Kettlebell Ballistics & Core", time: "07:00 AM – 08:00 AM", coach: "Siddharth Rao", category: "Strength", intensity: "Moderate", studio: "Functional Grid" },
    { id: "t2", name: "VO2 Max Endurance Protocol", time: "08:30 AM – 09:30 AM", coach: "Elena Rostov", category: "Cardio", intensity: "High", studio: "Cardio Loft" },
    { id: "t3", name: "Combat Striking & Conditioning", time: "06:00 PM – 07:15 PM", coach: "Vikram Dev", category: "Cardio", intensity: "High", studio: "Combat Ring" },
  ],
  Wednesday: [
    { id: "w1", name: "Upper Body Hypertrophy", time: "06:30 AM – 07:45 AM", coach: "Marcus Vance", category: "Strength", intensity: "High", studio: "Zone A" },
    { id: "w2", name: "Active Recovery & Hot Sauna Flow", time: "09:00 AM – 09:45 AM", coach: "Aria Sterling", category: "Recovery", intensity: "Low", studio: "Spa Studio" },
    { id: "w3", name: "HIIT Sprint Drills & Agility", time: "06:00 PM – 07:00 PM", coach: "Elena Rostov", category: "Cardio", intensity: "High", studio: "Turf Sprint Track" },
  ],
  Thursday: [
    { id: "th1", name: "Posterior Chain & Deadlift Lab", time: "07:00 AM – 08:15 AM", coach: "Marcus Vance", category: "Strength", intensity: "High", studio: "Platforms" },
    { id: "th2", name: "Thoracic Spine & Joint Mobility", time: "05:30 PM – 06:30 PM", coach: "Aria Sterling", category: "Recovery", intensity: "Low", studio: "Studio 2" },
    { id: "th3", name: "Boxing Conditioning & Footwork", time: "07:00 PM – 08:00 PM", coach: "Vikram Dev", category: "Cardio", intensity: "High", studio: "Combat Ring" },
  ],
  Friday: [
    { id: "f1", name: "Full Body Barbell Complex", time: "06:30 AM – 07:45 AM", coach: "Marcus Vance", category: "Strength", intensity: "High", studio: "Zone A" },
    { id: "f2", name: "Functional Conditioning Circuit", time: "08:30 AM – 09:30 AM", coach: "Elena Rostov", category: "Cardio", intensity: "High", studio: "Turf Grid" },
    { id: "f3", name: "Breathwork & Cold Immersion Guide", time: "05:30 PM – 06:30 PM", coach: "Siddharth Rao", category: "Recovery", intensity: "Low", studio: "Plunge Suite" },
  ],
  Saturday: [
    { id: "s1", name: "Weekend Strongman Conditioning", time: "08:00 AM – 09:30 AM", coach: "Marcus & Team", category: "Strength", intensity: "High", studio: "Outdoor Rig & Turf" },
    { id: "s2", name: "Cardio Engine & Rowing Sprints", time: "10:00 AM – 11:00 AM", coach: "Elena Rostov", category: "Cardio", intensity: "High", studio: "Cardio Loft" },
    { id: "s3", name: "Deep Tissue & Mobility Reset", time: "04:30 PM – 05:30 PM", coach: "Aria Sterling", category: "Recovery", intensity: "Low", studio: "Studio 2" },
  ],
  Sunday: [
    { id: "su1", name: "Open Gym & Supervised Lifting", time: "08:00 AM – 12:00 PM", coach: "Staff Coach", category: "Strength", intensity: "Moderate", studio: "All Zones" },
    { id: "su2", name: "Sunday Restorative Yoga & Decompress", time: "10:00 AM – 11:15 AM", coach: "Aria Sterling", category: "Recovery", intensity: "Low", studio: "Studio 2" },
  ],
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CATEGORIES = ["All", "Strength", "Cardio", "Recovery"];

export default function TimetableSection() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dayClasses = WEEKLY_SCHEDULE[selectedDay] || [];
  const filteredClasses =
    selectedCategory === "All"
      ? dayClasses
      : dayClasses.filter((c) => c.category === selectedCategory);

  const getIntensityBadge = (intensity) => {
    switch (intensity) {
      case "High":
        return { color: "#fb7185", bg: "rgba(225, 29, 72, 0.12)", border: "rgba(225, 29, 72, 0.3)" };
      case "Moderate":
        return { color: "#fbbf24", bg: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.3)" };
      default:
        return { color: "#34d399", bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.3)" };
    }
  };

  return (
    <section id="timetable" style={{ padding: "80px 24px", maxWidth: 1360, margin: "0 auto" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
          Structured Performance
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 14px", letterSpacing: "-0.03em" }}>
          WEEKLY ATHLETIC TIMETABLE
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 560, margin: "0 auto" }}>
          Coach-led strength, conditioning, and restorative recovery sessions capped at 12 athletes per slot.
        </p>
      </div>

      {/* Day Selector Tabs (Responsive Horizontal Scroll) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: 24,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(18, 18, 24, 0.7)",
            padding: 6,
            borderRadius: 30,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {DAYS.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  background: isSelected ? "#e11d48" : "transparent",
                  color: isSelected ? "#fff" : "#a1a1aa",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${selectedCategory === cat ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
              color: selectedCategory === cat ? "#fff" : "#71717a",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Class Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 18,
        }}
      >
        {filteredClasses.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: "40px",
              textAlign: "center",
              gridColumn: "1 / -1",
              borderRadius: 20,
              color: "#71717a",
            }}
          >
            No classes scheduled for {selectedCategory} on {selectedDay}.
          </div>
        ) : (
          filteredClasses.map((item) => {
            const intensityBadge = getIntensityBadge(item.intensity);
            return (
              <div
                key={item.id}
                className="glass-panel athlete-card"
                style={{
                  borderRadius: 20,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#fb7185",
                        fontFamily: "monospace",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: 8,
                      }}
                    >
                      {item.time}
                    </span>

                    <span
                      style={{
                        background: intensityBadge.bg,
                        border: `1px solid ${intensityBadge.border}`,
                        color: intensityBadge.color,
                        padding: "3px 8px",
                        borderRadius: 14,
                        fontSize: 10,
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.intensity} Intensity
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
                    {item.name}
                  </h3>

                  <div style={{ fontSize: 12, color: "#a1a1aa" }}>
                    Location: <span style={{ color: "#e4e4e7", fontWeight: 600 }}>{item.studio}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      {item.coach.slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 600 }}>Coach {item.coach}</span>
                  </div>

                  <span style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
