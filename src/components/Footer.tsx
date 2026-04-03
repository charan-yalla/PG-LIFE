import Link from "next/link";
import { Globe, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  const cities = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad"];
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="footer">
      <div className="footer-inner" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", textAlign: "left" }}>
        <div>
          <div className="nav-brand" style={{ marginBottom: "1rem" }}>PG Life</div>
          <p className="footer-desc" style={{ maxWidth: 300 }}>
            Curated, verified, and high-end paying guest accommodations for modern professionals and students.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", color: "var(--text-muted)" }}>
            <Globe size={18} />
            <MessageSquare size={18} />
            <Mail size={18} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem" }}>
          <div className="footer-links">
            <h4 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>Cities</h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.75rem" }}>
              {cities.map(c => <li key={c}><Link href={`/property-list?city=${c}`} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{c}</Link></li>)}
            </ul>
          </div>
          <div className="footer-links">
            <h4 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>Company</h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.75rem" }}>
              {companyLinks.map(l => <li key={l.name}><Link href={l.path} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{l.name}</Link></li>)}
            </ul>
          </div>
          <div className="footer-links">
            <h4 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>Get Started</h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.75rem" }}>
              <li><Link href="/?auth=login" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>User Login</Link></li>
              <li><Link href="/?auth=signup" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>User Signup</Link></li>
              <li><Link href="/?auth=login&role=owner" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>Owner Login</Link></li>
              <li><Link href="/?auth=signup&role=owner" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>Owner Signup</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", marginTop: "4rem", paddingTop: "2rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} PG Life. Designed for the high-end experience.
        <div style={{ marginTop: "0.5rem", opacity: 0.8, fontStyle: "italic" }}>
          this project is developed by yalla lakshmi charan teja from jntu mahabubabad.
        </div>
      </div>
    </footer>
  );
}
