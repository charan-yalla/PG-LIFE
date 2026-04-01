"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn, LogOut, X, Phone, Mail, School } from "lucide-react";
import type { SessionUser } from "@/lib/session";

type Props = { user: SessionUser | null };

export default function Navbar({ user: initialUser }: Props) {
  const [user, setUser] = useState(initialUser);
  const [modal, setModal] = useState<"login" | "signup" | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", phone: "", gender: "male", college_name: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (data.success) { setUser(data.user); setModal(null); router.refresh(); }
    else setError(data.message);
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    const res = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (data.success) { setModal("login"); setError("Account created! Please log in."); }
    else setError(data.message);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null); router.refresh();
  };

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="nav-brand">PG Life</Link>
        <div className="nav-links">
          {user ? (
            <>
              <span className="nav-username" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                 {user.full_name.split(" ")[0]}
              </span>
              <Link href="/dashboard" className="nav-btn">Dashboard</Link>
              <button onClick={logout} className="nav-btn">
                <LogOut size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setModal("signup")} className="nav-btn">Sign up</button>
              <button onClick={() => setModal("login")} className="nav-btn primary">Login</button>
            </>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {modal && (
          <div className="modal-overlay" style={{ display: "flex" }}>
            <motion.div 
              className="modal"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {modal === "login" ? "Welcome back" : "Join PG Life"}
                </h2>
                <button onClick={() => setModal(null)} className="heart-btn" style={{ fontSize: "1.2rem" }}><X size={20} /></button>
              </div>

              <form onSubmit={modal === "login" ? login : signup}>
                {modal === "signup" && (
                  <div className="form-group">
                    <input className="form-input" name="full_name" placeholder="Full Name" required onChange={handle} />
                  </div>
                )}
                
                <div className="form-group">
                  <input className="form-input" type="email" name="email" placeholder="Email" required onChange={handle} />
                </div>
                
                <div className="form-group">
                  <input className="form-input" type="password" name="password" placeholder="Password" required onChange={handle} />
                </div>

                {modal === "signup" && (
                  <>
                    <div className="form-row">
                      <input className="form-input" name="phone" placeholder="Phone" maxLength={10} required onChange={handle} />
                      <select className="form-input" name="gender" onChange={handle}>
                        <option value="male">Male</option><option value="female">Female</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input className="form-input" name="college_name" placeholder="College Name" required onChange={handle} />
                    </div>
                  </>
                )}

                <button className="form-submit" disabled={loading}>
                  {loading ? "Processing..." : modal === "login" ? "Sign In" : "Create Account"}
                </button>
                
                {error && <p style={{ fontSize: "0.8rem", color: "#f43f5e", marginTop: "1rem", textAlign: "center" }}>{error}</p>}
                
                <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {modal === "login" ? "No account? " : "Already have an account? "}
                  <button type="button" onClick={() => setModal(modal === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600 }}>
                    {modal === "login" ? "Register" : "Sign In"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
