import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
        <h1>Counter Page</h1>
        <button 
          onClick={() => navigate("/")}
          style={{
            fontSize: 14,
            padding: '4px 12px',
            borderRadius: 6,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            marginBottom: 16,
            marginTop: 8,
            cursor: 'pointer',
            fontWeight: 500,
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}
        >
          Go to Default Page
        </button>
        <br />
      
      <p style={{
        fontSize: 48,
        fontWeight: 'bold',
        color: count > 0 ? '#22c55e' : count < 0 ? '#ef4444' : '#2563eb',
        background: 'linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%)',
        borderRadius: 12,
        padding: '16px 32px',
        margin: '24px 0',
        boxShadow: '0 2px 12px #0001',
        display: 'inline-block',
        minWidth: 120,
        textAlign: 'center',
        letterSpacing: 2
      }}>
        Count: {count}
      </p>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setCount(count + 1)} style={{ margin: '0 8px 8px 0', padding: '8px 18px', fontSize: 16, borderRadius: 8, border: 'none', background: '#22d3ee', color: '#222', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>Increment by 1</button>
        <button onClick={() => setCount(count - 1)} style={{ margin: '0 8px 8px 0', padding: '8px 18px', fontSize: 16, borderRadius: 8, border: 'none', background: '#fbbf24', color: '#222', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>Decrement by 1</button>
        <button onClick={() => setCount(count * 2)} style={{ margin: '0 8px 8px 0', padding: '8px 18px', fontSize: 16, borderRadius: 8, border: 'none', background: '#a3e635', color: '#222', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>Multiply by 2</button>
        <button onClick={() => setCount(count / 2)} style={{ margin: '0 8px 8px 0', padding: '8px 18px', fontSize: 16, borderRadius: 8, border: 'none', background: '#f87171', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>Divide by 2</button>
      </div>
    </div>
  );
};

export default Counter;
