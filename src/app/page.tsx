"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Heart } from "lucide-react";
import { cities, properties } from "@/lib/seed";
import PropertyCard from "@/components/PropertyCard";

export default function HomePage() {
  const featured = properties.filter(p => p.is_popular).slice(0, 3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(r => r.json())
      .then(d => setIsLoggedIn(!!d.user))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero" style={{ textAlign: "center" }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: "5rem", letterSpacing: "-0.05em", fontWeight: 800, marginBottom: "0.5rem" }}>PG Life</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "1rem" }}>Happiness per Square Foot.</p>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: 500, marginInline: "auto" }}>The most trusted platform for high-end, verified paying guest accommodations across India.</p>
        </motion.div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Explore India</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Handpicked locations in the country&apos;s most vibrant hubs.</p>
        </div>

        <div className="cities-grid">
          {cities.map((city, i) => (
            <motion.div 
              key={city.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/property-list?city=${city.name}`}>
                <div className="city-card">
                  <img src={city.image} alt={city.name} />
                  <div className="city-card-label">
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, opacity: 0.8 }}>PREMIUM PGS IN</div>
                    {city.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Featured Homes</h2>
          <p style={{ color: "var(--text-muted)" }}>Our most popular and highly-rated residencies this month.</p>
        </div>
        
        <div className="properties-container" style={{ margin: 0, maxWidth: "none" }}>
          {featured.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PropertyCard property={p} interestedCount={12 + i} isInterested={false} isLoggedIn={isLoggedIn} />
            </motion.div>
          ))}
        </div>
        
        <div style={{ textAlign: "center", marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
           <Link href="/add-property" className="book-btn" style={{ display: "inline-block", background: "#0071e3", color: "white", padding: "1rem 2rem", borderRadius: 12, fontWeight: 700 }}>
              List your Property →
           </Link>
        </div>
      </section>

      <section className="section" style={{ background: "var(--text)", color: "white", padding: "8rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 800, marginInline: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
             <div style={{ textAlign: "center" }}>
               <CheckCircle size={32} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
               <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>100%</div>
               <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>VERIFIED</div>
             </div>
             <div style={{ textAlign: "center" }}>
               <ShieldCheck size={32} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
               <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>ZERO</div>
               <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>BROKERAGE</div>
             </div>
             <div style={{ textAlign: "center" }}>
               <Heart size={32} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
               <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>24/7</div>
               <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>SUPPORT</div>
             </div>
          </div>
          <h2 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>Seamless experience.</h2>
          <p style={{ opacity: 0.7, fontSize: "1.1rem", lineHeight: 1.6 }}>
            Every PG on our platform undergoes a rigorous 48-point check. No hidden costs. No agent fees. Just you and your new sanctuary.
          </p>
        </div>
      </section>
    </>
  );
}
