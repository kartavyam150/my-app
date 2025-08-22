import React, { useState } from "react";

const units = [
  { label: "Acre", value: "acre" },
  { label: "Bigha", value: "bigha" },
  { label: "Guntha", value: "guntha" },
  { label: "Square Feet", value: "sqft" },
  { label: "Square Meter", value: "sqm" },
  { label: "Hectare", value: "hectare" }
];

// Conversion rates to square feet (approximate, varies by region for bigha)
const conversionRates = {
  acre: 43560,
  bigha: 27225, // North India (can be customized)
  guntha: 1089,
  sqft: 1,
  sqm: 10.7639,
  hectare: 107639
};

function convertLand(value, fromUnit) {
  const valueInSqft = parseFloat(value) * conversionRates[fromUnit];
  const result = {};
  for (const unit of Object.keys(conversionRates)) {
    result[unit] = valueInSqft / conversionRates[unit];
  }
  return result;
}

const bgUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Field/land image

const LandMeasurementConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("acre");
  const [converted, setConverted] = useState({});

  const handleConvert = () => {
    if (!inputValue || isNaN(inputValue)) return;
    setConverted(convertLand(inputValue, inputUnit));
  };

  return (
    <div style={{
      maxWidth: 900,
      minWidth: 400,
      margin: "3rem auto",
      padding: 40,
      border: "1px solid #ccc",
      borderRadius: 16,
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.45)',
        zIndex: 0,
        borderRadius: 16
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 36, marginBottom: 24 }}>Land Measurement Converter</h2>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Enter value"
            style={{ flex: 2, padding: 16, fontSize: 20, borderRadius: 8, border: '1px solid #bbb' }}
          />
          <select value={inputUnit} onChange={e => setInputUnit(e.target.value)}
            style={{
              flex: 2,
              padding: 16,
              fontSize: 20,
              borderRadius: 8,
              border: '1px solid #bbb',
              background: `transparent url('data:image/svg+xml;utf8,<svg fill="white" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.516 7.548a1 1 0 0 1 1.415 0L10 10.617l3.07-3.07a1 1 0 1 1 1.415 1.415l-3.777 3.778a1 1 0 0 1-1.415 0L5.516 8.963a1 1 0 0 1 0-1.415z"/></svg>') no-repeat right 16px center/20px 20px`,
              color: '#fff',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              outline: 'none',
              fontWeight: 'bold'
            }}
          >
            {units.map(u => (
              <option key={u.value} value={u.value} style={{ background: '#222', color: '#fff' }}>{u.label}</option>
            ))}
          </select>
          <button onClick={handleConvert} style={{ padding: '16px 32px', fontSize: 20, borderRadius: 8, cursor: 'pointer', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>Convert</button>
        </div>
        {Object.keys(converted).length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4 style={{ fontSize: 24, marginBottom: 12 }}>Converted Values:</h4>
            <ul style={{ fontSize: 20, lineHeight: 2 }}>
              {units.map(u => (
                <li key={u.value}>
                  <strong>{u.label}:</strong> {converted[u.value].toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandMeasurementConverter;
