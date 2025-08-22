import React, { useState } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [resultEn, setResultEn] = useState(null);
  const [error, setError] = useState("");

  const searchWord = async (e) => {
    e.preventDefault();
    setResultEn(null);
    setError("");
    if (!word.trim()) return;
    try {
      const resEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!resEn.ok) throw new Error("Word not found in English.");
      const dataEn = await resEn.json();
      setResultEn(dataEn[0]);
    } catch (err) {
      setError("No definition found for this word.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24, background: "#f0fdfa", borderRadius: 16, boxShadow: "0 4px 32px #0001" }}>
      <h2 style={{ color: "#2563eb", fontWeight: "bold", fontSize: 22, marginBottom: 12 }}>Dictionary</h2>
      <form onSubmit={searchWord} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Enter a word"
          style={{ flex: 1, padding: "8px 14px", borderRadius: 8, border: "2px solid #2563eb", fontSize: 16 }}
        />
        <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
          Search
        </button>
      </form>
      {error && <div style={{ color: "#ef4444", marginBottom: 8 }}>{error}</div>}
      {resultEn && (
        <div>
          <h3 style={{ color: "#0ea5e9", marginBottom: 6 }}>{resultEn.word} (English)</h3>
          {resultEn.meanings && resultEn.meanings.map((meaning, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>{meaning.partOfSpeech}</div>
              <ul>
                {meaning.definitions.map((def, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {def.definition}
                    {def.example && <div style={{ color: "#888", fontSize: 13 }}>Example: {def.example}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;

