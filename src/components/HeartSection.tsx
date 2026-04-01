"use client";
import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  propertyId: number;
  rent: number;
  initCount: number;
  initInterested: boolean;
  isLoggedIn: boolean;
  gender: string;
};

export default function HeartSection({ propertyId, rent, initCount, initInterested, isLoggedIn, gender }: Props) {
  const [isInterested, setIsInterested] = useState(initInterested);
  const [count, setCount] = useState(initCount);
  const [booked, setBooked] = useState(false);

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

  const book = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div className="rent" style={{ fontSize: "1.75rem" }}>{formatter.format(rent)}<span>/month</span></div>
        <button className={`heart-btn ${isInterested ? "active" : ""}`} onClick={toggle} style={{ background: "none", border: "none" }}>
          <Heart size={24} fill={isInterested ? "currentColor" : "none"} />
        </button>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Verified residence for <b>{gender}s</b>. 
        Secure your spot with a single click.
      </div>

      <button onClick={book} className="book-btn" style={{ background: "var(--text)", width: "100%", borderRadius: 12, height: 50, position: "relative", overflow: "hidden", color: "white" }}>
        <AnimatePresence mode="wait">
          {booked ? (
            <motion.span key="booked" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <Check size={18} /> Viewing Requested
            </motion.span>
          ) : (
            <motion.span key="book" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
              Book Viewing
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className="interested-count" style={{ marginTop: "1rem", fontSize: "0.8rem", textAlign: "center", opacity: 0.7 }}>
        {count} residents showed interest
      </div>
    </div>
  );
}
