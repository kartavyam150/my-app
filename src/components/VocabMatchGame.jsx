import React, { useState, useEffect } from "react";

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort(() => Math.random() - 0.5).map(a => a[1]);
}

const celebratoryStyle = {
  animation: 'celebrate 1s',
  background: 'linear-gradient(90deg, #a8ff78 0%, #78ffd6 100%)',
  color: '#222',
  borderRadius: 10,
  fontWeight: 'bold',
  boxShadow: '0 2px 12px #0002',
};

const VocabMatchGame = () => {
  const [vocabSet, setVocabSet] = useState([]);
  const [terms, setTerms] = useState([]);
  const [defs, setDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    fetch('/vocab_questions.json')
      .then(res => res.json())
      .then(data => {
        // Randomly select 7 to 10 questions for each game
        const count = Math.floor(Math.random() * 4) + 7; // 7,8,9,10
        const selected = shuffle(data).slice(0, count);
        setVocabSet(selected);
        setTerms(shuffle(selected));
        setDefs(shuffle(selected));
      });
  }, []);

  const handleTermClick = (term) => setSelectedTerm(term);
  const handleDefClick = (def) => setSelectedDef(def);

  useEffect(() => {
    if (selectedTerm && selectedDef) {
      if (selectedTerm.term === selectedDef.term) {
        setMatches([...matches, selectedTerm.term]);
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 900);
      }
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 900);
    }
    // eslint-disable-next-line
  }, [selectedTerm, selectedDef]);

  const getHint = () => {
    const unmatched = terms.filter(t => !matches.includes(t.term));
    if (unmatched.length === 0) return;
    const hintTerm = unmatched[0];
    const hintDef = defs.find(d => d.term === hintTerm.term);
    setSelectedTerm(hintTerm);
    setSelectedDef(hintDef);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 1200);
  };

  // Add a function to start a new game
  const startNewGame = () => {
    fetch('/vocab_questions.json')
      .then(res => res.json())
      .then(data => {
        const count = Math.floor(Math.random() * 4) + 7; // 7,8,9,10
        const selected = shuffle(data).slice(0, count);
        setVocabSet(selected);
        setTerms(shuffle(selected));
        setDefs(shuffle(selected));
        setMatches([]);
        setSelectedTerm(null);
        setSelectedDef(null);
        setShowHint(false);
        setCelebrate(false);
      });
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '2rem auto', padding: 16, background: '#f0fdfa', borderRadius: 16, boxShadow: '0 4px 32px #0001', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', fontWeight: 'bold', fontSize: 22, marginBottom: 12 }}>Vocabulary Match</h2>
      <div style={{ textAlign: 'center', color: '#888', fontSize: 13, marginBottom: 8 }}>
        Showing {vocabSet.length} random questions
        <button
          onClick={startNewGame}
          style={{
            marginLeft: 14,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            padding: '5px 14px',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #2563eb40',
            transition: 'background 0.2s'
          }}
        >
          Start Again
        </button>
      </div>
      <div style={{ display: 'flex', gap: 60, justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 250, maxWidth: 400 }}>
          <h3 style={{ color: '#0ea5e9', marginBottom: 6, fontSize: 15 }}>Terms</h3>
          {terms.map((t) => (
            <div
              key={t.term}
              onClick={() => !matches.includes(t.term) && handleTermClick(t)}
              style={{
                padding: '7px 12px',
                margin: '6px 0',
                background: matches.includes(t.term) ? '#bbf7d0' : selectedTerm?.term === t.term ? '#facc15' : '#fff',
                color: '#222',
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 15,
                cursor: matches.includes(t.term) ? 'not-allowed' : 'pointer',
                border: selectedTerm?.term === t.term ? '2px solid #f59e42' : '2px solid #e0e7ff',
                boxShadow: selectedTerm?.term === t.term ? '0 2px 8px #f59e4280' : '0 1px 4px #0001',
                transition: 'all 0.2s',
                ...((celebrate && selectedTerm?.term === t.term) ? celebratoryStyle : {})
              }}
            >
              {t.term}
            </div>
          ))}
        </div>
        <div style={{ minWidth: 500, maxWidth: 900 }}>
          <h3 style={{ color: '#0ea5e9', marginBottom: 6, fontSize: 15 }}>Definitions</h3>
          {defs.map((d) => (
            <div
              key={d.term}
              onClick={() => !matches.includes(d.term) && handleDefClick(d)}
              style={{
                padding: '7px 12px',
                margin: '6px 0',
                background: matches.includes(d.term) ? '#bbf7d0' : selectedDef?.term === d.term ? '#facc15' : '#fff',
                color: '#222',
                borderRadius: 7,
                fontWeight: 500,
                fontSize: 13,
                cursor: matches.includes(d.term) ? 'not-allowed' : 'pointer',
                border: selectedDef?.term === d.term ? '2px solid #f59e42' : '2px solid #e0e7ff',
                boxShadow: selectedDef?.term === d.term ? '0 2px 8px #f59e4280' : '0 1px 4px #0001',
                transition: 'all 0.2s',
                wordBreak: 'break-word',
                ...((celebrate && selectedDef?.term === d.term) ? celebratoryStyle : {})
              }}
            >
              {d.def}
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
          onClick={getHint}
          style={{
            background: '#f59e42',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 28px',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #f59e4280',
            marginRight: 12
          }}
        >
          Hint
        </button>
        {matches.length === vocabSet.length && (
          <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 22, marginLeft: 16 }}>
            🎉 All matched! Great job!
          </span>
        )}
        {showHint && <span style={{ color: '#f59e42', fontWeight: 600, marginLeft: 12 }}>Hint shown!</span>}
      </div>
      <style>{`
        @keyframes celebrate {
          0% { transform: scale(1); }
          30% { transform: scale(1.15) rotate(-3deg); }
          60% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VocabMatchGame;
