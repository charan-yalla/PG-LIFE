import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, School, Phone, Heart } from "lucide-react";
import { getSession } from "@/lib/session";
import { getUserById, getInterestedByUser } from "@/lib/blob-db";
import { getPropertyById, calcRating } from "@/lib/seed";
import PropertyCard from "@/components/PropertyCard";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.user) redirect("/");

  const user = await getUserById(session.user.id) ?? session.user;
  const interested = await getInterestedByUser(session.user.id);
  const intProperties = interested.map(i => getPropertyById(i.property_id)).filter(Boolean);

  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div className="page-header" style={{ background: "white", padding: "4rem 1.5rem" }}>
         <div className="breadcrumb">
           <Link href="/" style={{ color: "var(--accent)", fontWeight: 600 }}>Home</Link> / 
           <span> Dashboard</span>
         </div>
         <h1 className="page-title">Profile</h1>
         
         <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3rem" }}>
           <div style={{ width: 80, height: 80, borderRadius: 99, background: "var(--text)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700 }}>
             {session.user.full_name[0].toUpperCase()}
           </div>
           <div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{session.user.full_name}</h2>
             <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
               <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} /> {session.user.email}</span>
               <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} /> {session.user.phone}</span>
               <span style={{ display: "flex", alignItems: "center", gap: 6 }}><School size={14} /> {session.user.college_name}</span>
             </div>
           </div>
         </div>
      </div>

      <div className="section">
         <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "2rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Heart size={18} style={{ color: "#f43f5e" }} /> Interested PGs ({intProperties.length})
         </h2>

         {intProperties.length === 0 ? (
           <div style={{ padding: "4rem 2rem", background: "white", borderRadius: 24, textAlign: "center", border: "1px dashed var(--border)" }}>
             <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>You haven&apos;t marked any properties as interested yet.</p>
             <Link href="/property-list?city=Delhi" style={{ color: "var(--accent)", fontWeight: 600 }}>Explore Properties →</Link>
           </div>
         ) : (
           <div className="properties-container" style={{ margin: 0, maxWidth: "none" }}>
             {intProperties.map(p => p && (
               <PropertyCard 
                 key={p.id} 
                 property={p} 
                 interestedCount={0} 
                 isInterested={true} 
                 isLoggedIn={true} 
               />
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
