"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="section" style={{ maxWidth: 800, padding: "6rem 1.5rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Our Story</span>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.04em" }}>Happiness per Square Foot.</h1>
        
        <div style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "2rem" }}>
            PG Life was founded with a simple yet powerful vision: to redefine what it means to stay away from home. We believe that a roof over your head shouldn&apos;t just be a shelter—it should be a sancutary.
          </p>
          <p style={{ marginBottom: "2rem" }}>
            In a world of complicated brokerage, hidden costs, and inconsistent safety standards, we set out to build a platform that prioritizes human experience above all else. Every property on our platform is hand-verified, every meal quality is checked, and every safety standard is non-negotiable.
          </p>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text)", fontWeight: 700, margin: "3rem 0 1rem" }}>The PG Life Promise</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem" }}>✅ <b>Zero Hidden Costs:</b> What you see is what you pay. No agent fees, ever.</li>
            <li style={{ marginBottom: "1rem" }}>✅ <b>Verified Excellence:</b> Every listing is vetted by our local team for cleanliness and safety.</li>
            <li style={{ marginBottom: "1rem" }}>✅ <b>Community First:</b> We design spaces that encourage meaningful connections.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
