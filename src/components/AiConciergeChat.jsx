import React, { useState, useRef, useEffect } from "react";
import { queryAiConcierge } from "../utils/aiEngine";

let msgCounter = 100;
const getMsgId = (prefix) => `${prefix}-${++msgCounter}`;

export default function AiConciergeChat({ onSound }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "ai",
      text: "Greetings. I am your Sanctum AI Concierge. How can I assist your athletic preparation today?",
      actionLabel: "Explore Membership Tiers",
      actionTarget: "#plans",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Membership plans & pricing",
    "Cold plunge & sauna protocol",
    "How does the freeze policy work?",
    "Class schedule & coach ratio",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    if (onSound) onSound("pop");

    const userMsg = {
      id: getMsgId("u"),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const response = queryAiConcierge(text);
      const aiMsg = {
        id: getMsgId("ai"),
        sender: "ai",
        text: response.text,
        actionLabel: response.actionLabel,
        actionTarget: response.actionTarget,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      if (onSound) onSound("success");
    }, 400);
  };

  const handleActionClick = (target) => {
    setIsOpen(false);
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => {
          if (onSound) onSound("click");
          setIsOpen(!isOpen);
        }}
        aria-label="Open AI Concierge Chat"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 90,
          background: "linear-gradient(135deg, #181824 0%, #0d0d12 100%)",
          border: "1px solid rgba(225, 29, 72, 0.4)",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 30,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.06em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(225, 29, 72, 0.25)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.borderColor = "#e11d48";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "rgba(225, 29, 72, 0.4)";
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#e11d48",
            boxShadow: "0 0 8px #e11d48",
          }}
        />
        <span>✦ AI Concierge</span>
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Concierge Assistant"
          className="glass-panel"
          style={{
            position: "fixed",
            bottom: 84,
            left: 24,
            width: "calc(100vw - 48px)",
            maxWidth: 380,
            height: 520,
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(225, 29, 72, 0.2)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(12, 12, 18, 0.85)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #e11d48, #881337)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                ✦
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Sanctum AI Concierge</div>
                <div style={{ fontSize: 10, color: "#10b981", fontWeight: 700 }}>● Online & Intelligent</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#71717a",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((m) => {
              const isAi = m.sender === "ai";
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isAi ? "flex-start" : "flex-end",
                    maxWidth: "86%",
                  }}
                >
                  <div
                    style={{
                      background: isAi ? "rgba(255, 255, 255, 0.06)" : "linear-gradient(135deg, #e11d48, #be123c)",
                      color: isAi ? "#e4e4e7" : "#fff",
                      border: isAi ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                      borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                      padding: "10px 14px",
                      fontSize: 13,
                      lineHeight: 1.45,
                    }}
                  >
                    {m.text}
                  </div>

                  {m.actionLabel && (
                    <button
                      onClick={() => handleActionClick(m.actionTarget)}
                      style={{
                        marginTop: 6,
                        background: "rgba(225, 29, 72, 0.12)",
                        border: "1px solid rgba(225, 29, 72, 0.3)",
                        color: "#fb7185",
                        padding: "5px 12px",
                        borderRadius: 14,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {m.actionLabel} →
                    </button>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "8px 14px",
                  fontSize: 11,
                  color: "#a1a1aa",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>✦ Synthesizing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div
            style={{
              padding: "6px 12px",
              background: "rgba(8, 8, 12, 0.6)",
              display: "flex",
              gap: 6,
              overflowX: "auto",
              whiteSpace: "nowrap",
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
            }}
          >
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#cbd5e1",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 10,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: "10px 12px 14px",
              background: "rgba(10, 10, 16, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              type="text"
              placeholder="Ask AI Concierge anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
                padding: "8px 14px",
                color: "#fff",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              style={{
                background: "#e11d48",
                border: "none",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                opacity: !input.trim() ? 0.4 : 1,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
