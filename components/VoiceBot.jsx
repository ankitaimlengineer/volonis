"use client";
import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

// આ કોડ ડેવલપમેન્ટ સ્ક્રીન પર દેખાતી પરમિશન એરરને બ્લોક કરી દેશે
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (
      errorString.includes('permissions-policy') ||
      errorString.includes('daily-co') ||
      errorString.includes('ReportingObserver')
    ) {
      return;
    }
    originalError(...args);
  };
}

export default function VoiceBot() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const vapiRef = useRef(null);

  useEffect(() => {
    try {
      vapiRef.current = new Vapi("da1b9268-abcf-42e3-a3d5-23a347a5f099");

      vapiRef.current.on("call-start", () => {
        setConnecting(false);
        setConnected(true);
        setErrorMessage("");
      });

      vapiRef.current.on("call-end", () => {
        setConnecting(false);
        setConnected(false);
      });

      vapiRef.current.on("error", (e) => {
        setConnecting(false);
        setConnected(false);
      });
    } catch (err) {}
  }, []);

  const toggleCall = async () => {
    if (!vapiRef.current) return;

    if (connected) {
      try {
        await vapiRef.current.stop();
      } catch (err) {}
      setConnected(false);
      setConnecting(false);
    } else {
      try {
        setConnecting(true);
        setErrorMessage("");
        await vapiRef.current.start("77521f26-9280-4d1d-912d-b4aed095d0fb");
      } catch (err) {
        setConnecting(false);
        setConnected(false);
      }
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      <button
        onClick={toggleCall}
        style={{
          background: connected ? "#dc2626" : "linear-gradient(to right, #2563eb, #06b6d4)",
          color: "white",
          padding: "14px 24px",
          borderRadius: "50px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "16px"
        }}
      >
        <span>🎙️</span>
        {connecting ? "Connecting..." : connected ? "End Call" : "Talk with VOLONIS AI"}
      </button>
    </div>
  );
}