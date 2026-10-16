import React, { useState } from "react";

export default function BmiCalculatorSection() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w)) {
      setError("Please enter valid numeric values for height and weight.");
      return;
    }

    if (h < 100 || h > 250) {
      setError("Height must be a realistic value between 100 cm and 250 cm.");
      return;
    }

    if (w < 30 || w > 300) {
      setError("Weight must be a realistic value between 30 kg and 300 kg.");
      return;
    }

    const heightInMeters = h / 100;
    const bmiVal = w / (heightInMeters * heightInMeters);
    const rounded = parseFloat(bmiVal.toFixed(1));

    let category = "";
    let color = "";
    let advice = "";

    if (rounded < 18.5) {
      category = "Underweight";
      color = "#38bdf8";
      advice = "Consider a structured hypertrophy strength program and surplus nutritional coaching.";
    } else if (rounded <= 24.9) {
      category = "Normal / Athletic Range";
      color = "#10b981";
      advice = "Excellent baseline. Focus on progressive overload, conditioning, and joint recovery.";
    } else if (rounded <= 29.9) {
      category = "Overweight";
      color = "#f59e0b";
      advice = "Note: High-muscle athletes frequently fall in this category. Consider our complimentary InBody scan.";
    } else {
      category = "Obesity Range";
      color = "#e11d48";
      advice = "A structured aerobic and functional resistance protocol under coach guidance is recommended.";
    }

    setResult({
      bmi: rounded,
      category,
      color,
      advice,
    });
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    setError("");
  };

  return (
    <section id="calculator" style={{ padding: "80px 24px", maxWidth: 1040, margin: "0 auto" }}>
      <div
        className="glass-panel"
        style={{
          borderRadius: 28,
          padding: "44px 36px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(225, 29, 72, 0.2) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#e11d48", textTransform: "uppercase" }}>
            Self-Assessment Tool
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#fff", margin: "6px 0 10px" }}>
            BODY MASS INDEX (BMI) CALCULATOR
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 13, maxWidth: 520, margin: "0 auto" }}>
            Calculate your general screening indicator instantly. Computed 100% locally on your device.
          </p>
        </div>

        <form onSubmit={handleCalculate} style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                Height (in Centimetres)
              </label>
              <input
                type="number"
                placeholder="e.g. 178"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <span style={{ fontSize: 10, color: "#71717a", marginTop: 4, display: "block" }}>Range: 100 – 250 cm</span>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#d4d4d8", textTransform: "uppercase" }}>
                Weight (in Kilograms)
              </label>
              <input
                type="number"
                placeholder="e.g. 76"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <span style={{ fontSize: 10, color: "#71717a", marginTop: 4, display: "block" }}>Range: 30 – 300 kg</span>
            </div>
          </div>

          {error && (
            <div style={{ background: "rgba(225, 29, 72, 0.12)", border: "1px solid rgba(225, 29, 72, 0.3)", color: "#fb7185", padding: "10px 14px", borderRadius: 10, fontSize: 12, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(225, 29, 72, 0.35)",
              }}
            >
              Compute BMI Score
            </button>
            {(height || weight || result) && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#a1a1aa",
                  padding: "12px 20px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Result Card */}
        {result && (
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto 28px",
              background: "rgba(10, 10, 16, 0.8)",
              border: `1px solid ${result.color}55`,
              borderRadius: 20,
              padding: "24px 28px",
              textAlign: "center",
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${result.color}22`,
              animation: "fadeIn 0.25s ease-out",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>
              Your Calculated Index
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: result.color, fontFamily: "Syne", margin: "6px 0" }}>
              {result.bmi}
            </div>
            <div
              style={{
                display: "inline-block",
                background: `${result.color}20`,
                border: `1px solid ${result.color}66`,
                color: result.color,
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {result.category}
            </div>
            <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, maxWidth: 500, margin: "0 auto" }}>
              {result.advice}
            </p>
          </div>
        )}

        {/* Medical & Body Composition Disclaimer */}
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            padding: "14px 18px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 12,
            fontSize: 11,
            color: "#71717a",
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: "#a1a1aa" }}>Notice:</strong> Body Mass Index (BMI) is a general statistical screening tool based solely on total mass and height. It does not differentiate between dense muscle mass, body fat percentage, bone structure, or water retention. Sanctum provides complimentary biometric InBody scans for accurate athlete profiling.
        </div>
      </div>
    </section>
  );
}
