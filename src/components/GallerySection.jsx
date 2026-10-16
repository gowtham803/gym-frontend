import React, { useState, useEffect, useCallback } from "react";

const GALLERY_IMAGES = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600",
    title: "Olympic Barbell & Heavy Lifting Platforms",
    caption: "Competition-grade Eleiko steel plates and reinforced lifting stations.",
    span: "col-span-2",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    title: "Dumbbell Bay & Free Weight Conditioning",
    caption: "Polyurethane dumbbells up to 60 kg with calibrated rack spacing.",
    span: "col-span-1",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600",
    title: "Sprint Turf & Sled Pushing Track",
    caption: "30-meter high-density turf track for sled sprints, plyometrics, and agility drills.",
    span: "col-span-1",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600",
    title: "Recovery Suite: Contrast Therapy & Saunas",
    caption: "Full-spectrum infrared saunas and cold immersion plunge baths at 8°C.",
    span: "col-span-2",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600",
    title: "Combat & Functional Strike Ring",
    caption: "Heavy teardrop bags, custom ring canvas, and martial mobility floor.",
    span: "col-span-1",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200",
    thumb: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600",
    title: "Private Locker Suites & Hydrotherapy",
    caption: "Keyless digital lockers, rain showers, and bespoke grooming amenities.",
    span: "col-span-1",
  },
];

export default function GallerySection() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseLightbox();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImageIndex, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <section id="gallery" style={{ padding: "80px 24px", maxWidth: 1360, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
          Facility Architecture
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", margin: "8px 0 14px", letterSpacing: "-0.03em" }}>
          FACILITY GALLERY
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 560, margin: "0 auto" }}>
          Engineered for peak output. Explore our training zones, recovery chambers, and private athlete lounges.
        </p>
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => handleOpenLightbox(idx)}
            className="gallery-item-card"
            style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              height: 280,
              background: "#14141b",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            }}
          >
            <img
              src={img.thumb}
              alt={img.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease, filter 0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />

            {/* Bottom Gradient overlay with Title */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(6, 6, 10, 0.9) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px 22px",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                {img.title}
              </div>
              <div style={{ fontSize: 11, color: "#a1a1aa" }}>Click to expand view ↗</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={handleCloseLightbox}
        >
          <div
            style={{
              position: "relative",
              maxWidth: 960,
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              aria-label="Close Lightbox"
              style={{
                position: "absolute",
                top: -46,
                right: 0,
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            {/* Main Lightbox Image */}
            <div
              style={{
                width: "100%",
                maxHeight: "72vh",
                overflow: "hidden",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9)",
                background: "#0a0a0f",
              }}
            >
              <img
                src={GALLERY_IMAGES[activeImageIndex].url}
                alt={GALLERY_IMAGES[activeImageIndex].title}
                style={{
                  width: "100%",
                  maxHeight: "72vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            {/* Caption & Navigation Controls */}
            <div
              style={{
                width: "100%",
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
                  {GALLERY_IMAGES[activeImageIndex].title}
                </div>
                <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
                  {GALLERY_IMAGES[activeImageIndex].caption}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#71717a", fontFamily: "monospace", marginRight: 8 }}>
                  {activeImageIndex + 1} / {GALLERY_IMAGES.length}
                </span>

                <button
                  onClick={handlePrev}
                  aria-label="Previous Image"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: 14,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  ← Prev
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next Image"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: 14,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
