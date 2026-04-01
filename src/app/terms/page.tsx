"use client";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="section" style={{ maxWidth: 800, padding: "6rem 1.5rem" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "3rem" }}>Terms of Service</h1>
        
        <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
            <p>By accessing PG Life, you agree to abide by these terms. Our platform is a marketplace for property discovery; all final agreements are between the user and the property owner.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>2. User Conduct</h2>
            <p>Users must provide accurate information. Misrepresentation of identity or academic status may lead to permanent account suspension.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem", marginBottom: "1rem" }}>3. Limitation of Liability</h2>
            <p>PG Life is not liable for any disputes, damages, or issues arising from the physical property or the behavior of other residents.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
