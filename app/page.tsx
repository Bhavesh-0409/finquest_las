import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px", color: "#fbbf24" }}>
          FinQuest
        </h1>
        <p style={{ fontSize: "24px", marginBottom: "30px", color: "#d1d5db" }}>
          Master Finance Through Interactive Gaming
        </p>
        <p style={{ fontSize: "16px", marginBottom: "50px", color: "#9ca3af", lineHeight: "1.6" }}>
          Learn personal finance, investing, and wealth-building while completing exciting quests and challenges. Track your progress with XP, compete on leaderboards, and master your financial future.
        </p>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginBottom: "60px" }}>
          <Link href="/login">
            <span style={{ 
              padding: "14px 32px", 
              backgroundColor: "#22c55e", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: "8px", 
              fontSize: "18px", 
              fontWeight: "bold",
              display: "inline-block",
              cursor: "pointer"
            }}>
              Sign In
            </span>
          </Link>
          <Link href="/signup">
            <span style={{ 
              padding: "14px 32px", 
              backgroundColor: "#3b82f6", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: "8px", 
              fontSize: "18px", 
              fontWeight: "bold",
              display: "inline-block",
              cursor: "pointer"
            }}>
              Create Account
            </span>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "50px" }}>
          <div style={{ padding: "20px", backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🎮</div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Interactive Learning</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Learn through games, quizzes, and scenarios</p>
          </div>
          <div style={{ padding: "20px", backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>📈</div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Track Progress</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Monitor XP, levels, and achievements</p>
          </div>
          <div style={{ padding: "20px", backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏆</div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Compete</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Climb leaderboards and compete globally</p>
          </div>
          <div style={{ padding: "20px", backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>💡</div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Expert Content</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Get daily finance news and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
