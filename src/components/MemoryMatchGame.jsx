import React, { useState } from "react";

// Increase the number of emojis for more cards
const EMOJIS = [
  "😀", "🚀", "🌈", "🎸", "🍕", "🐶",
  "🎉", "📚", "🏀", "🎧", "🌟", "🍩",
  "🦄", "🧩", "🎮", "🍔", "🎬", "🦉",
  "🦋", "🥑", "🛒"
]; // Now 21 unique emojis = 42 cards
const QUESTIONS = [
  "What emoji best describes your morning?",
  "What’s a work skill you’re proud of developing?",
  "Share a fun fact about yourself!",
  "What’s your favorite way to unwind after work?",
  "If you could visit any country, where would you go?",
  "What’s a hobby you’d like to try?",
  "What’s your go-to productivity tip?",
  "What’s a team value you appreciate?",
  "What’s your favorite lunch or snack?",
  "What’s a recent small win you’d like to share?"
];

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

const getShuffledCards = () => shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));

const MemoryMatchGame = () => {
  const [cards, setCards] = useState(getShuffledCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [question, setQuestion] = useState(null);
  const [celebrate, setCelebrate] = useState(false);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || card.flipped || card.matched) return;
    const newFlipped = [...flipped, card.id];
    setCards(cards.map(c => c.id === card.id ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id));
      if (first.emoji === second.emoji) {
        setTimeout(() => {
          setCards(cards => cards.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
          setMatched(m => [...m, first.emoji]);
          setFlipped([]);
          setCelebrate(true);
          setTimeout(() => setCelebrate(false), 900);
        }, 700);
      } else {
        setTimeout(() => {
          setCards(cards => cards.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 900);
      }
    }
  };

  const handleQuestion = () => {
    setQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
  };

  const resetGame = () => {
    setCards(getShuffledCards());
    setFlipped([]);
    setMatched([]);
    setQuestion(null);
    setCelebrate(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: 24, background: 'linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)', borderRadius: 18, boxShadow: '0 4px 32px #0001', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', fontWeight: 'bold', fontSize: 28, marginBottom: 18 }}>Team Connect: Memory Match</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', marginBottom: 24 }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              width: 70,
              height: 90,
              background: card.flipped || card.matched ? '#fff' : '#a5b4fc',
              color: card.flipped || card.matched ? '#222' : '#fff',
              borderRadius: 12,
              fontSize: 38,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px #0001',
              cursor: card.flipped || card.matched ? 'default' : 'pointer',
              border: card.matched ? '3px solid #22c55e' : '2px solid #6366f1',
              transition: 'all 0.2s',
              position: 'relative',
              animation: (celebrate && card.matched) ? 'celebrate 1s' : undefined
            }}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <button
          onClick={handleQuestion}
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
          Conversation Starter
        </button>
        <button
          onClick={resetGame}
          style={{
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 28px',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #6366f180',
          }}
        >
          Reset Game
        </button>
      </div>
      {question && (
        <div style={{ background: '#fffbe7', color: '#b45309', borderRadius: 10, padding: 18, fontWeight: 600, fontSize: 18, textAlign: 'center', marginBottom: 12, boxShadow: '0 2px 8px #f59e4280' }}>
          {question}
        </div>
      )}
      {matched.length === EMOJIS.length && (
        <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginTop: 18 }}>
          🎉 All pairs matched! Team connected!
        </div>
      )}
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

export default MemoryMatchGame;
