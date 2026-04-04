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
  const [showModal, setShowModal] = useState(false);

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

  const book = async () => {
    if (!isLoggedIn) return alert("Please login to book a viewing.");
    setShowModal(true);
    // Best-effort API call in background
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property_id: propertyId }),
    }).catch(() => {});
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

      <button onClick={book} className="book-btn" style={{ background: "var(--text)", width: "100%", borderRadius: 12, height: 50, color: "white" }}>
        Book Viewing
      </button>

      <div className="interested-count" style={{ marginTop: "1rem", fontSize: "0.8rem", textAlign: "center", opacity: 0.7 }}>
        {count} residents showed interest
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" style={{ display: "flex", zIndex: 1000 }}>
            <motion.div 
              className="modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ textAlign: "center", padding: "3rem 2rem" }}
            >
              <div style={{ background: "var(--accent-dim)", color: "var(--accent)", width: 64, height: 64, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Check size={32} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Thank You!</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.5 }}>
                Your request has been received.<br />
                Our team will contact you shortly to confirm the viewing.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="book-btn"
                style={{ background: "var(--text)", color: "white", width: "100%", borderRadius: 12, height: 50 }}
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
