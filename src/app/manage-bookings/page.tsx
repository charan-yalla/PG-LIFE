"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Phone, Mail, Home, Inbox } from "lucide-react";

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings/owner").then(r => r.json()).then(d => {
      if (d.success) setBookings(d.bookings);
      setLoading(false);
    });
  }, []);

  return (
    <div className="section" style={{ minHeight: "80vh" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>Manage Bookings</h1>
        <p style={{ color: "var(--text-muted)" }}>You have {bookings.length} viewing requests across your properties.</p>
      </div>

      {loading ? (
        <div style={{ padding: "5rem", textAlign: "center", color: "var(--text-muted)" }}>Loading requests...</div>
      ) : bookings.length === 0 ? (
        <div style={{ padding: "8rem 2rem", textAlign: "center", background: "white", borderRadius: 24, border: "1px dashed var(--border)" }}>
           <div style={{ display: "inline-flex", padding: "1.5rem", background: "#f5f5f7", borderRadius: 99, marginBottom: "1.5rem", color: "var(--text-muted)" }}>
             <Inbox size={32} />
           </div>
           <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>No viewing requests yet</h2>
           <p style={{ color: "var(--text-muted)" }}>When someone books a viewing for your PG, it will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {bookings.map((b, i) => (
            <motion.div 
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="modal"
              style={{ position: "static", boxShadow: "none", border: "1px solid var(--border)", background: "white", padding: "1.5rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--accent)", marginBottom: "0.25rem" }}>NEW REQUEST</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{b.user_name}</h3>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={12} /> {new Date(b.timestamp).toLocaleDateString()}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Home size={14} style={{ color: "var(--text)" }} />
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>{b.property_name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={14} /> {b.user_phone}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Mail size={14} /> {b.user_email}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <User size={14} /> {b.gender || "Gender unspecified"}
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <button className="book-btn" style={{ flex: 1, background: "var(--text)", color: "white", borderRadius: 8, height: 40, fontSize: "0.8rem", fontWeight: 600 }}>Accept</button>
                <button className="nav-btn" style={{ flex: 1, borderRadius: 8, height: 40, fontSize: "0.8rem" }}>Decline</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
