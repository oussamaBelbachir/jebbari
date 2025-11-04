import { useEffect, useState } from "react";

// ---------------- CONFIG ----------------
const resignationDate = "2025-09-19";
const noticeMonths = 2;
const colleagueName = "Ahmed Jebbari";
const colleagueImage =
  "https://media.licdn.com/dms/image/v2/D4E03AQFbFKscdzJhJw/profile-displayphoto-shrink_400_400/B4EZS2gYmeHgAk-/0/1738228732244?e=1763596800&v=beta&t=9HNNpciqc8VdLBXNzLf7V1pLZloxqSLXv3fh8Qa8iFM";
const companyLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1qpZYRecBy-CBW_cCQoaPc6YxAvNIrXQbWA&s";
// ----------------------------------------

function addMonths(dateObj, months) {
  const d = new Date(dateObj.getTime());
  const targetMonth = d.getMonth() + months;
  d.setMonth(targetMonth);
  if (d.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    d.setDate(0);
  }
  return d;
}

function daysBetween(dateA, dateB) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const a = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const b = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
  return Math.ceil((b - a) / msPerDay);
}

export default function App() {
  const [now, setNow] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  const resign = new Date(resignationDate + "T00:00:00");
  const endDate = addMonths(resign, noticeMonths);
  const remaining = daysBetween(now, endDate);

  // Update time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isFinalCountdown = remaining <= 15 && remaining > 0;

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: isMobile
          ? "white"
          : isFinalCountdown
          ? "linear-gradient(135deg, #a3daffff 0%, #84bdffff 100%)"
          : "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
        padding: 0,
        transition: "background 1s ease",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "32px 40px",
          borderRadius: 20,
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
          maxWidth: 480,
          width: "100%",
          position: "relative",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <img
            src={companyLogo}
            alt="Company Logo"
            style={{ height: 50, objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            width: 140,
            height: 140,
            margin: "0 auto 20px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={colleagueImage}
            alt={colleagueName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <h1 style={{ margin: 0, fontSize: 26 }}>{colleagueName}</h1>
        <p style={{ marginTop: 6, marginBottom: 24, color: "#555", fontSize: 15 }}>
          Démission déposée le{" "}
          <strong>
            {resign.toLocaleDateString("fr-FR", { timeZone: "Africa/Casablanca" })}
          </strong>
          <br />
          Préavis : <strong>{noticeMonths} mois</strong>
        </p>

        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1,
            padding: "20px 28px",
            borderRadius: 14,
            background: isFinalCountdown ? "#ff4d4f15" : "#0b72ff15",
            color: isFinalCountdown ? "#d63031" : "inherit",
            display: "inline-block",
            minWidth: 240,
            marginBottom: 16,
            animation: isFinalCountdown
              ? "pulse 1.2s ease-in-out infinite"
              : "none",
          }}
        >
          {remaining > 0 ? `J - ${remaining}` : "J - 0 🎉"}
        </div>

        <div style={{ color: "#666", fontSize: 14, marginBottom: 10 }}>
          Date de fin du préavis :{" "}
          <strong>
            {endDate.toLocaleDateString("fr-FR", { timeZone: "Africa/Casablanca" })}
          </strong>
        </div>

        {isFinalCountdown && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 20px",
              borderRadius: 12,
              background: "#fff0f0",
              color: "#d63031",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "0 0 12px rgba(255,0,0,0.2)",
              animation: "shake 0.5s ease-in-out infinite alternate",
            }}
          >
            🚨 Plus que {remaining} jours avant la fin du préavis ! 🚨
          </div>
        )}

        <div style={{ color: "#666", fontSize: 14, marginTop: 20 }}>
          lgelb 7liib akha skkar
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes shake {
            0% { transform: translateX(-2px); }
            100% { transform: translateX(2px); }
          }
        `}
      </style>
    </div>
  );
}
