"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, SearchX, RotateCcw } from "lucide-react";
import { getPropertiesByCity } from "@/lib/seed";
import type { Property } from "@/lib/seed";
import PropertyCard from "@/components/PropertyCard";

function PropertyListInner() {
  const params = useSearchParams();
  const city = params.get("city") || "";
  const [properties, setProperties] = useState<Property[]>([]);
  const [interested, setInterested] = useState<Record<number, { count: number; isInt: boolean }>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState<"all" | "male" | "female" | "unisex">("all");
  const [sort, setSort] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const props = getPropertiesByCity(city);
    setProperties(props);
    fetch("/api/auth/session").then(r => r.json()).then(d => {
      setIsLoggedIn(!!d.user);
      if (props.length > 0) {
        fetch(`/api/interested/bulk?city=${city}`).then(r => r.json()).then(intData => {
          if (intData) setInterested(intData);
        }).catch(() => {});
      }
    });
  }, [city]);

  let shown = [...properties];
  if (filter !== "all") shown = shown.filter(p => p.gender === filter);
  if (sort === "asc") shown.sort((a, b) => a.rent - b.rent);
  if (sort === "desc") shown.sort((a, b) => b.rent - a.rent);

  const reset = () => { setFilter("all"); setSort(""); };

  return (
    <div style={{ minHeight: "80vh", paddingBottom: "5rem" }}>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <span>{city}</span>
        </div>
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {city || "All Properties"}
        </motion.h1>
      </div>

      <div className="filter-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SlidersHorizontal size={14} style={{ color: "var(--text-muted)" }} />
          {(["all", "male", "female", "unisex"] as const).map(g => (
            <button key={g} className={`filter-btn${filter === g ? " active" : ""}`} onClick={() => setFilter(g)}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <button className={`filter-btn${sort === "asc" ? " active" : ""}`} onClick={() => setSort(s => s === "asc" ? "" : "asc")}>
             <ArrowUpAZ size={14} style={{ marginRight: 4 }} /> Low to High
          </button>
          <button className={`filter-btn${sort === "desc" ? " active" : ""}`} onClick={() => setSort(s => s === "desc" ? "" : "desc")}>
            <ArrowDownAZ size={14} style={{ marginRight: 4 }} /> High to Low
          </button>
        </div>
      </div>

      <div className="properties-container">
        <AnimatePresence mode="popLayout">
          {shown.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ padding: "8rem 2rem", textAlign: "center", width: "100%", background: "white", borderRadius: 24, border: "1px dashed var(--border)" }}
            >
              <div style={{ display: "inline-flex", padding: "1.5rem", background: "#f5f5f7", borderRadius: 99, marginBottom: "1.5rem", color: "var(--text-muted)" }}>
                 <SearchX size={32} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>No matches found</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: 300, marginInline: "auto" }}>
                Try adjusting your filters or search for another city.
              </p>
              <button 
                onClick={reset}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", background: "var(--text)", color: "white", border: "none", borderRadius: 12, fontWeight: 600, fontSize: "0.9rem" }}
              >
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </motion.div>
          ) : (
            shown.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <PropertyCard
                  property={p}
                  interestedCount={interested[p.id]?.count ?? 0}
                  isInterested={interested[p.id]?.isInt ?? false}
                  isLoggedIn={isLoggedIn}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PropertyListPage() {
  return <Suspense><PropertyListInner /></Suspense>;
}
