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
  if (d.getMonth() !== ((targetMonth) % 12 + 12) % 12) {
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

  // Update time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // e.g., mobile < 768px
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const remaining = daysBetween(now, endDate);

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: isMobile
          ? "white"
          : "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
        padding: 20,
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
          Démission déposée le
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
            background: "#0b72ff15",
            display: "inline-block",
            minWidth: 240,
            marginBottom: 16,
          }}
        >
          {remaining > 0 ? `J - ${remaining}` : "J - 0 🎉"}
        </div>

        <div style={{ color: "#666", fontSize: 14 }}>
          Date de fin du préavis :{" "}
          <strong>
            {endDate.toLocaleDateString("fr-FR", { timeZone: "Africa/Casablanca" })}
          </strong>
        </div>
        <div style={{ color: "#666", fontSize: 14 }}>lgelb 7liib akha skkar</div>
      </div>
    </div>
  );
}
