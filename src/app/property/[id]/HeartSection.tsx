"use client";
import { useState } from "react";

export default function HeartSection({ propertyId, initCount, initInterested, isLoggedIn }: {
  propertyId: number; initCount: number; initInterested: boolean; isLoggedIn: boolean;
}) {
  const [isInterested, setIsInterested] = useState(initInterested);
  const [count, setCount] = useState(initCount);

  const toggle = async () => {
    if (!isLoggedIn) return alert("Please login to mark interest.");
    const res = await fetch("/api/interested", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property_id: propertyId }),
    });
    const data = await res.json();
    if (data.success) { setIsInterested(data.is_interested); setCount(data.count); }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
      <button className={`heart-btn${isInterested ? " active" : ""}`} onClick={toggle}>
        {isInterested ? "♥" : "♡"}
      </button>
      <span className="interested-count">{count} interested</span>
    </div>
  );
}
