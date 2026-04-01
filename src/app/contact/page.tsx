"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="section" style={{ maxWidth: 900, padding: "6rem 1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Get in touch</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Have questions about a property or our service? We&apos;re here to help.</p>
          
          <div style={{ display: "grid", gap: "2rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ padding: "0.75rem", background: "#f5f5f7", borderRadius: 12 }}><Mail size={20} /></div>
              <div>
                <h4 style={{ fontWeight: 700 }}>Email Support</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>support@pglife.com</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ padding: "0.75rem", background: "#f5f5f7", borderRadius: 12 }}><Phone size={20} /></div>
              <div>
                <h4 style={{ fontWeight: 700 }}>Phone</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>+1 (234) 567-890</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ padding: "0.75rem", background: "#f5f5f7", borderRadius: 12 }}><MapPin size={20} /></div>
              <div>
                <h4 style={{ fontWeight: 700 }}>Headquarters</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Cyber Hub, Level 4, DLF Phase 2, Gurugram</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: "#f5f5f7", padding: "2.5rem", borderRadius: 24, position: "relative" }}
        >
          <form onSubmit={submit} style={{ display: "grid", gap: "1rem" }}>
            <input className="form-input" style={{ background: "white" }} placeholder="Your Name" required />
            <input className="form-input" style={{ background: "white" }} placeholder="Email Address" type="email" required />
            <textarea className="form-input" style={{ background: "white", minHeight: 120, paddingTop: "0.8rem", resize: "none" }} placeholder="How can we help?" required />
            <button className="book-btn" type="submit" style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Send Message <Send size={16} />
            </button>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}
              >
                <div>
                  <div style={{ color: "var(--accent)", marginBottom: "1rem" }}>✓ Sent</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>We&apos;ll be in touch soon.</h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
