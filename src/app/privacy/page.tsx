"use client";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="section" style={{ maxWidth: 800, padding: "6rem 1.5rem" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "3rem" }}>Privacy Policy</h1>
        
        <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>1. Data Collection</h2>
            <p>We collect information you provide directly to us when you create an account, mark interest in a property, or contact support. This includes your name, email address, phone number, and college details.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>2. Use of Information</h2>
            <p>We use the data we collect to personalize your experience, process your property interests, and improve our platform. Your contact details are shared with property managers only when you explicitly mark interest.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>3. Data Security</h2>
            <p>We implement industry-standard encryption and security measures to protect your personal data from unauthorized access or disclosure.</p>
          </section>
          
          <p style={{ marginTop: "4rem", fontSize: "0.85rem" }}>Last Updated: April 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
