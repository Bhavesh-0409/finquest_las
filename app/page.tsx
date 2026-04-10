export default function Home() {
  return (
    <div style={{ padding: "60px", textAlign: "center", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1 style={{ fontSize: "64px", fontWeight: "bold", margin: "0 0 40px 0", color: "#fbbf24" }}>FinQuest</h1>
      <p style={{ fontSize: "24px", marginBottom: "40px", color: "#d1d5db" }}>Welcome to FinQuest - Learn Finance Through Gaming</p>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/login" style={{ padding: "16px 32px", backgroundColor: "#22c55e", color: "white", textDecoration: "none", borderRadius: "8px", fontSize: "18px", fontWeight: "bold" }}>Sign In</a>
        <a href="/signup" style={{ padding: "16px 32px", backgroundColor: "#3b82f6", color: "white", textDecoration: "none", borderRadius: "8px", fontSize: "18px", fontWeight: "bold" }}>Create Account</a>
      </div>
    </div>
  );
}
