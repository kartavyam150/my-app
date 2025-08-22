import React, { useState } from "react";

// Custom randomized Morse-like code for each character (not standard Morse)
const MORSE_CODE_MAP = {
  A: "-..-",    B: ".-.-",  C: "--..", D: "..-.",   E: "-.-",    F: "...-",
  G: ".--.",   H: "-.-.",  I: "--.-",   J: "-...",  K: ".-..",  L: "..--",
  M: "...-",    N: "-..",    O: ".-.-",  P: "--.-", Q: "-.-..", R: ".--..",
  S: "..-..",   T: "--..",     U: ".-..-",  V: "-...-", W: "..--.",  X: "--...",
  Y: ".---.",  Z: "...--",
  0: "-.-.-", 1: "--.--", 2: ".-.-.", 3: "-..-.", 4: "--..-",
  5: ".--.-", 6: "-.-..", 7: "..---", 8: "---..", 9: ".---."
};

const REVERSE_MORSE_CODE_MAP = Object.entries(MORSE_CODE_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

function textToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map(char =>
      char === " " ? "/" : MORSE_CODE_MAP[char] ? MORSE_CODE_MAP[char] : ""
    )
    .join(" ");
}

function morseToText(morse) {
  return morse
    .split(" ")
    .map(code =>
      code === "/" ? " " : REVERSE_MORSE_CODE_MAP[code] ? REVERSE_MORSE_CODE_MAP[code] : ""
    )
    .join("");
}

// QWERTY mapping reference
const QWERTY_MAP = {
  Q: "W", W: "E", E: "R", R: "T", T: "Y", Y: "U", U: "I", I: "O", O: "P", P: "A",
  A: "S", S: "D", D: "F", F: "G", G: "H", H: "J", J: "K", K: "L", L: "Z",
  Z: "X", X: "C", C: "V", V: "B", B: "N", N: "M", M: "Q"
};
const QWERTY_REVERSE_MAP = Object.entries(QWERTY_MAP).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

function qwertyMapText(text) {
  return text
    .split("")
    .map(char => {
      const upper = char.toUpperCase();
      if (QWERTY_MAP[upper]) {
        return char === upper ? QWERTY_MAP[upper] : QWERTY_MAP[upper].toLowerCase();
      }
      return char;
    })
    .join("");
}

function qwertyReverseMapText(text) {
  return text
    .split("")
    .map(char => {
      const upper = char.toUpperCase();
      if (QWERTY_REVERSE_MAP[upper]) {
        return char === upper ? QWERTY_REVERSE_MAP[upper] : QWERTY_REVERSE_MAP[upper].toLowerCase();
      }
      return char;
    })
    .join("");
}

const MorseCodeConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("text-to-morse");
  const [qwertyInput, setQwertyInput] = useState("");
  const [qwertyOutput, setQwertyOutput] = useState("");
  const [qwertyMode, setQwertyMode] = useState("encode");
  const [copyMsgMorse, setCopyMsgMorse] = useState("");
  const [copyMsgQwerty, setCopyMsgQwerty] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (mode === "text-to-morse") {
      setOutput(textToMorse(value));
    } else {
      setOutput(morseToText(value));
    }
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  const handleQwertyChange = (e) => {
    const value = e.target.value;
    setQwertyInput(value);
    if (qwertyMode === "encode") {
      setQwertyOutput(qwertyMapText(value));
    } else {
      setQwertyOutput(qwertyReverseMapText(value));
    }
  };

  const handleQwertyModeChange = (e) => {
    setQwertyMode(e.target.value);
    setQwertyInput("");
    setQwertyOutput("");
  };

  // const handleCopy = async () => {
  //   if (output) {
  //     try {
  //       await navigator.clipboard.writeText(output);
  //       setCopyMsgMorse("Copied!");
  //       setTimeout(() => setCopyMsgMorse(""), 1200);
  //     } catch (err) {
  //       setCopyMsgMorse("Copy failed");
  //     }
  //   }
  // };

  // const handleQwertyCopy = async () => {
  //   if (qwertyOutput) {
  //     try {
  //       await navigator.clipboard.writeText(qwertyOutput);
  //       setCopyMsgQwerty("Copied!");
  //       setTimeout(() => setCopyMsgQwerty(""), 1200);
  //     } catch (err) {
  //       setCopyMsgQwerty("Copy failed");
  //     }
  //   }
  // };

  const handleCopy = () => {
  if (output) {
    const tempInput = document.createElement("textarea");
    tempInput.value = output;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      setCopyMsgMorse("Copied!");
    } catch (err) {
      setCopyMsgMorse("Copy failed");
    }
    document.body.removeChild(tempInput);
    setTimeout(() => setCopyMsgMorse(""), 1200);
  }
};

const handleQwertyCopy = () => {
  if (qwertyOutput) {
    const tempInput = document.createElement("textarea");
    tempInput.value = qwertyOutput;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      setCopyMsgQwerty("Copied!");
    } catch (err) {
      setCopyMsgQwerty("Copy failed");
    }
    document.body.removeChild(tempInput);
    setTimeout(() => setCopyMsgQwerty(""), 1200);
  }
};


  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Morse Code Converter</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="radio"
            value="text-to-morse"
            checked={mode === "text-to-morse"}
            onChange={handleModeChange}
          />
          Text to Morse
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            value="morse-to-text"
            checked={mode === "morse-to-text"}
            onChange={handleModeChange}
          />
          Morse to Text
        </label>
      </div>
      {/* <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={mode === "text-to-morse" ? "Enter text to convert" : "Enter morse code (use / for space)"}
        style={{ width: "100%", padding: 8, marginBottom: 16 }}
      /> */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder={mode === "text-to-morse" ? "Enter text to convert" : "Enter morse code (use / for space)"}
            style={{ flexGrow: 1, padding: 8 }}
          />
          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              // background: "#f3f4f6",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Clear
          </button>
        </div>

      <div>
        <strong>{mode === "text-to-morse" ? "Morse Code:" : "Text:"}</strong>
        <div style={{ marginTop: 8, wordBreak: "break-all", fontFamily: "monospace" }}>{output}</div>
        {/* <button
          onClick={handleCopy}
          style={{
            marginTop: 10,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Copy to Clipboard
        </button> */}
        <button
          onClick={handleCopy}
          title="Copy to Clipboard"
          style={{
            marginTop: 10,
            // background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          📋
        </button>

        {copyMsgMorse && <span style={{ marginLeft: 12, color: "#22c55e", fontWeight: 600 }}>{copyMsgMorse}</span>}
      </div>
      <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid #eee" }}>
        <h3>QWERTY Mapping Reference</h3>
        <div style={{ marginBottom: 16 }}>
          <label>
            <input
              type="radio"
              value="encode"
              checked={qwertyMode === "encode"}
              onChange={handleQwertyModeChange}
            />
            QWERTY Encode
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              value="decode"
              checked={qwertyMode === "decode"}
              onChange={handleQwertyModeChange}
            />
            QWERTY Decode
          </label>
        </div>
        {/* <input
          type="text"
          value={qwertyInput}
          onChange={handleQwertyChange}
          placeholder={qwertyMode === "encode" ? "Enter text to map using QWERTY reference" : "Enter QWERTY-mapped text to decode"}
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        /> */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                type="text"
                value={qwertyInput}
                onChange={handleQwertyChange}
                placeholder={qwertyMode === "encode" ? "Enter text to map using QWERTY reference" : "Enter QWERTY-mapped text to decode"}
                style={{ flexGrow: 1, padding: 8 }}
              />
              <button
                onClick={() => {
                  setQwertyInput("");
                  setQwertyOutput("");
                }}
                style={{
                  color: "#000",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  // background: "#f3f4f6",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Clear
              </button>
            </div>


        <div>
          <strong>Mapped Output:</strong>
          <div style={{ marginTop: 8, wordBreak: "break-all", fontFamily: "monospace" }}>{qwertyOutput}</div>
          {/* <button
            onClick={handleQwertyCopy}
            style={{
              marginTop: 10,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Copy to Clipboard
          </button> */}
          <button
            onClick={handleQwertyCopy}
            title="Copy to Clipboard"
            style={{
              marginTop: 10,
              // background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 18,
              cursor: "pointer"
            }}
          >
            📋
          </button>

          {copyMsgQwerty && <span style={{ marginLeft: 12, color: "#22c55e", fontWeight: 600 }}>{copyMsgQwerty}</span>}
        </div>
      </div>
    </div>
  );
};

export default MorseCodeConverter;
