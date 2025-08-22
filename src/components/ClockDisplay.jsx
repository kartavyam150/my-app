import React, { useEffect, useState } from "react";

const getTimeParts = () => {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
};

const pad = (n) => n.toString().padStart(2, "0");

const AnalogClock = ({ hours, minutes, seconds }) => {
  // Calculate angles
  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{ background: "#222", borderRadius: "50%", boxShadow: "0 2px 12px #0006" }}>
      <circle cx="80" cy="80" r="75" fill="#222" stroke="#fff" strokeWidth="4" />
      {/* Hour hand */}
      <line x1="80" y1="80" x2={80 + 35 * Math.sin((Math.PI / 180) * hourAngle)} y2={80 - 35 * Math.cos((Math.PI / 180) * hourAngle)} stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="80" y1="80" x2={80 + 55 * Math.sin((Math.PI / 180) * minuteAngle)} y2={80 - 55 * Math.cos((Math.PI / 180) * minuteAngle)} stroke="#4f8cff" strokeWidth="4" strokeLinecap="round" />
      {/* Second hand */}
      <line x1="80" y1="80" x2={80 + 65 * Math.sin((Math.PI / 180) * secondAngle)} y2={80 - 65 * Math.cos((Math.PI / 180) * secondAngle)} stroke="#ff4f4f" strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="80" cy="80" r="6" fill="#fff" />
      {/* Hour marks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={80 + 65 * Math.sin(angle)}
            y1={80 - 65 * Math.cos(angle)}
            x2={80 + 72 * Math.sin(angle)}
            y2={80 - 72 * Math.cos(angle)}
            stroke="#fff"
            strokeWidth="3"
          />
        );
      })}
    </svg>
  );
};

// Map for converting Western digits to Devanagari numerals
const DEVANAGARI_DIGITS = ['०','१','२','३','४','५','६','७','८','९'];
function toDevanagari(num) {
  return num.toString().split('').map(d => (d >= '0' && d <= '9') ? DEVANAGARI_DIGITS[+d] : d).join('');
}

const DigitalClock = ({ hours, minutes, seconds }) => (
  <div style={{
    fontSize: 36,
    fontFamily: 'Gotu, sans-serif',
    color: '#ffffff',
    background: '#111',
    borderRadius: 8,
    padding: '12px 32px',
    marginTop: 16,
    boxShadow: '0 2px 8px #0004',
    display: 'inline-block',
    letterSpacing: 2,
    fontWeight:400,
    // textShadow: '0 0 1px #4f8cff, 0 0 2px #4f8cff, 1px 0 #4f8cff, 0 1px #4f8cff'
  }}>
    {toDevanagari(pad(hours))}:{toDevanagari(pad(minutes))}:{toDevanagari(pad(seconds))}
  </div>
);

const ClockDisplay = () => {
  const [time, setTime] = useState(getTimeParts());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeParts()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 32 }}>
      <h2 style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 28, marginBottom: 12 }}>Digital & Analog Clock</h2>
      <AnalogClock {...time} />
      <DigitalClock {...time} />
    </div>
  );
};

export default ClockDisplay;
