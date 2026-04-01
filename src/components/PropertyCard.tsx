"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react";
import type { Property } from "@/lib/seed";
import { calcRating } from "@/lib/seed";
import StarRating from "./StarRating";

type Props = {
  property: Property;
  interestedCount: number;
  isInterested: boolean;
  isLoggedIn: boolean;
};

export default function PropertyCard({ property, interestedCount: initCount, isInterested: initInt, isLoggedIn }: Props) {
  const [isInterested, setIsInterested] = useState(initInt);
  const [count, setCount] = useState(initCount);
  const [loading, setLoading] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!isLoggedIn) return alert("Please login to mark interest.");
    setLoading(true);
    const res = await fetch("/api/interested", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ property_id: property.id }) });
    const data = await res.json();
    if (data.success) { setIsInterested(data.is_interested); setCount(data.count); }
    setLoading(false);
  };

  const rating = calcRating(property);
  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <motion.div 
      className="property-card"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="property-card-img" style={{ position: "relative" }}>
        <img 
          src={property.images[0]} 
          alt={property.name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          onError={e => { (e.target as HTMLImageElement).src = "/img/bg.jpg"; }} 
        />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          <div className={`gender-badge ${property.gender}`} style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            {property.gender.toUpperCase()}
          </div>
          {property.is_verified && (
            <div style={{ background: "white", color: "var(--accent)", padding: "0.2rem 0.6rem", borderRadius: 99, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
              <CheckCircle2 size={10} /> VERIFIED
            </div>
          )}
          {property.is_popular && (
             <div style={{ background: "var(--text)", color: "white", padding: "0.2rem 0.6rem", borderRadius: 99, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
               <TrendingUp size={10} /> TRENDING
             </div>
          )}
        </div>
      </div>
      
      <div className="property-card-body">
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h3 className="property-name">{property.name}</h3>
            <button className={`heart-btn ${isInterested ? "active" : ""}`} onClick={toggle} disabled={loading} style={{ background: "none", border: "none" }}>
              <Heart size={20} fill={isInterested ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>
          <p className="property-address">{property.address}</p>
          <div style={{ marginBottom: "1rem" }}>
            <StarRating rating={rating} />
          </div>
        </div>

        <div className="property-card-footer" style={{ marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          <div>
            <div className="rent">{formatter.format(property.rent)}<span>/month</span></div>
            <div className="interested-count" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
              {count > 0 ? `${count} people interested` : "Be the first to show interest"}
            </div>
          </div>
          <Link href={`/property/${property.id}`}>
            <button className="view-btn" style={{ background: "var(--text)", color: "white", padding: "0.5rem 1.25rem", fontSize: "0.8rem", height: "fit-content", borderRadius: 10 }}>
              Details <ChevronRight size={14} style={{ marginLeft: 4, verticalAlign: "middle" }} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
