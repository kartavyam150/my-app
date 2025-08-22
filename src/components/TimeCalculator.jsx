import React, { useState } from "react";

function pad(n) {
  return n.toString().padStart(2, '0');
}

function toSeconds(h, m, s) {
  return h * 3600 + m * 60 + s;
}

function fromSeconds(total) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { h, m, s };
}

const TimeCalculator = () => {
  const [inputs, setInputs] = useState([
    { h: 0, m: 0, s: 0 },
    { h: 0, m: 0, s: 0 }
  ]);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const handleChange = (idx, field, value) => {
    const val = Math.max(0, parseInt(value) || 0);
    setInputs(inputs => inputs.map((inp, i) => i === idx ? { ...inp, [field]: val } : inp));
  };

  const calculate = () => {
    const secs = inputs.map(inp => toSeconds(inp.h, inp.m, inp.s));
    let total = operation === "add" ? secs[0] + secs[1] : Math.abs(secs[0] - secs[1]);
    setResult(fromSeconds(total));
  };

  // New: Time difference calculator using clock inputs
  const [startTime, setStartTime] = useState("09:00:00");
  const [endTime, setEndTime] = useState("18:00:00");
  const [diffResult, setDiffResult] = useState(null);

  const calcTimeDiff = () => {
    const [sh, sm, ss] = startTime.split(":").map(Number);
    const [eh, em, es] = endTime.split(":").map(Number);
    let startSecs = toSeconds(sh, sm, ss);
    let endSecs = toSeconds(eh, em, es);
    if (endSecs < startSecs) endSecs += 24 * 3600; // handle overnight
    setDiffResult(fromSeconds(endSecs - startSecs));
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: 32, background: '#f8fafc', borderRadius: 20, boxShadow: '0 4px 24px #0001', textAlign: 'center' }}>
      <h2 style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 24, marginBottom: 18 }}>Time Calculator</h2>
      {[0, 1].map(idx => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 600, color: '#0ea5e9' }}>Time {idx + 1}:</span>
          <input type="number" min="0" value={inputs[idx].h} onChange={e => handleChange(idx, 'h', e.target.value)} style={{ width: 40, margin: '0 4px' }} />h
          <input type="number" min="0" value={inputs[idx].m} onChange={e => handleChange(idx, 'm', e.target.value)} style={{ width: 40, margin: '0 4px' }} />m
          <input type="number" min="0" value={inputs[idx].s} onChange={e => handleChange(idx, 's', e.target.value)} style={{ width: 40, margin: '0 4px' }} />s
        </div>
      ))}
      <div style={{ margin: '12px 0' }}>
        <button onClick={() => setOperation('add')} style={{ background: operation === 'add' ? '#22c55e' : '#e0e7ef', color: operation === 'add' ? '#fff' : '#222', border: 'none', borderRadius: 6, padding: '6px 18px', marginRight: 8, fontWeight: 600, cursor: 'pointer' }}>Add</button>
        <button onClick={() => setOperation('subtract')} style={{ background: operation === 'subtract' ? '#f59e42' : '#e0e7ef', color: operation === 'subtract' ? '#fff' : '#222', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Subtract</button>
      </div>
      <button onClick={calculate} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 16 }}>Calculate</button>
      {result && (
        <div style={{ marginTop: 18, fontSize: 20, color: '#2563eb', fontWeight: 700 }}>
          Result: {pad(result.h)}h : {pad(result.m)}m : {pad(result.s)}s
        </div>
      )}
      <div style={{ margin: '2.5rem 0 1.5rem', borderTop: '1px solid #eee', paddingTop: 18 }}>
        <h3 style={{ color: '#0ea5e9', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Calculate Time Difference</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, alignItems: 'center', marginBottom: 10 }}>
          <span>Start Time:</span>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} step="1" style={{ fontSize: 18, padding: '6px 16px', borderRadius: 8, border: '2px solid #2563eb', background: '#e0f2fe', color: '#222', fontWeight: 600, boxShadow: '0 1px 6px #2563eb22', outline: 'none', transition: 'border 0.2s' }} />
          <span>End Time:</span>
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} step="1" style={{ fontSize: 18, padding: '6px 16px', borderRadius: 8, border: '2px solid #2563eb', background: '#e0f2fe', color: '#222', fontWeight: 600, boxShadow: '0 1px 6px #2563eb22', outline: 'none', transition: 'border 0.2s' }} />
          <button onClick={calcTimeDiff} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, cursor: 'pointer', marginLeft: 8, fontSize: 16 }}>Calculate</button>
        </div>
        {diffResult && (
          <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginTop: 8 }}>
            Difference: {pad(diffResult.h)}h : {pad(diffResult.m)}m : {pad(diffResult.s)}s
          </div>
        )}
        <div style={{ color: '#888', fontSize: 12, marginTop: 6 }}>
          Example: Start 09:30:00, End 18:15:00 → 8h 45m 0s<br />If end time is earlier than start, it counts as next day.
        </div>
      </div>
      <div style={{ marginTop: 18, color: '#888', fontSize: 13 }}>
        Enter two times, choose add or subtract, and click Calculate.<br />
        Example: Add 1h 30m 0s and 2h 45m 30s → 4h 15m 30s
      </div>
    </div>
  );
};

export default TimeCalculator;
