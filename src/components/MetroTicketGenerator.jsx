import React, { useState } from "react";
import QRCode from "react-qr-code"; // Correct import for Vite

const stations = [
  "Ramwadi",
  "PCMC",
  "Sant Tukaram Nagar",
  "Kasarwadi",
  "Phugewadi",
  "Dapodi",
  "Bopodi",
  "Khadki",
  "Range Hills",
  "Shivajinagar",
  "Civil Court",
  "Kasba Peth",
  "Mandai",
  "Swargate",
  "Vanaz"
];

function getTodayDate() {
  const d = new Date();
  return d.toLocaleDateString();
}

function getNowTime() {
  const d = new Date();
  return d.toLocaleTimeString();
}

const MetroTicketGenerator = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ticket, setTicket] = useState(null);
  const [scanResult, setScanResult] = useState("");

  const handleGenerate = () => {
    if (!from || !to || from === to) {
      alert("Please select different boarding and off-boarding stations.");
      return;
    }
    const bookingDate = getTodayDate();
    const bookingTime = getNowTime();
    setTicket({
      from,
      to,
      bookingDate,
      bookingTime,
      validUntil: bookingDate
    });
    setScanResult("");
  };

  const handleScan = () => {
    if (!ticket) return;
    const today = getTodayDate();
    if (ticket.validUntil !== today) {
      setScanResult("❌ Ticket expired. Please generate a new ticket.");
    } else {
      setScanResult("✅ Ticket valid for travel.");
    }
  };

  // Use a readable string for QR code so Google Lens shows ticket info
  const qrData = ticket
    ? `Pune Metro Ticket\nFrom: ${ticket.from}\nTo: ${ticket.to}\nBooked: ${ticket.bookingDate} ${ticket.bookingTime}\nValid Until: ${ticket.validUntil}`
    : "";

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px #0002" }}>
      <h2 style={{ textAlign: "center", color: "#2563eb", marginBottom: 16 }}>Pune Metro Ticket Generator</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          From:{" "}
          <select value={from} onChange={e => setFrom(e.target.value)}>
            <option value="">Select station</option>
            {stations.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          To:{" "}
          <select value={to} onChange={e => setTo(e.target.value)}>
            <option value="">Select station</option>
            {stations.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={handleGenerate}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 24px",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 20
        }}
      >
        Generate Ticket
      </button>
      {ticket && (
        <div style={{ border: "1px solid #2563eb", borderRadius: 12, padding: 16, marginBottom: 16, background: "#f0f8ff" }}>
          <h3 style={{ color: "#2563eb", marginBottom: 8 }}>Your Ticket</h3>
          <div>From: <strong>{ticket.from}</strong></div>
          <div>To: <strong>{ticket.to}</strong></div>
          <div>Booking Date: <strong>{ticket.bookingDate}</strong></div>
          <div>Booking Time: <strong>{ticket.bookingTime}</strong></div>
          <div>Valid Until: <strong>{ticket.validUntil}</strong> (Today only)</div>
          <div style={{ margin: "16px auto", textAlign: "center", background: "#fff", padding: 8, borderRadius: 8 }}>
            <QRCode value={qrData} size={128} />
          </div>
          <button
            onClick={handleScan}
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 18px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 8
            }}
          >
            Scan QR
          </button>
          {scanResult && (
            <div style={{ marginTop: 10, color: scanResult.includes("valid") ? "#22c55e" : "#ef4444", fontWeight: "bold" }}>
              {scanResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MetroTicketGenerator;