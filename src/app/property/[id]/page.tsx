import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Star, Shield, Utensils, CheckCircle2 } from "lucide-react";
import { getPropertyById, getCityById, getPropertyAmenities, testimonials, calcRating } from "@/lib/seed";
import { getSession } from "@/lib/session";
import { getInterestedByProperty } from "@/lib/blob-db";
import StarRating from "@/components/StarRating";
import HeartSection from "@/components/HeartSection";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(Number(id));
  if (!property) notFound();

  const city = getCityById(property.city_id);
  const amenitiesList = getPropertyAmenities(property.id);
  const propertyTestimonials = testimonials.filter(t => t.property_id === property.id);
  const session = await getSession();
  const totalRating = calcRating(property);

  const amenityGroups = ["Building", "Common Area", "Bedroom", "Washroom"];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div className="detail-gallery">
        <img src={property.images[0]} alt={property.name} style={{ width: "100%", height: "500px", objectFit: "cover" }} />
      </div>

      <div className="detail-content">
        <div style={{ flex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/" style={{ color: "var(--accent)", fontWeight: 600 }}>Home</Link> / 
            <Link href={`/property-list?city=${city?.name}`}> {city?.name}</Link> / 
            <span> {property.name}</span>
          </nav>

          <header style={{ marginBottom: "3rem" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>{property.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
              <MapPin size={16} /> {property.address}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <StarRating rating={totalRating} />
            </div>
          </header>

          <section className="detail-section">
            <h2>About this space</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1.05rem" }}>{property.description}</p>
          </section>

          <section className="detail-section">
            <h2>Amenities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {amenityGroups.map(group => {
                const items = amenitiesList.filter(a => a.type === group);
                if (!items.length) return null;
                return (
                  <div key={group}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "1rem" }}>{group}</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {items.map(a => (
                        <span key={a.id} className="amenity-chip" style={{ margin: 0 }}>
                          <CheckCircle2 size={14} style={{ color: "var(--accent)" }} /> {a.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="detail-section">
            <h2>Ratings</h2>
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {[
                { label: "Cleanliness", val: property.rating_clean, icon: <CheckCircle2 size={16} /> },
                { label: "Food Quality", val: property.rating_food, icon: <Utensils size={16} /> },
                { label: "Safety", val: property.rating_safety, icon: <Shield size={16} /> }
              ].map(r => (
                <div key={r.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                   <div style={{ width: 120, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>{r.icon} {r.label}</div>
                   <div style={{ flex: 1, height: 6, background: "var(--bg-secondary)", borderRadius: 10 }}>
                     <div style={{ width: `${(r.val / 5) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: 10 }} />
                   </div>
                   <div style={{ fontWeight: 700, width: 30, textAlign: "right" }}>{r.val}</div>
                </div>
              ))}
            </div>
          </section>

          {propertyTestimonials.length > 0 && (
            <section className="detail-section">
              <h2>What residents say</h2>
              <div style={{ display: "grid", gap: "1rem" }}>
                {propertyTestimonials.map(t => (
                  <div key={t.id} style={{ padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: 16 }}>
                    <p style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "0.5rem" }}>&ldquo;{t.content}&rdquo;</p>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>— {t.user_name}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          <div className="booking-card" style={{ top: "100px" }}>
            <HeartSection 
              propertyId={property.id} 
              rent={property.rent}
              gender={property.gender}
              isLoggedIn={!!session.user} 
            />
            <p style={{ fontSize: "0.7rem", textAlign: "center", marginTop: "1rem", color: "var(--text-muted)" }}>
              Price inclusive of all taxes and basic utilities.
            </p>
          </div>
        </aside>
      </div>
    </div>

  );
}
