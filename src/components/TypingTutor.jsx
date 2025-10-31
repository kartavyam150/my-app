import React, { useState, useEffect, useRef } from 'react';
import './TypingTutor.css';

const TypingTutor = () => {
  const [text, setText] = useState('');
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const timerRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog and then takes a nap under the shade of a large oak tree, dreaming of chasing more elusive creatures in its sleep.",
    "Never underestimate the power of a good book; its pages hold countless worlds, ideas, and adventures waiting to be discovered by an eager and open mind.",
    "The early bird catches the worm, but the second mouse gets the cheese, illustrating that sometimes patience and strategic timing can lead to greater rewards than haste.",
    "Innovation distinguishes between a leader and a follower, as true progress comes from those who dare to think differently and challenge the status quo.",
    "The only way to do great work is to love what you do, for passion fuels perseverance and transforms ordinary tasks into extraordinary achievements."
  ];

  useEffect(() => {
    generateNewText();
  }, []);

  useEffect(() => {
    if (startTime && !endTime) {
      timerRef.current = setInterval(() => {
        const duration = (new Date() - startTime) / 1000; // seconds
        calculateWPM(duration);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, endTime, inputText]);

  const generateNewText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setText(sampleTexts[randomIndex]);
    setInputText('');
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setAccuracy(100);
    setWpm(0);
  };

  const handleReset = () => {
    setInputText('');
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setAccuracy(100);
    setWpm(0);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);

    if (!startTime) {
      setStartTime(new Date());
    }

    if (value === text) {
      setEndTime(new Date());
      calculateWPM((new Date() - startTime) / 1000);
    }

    calculateMistakes(value);
    calculateAccuracy(value);
  };

  const calculateMistakes = (currentInput) => {
    let errorCount = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] !== text[i]) {
        errorCount++;
      }
    }
    setMistakes(errorCount);
  };

  const calculateAccuracy = (currentInput) => {
    if (currentInput.length === 0) {
      setAccuracy(100);
      return;
    }
    const correctChars = Array.from(currentInput).filter((char, index) => char === text[index]).length;
    const currentAccuracy = (correctChars / currentInput.length) * 100;
    setAccuracy(currentAccuracy.toFixed(2));
  };

  const calculateWPM = (durationInSeconds) => {
    if (durationInSeconds <= 0) {
      setWpm(0);
      return;
    }
    const wordsTyped = inputText.split(' ').length;
    const minutes = durationInSeconds / 60;
    const currentWPM = wordsTyped / minutes;
    setWpm(currentWPM.toFixed(2));
  };

  const getCharClass = (char, index) => {
    if (index < inputText.length) {
      return char === inputText[index] ? 'correct' : 'incorrect';
    }
    return '';
  };

  return (
    <div className="typing-tutor-container">
      <h2>Typing Tutor</h2>
      <div className="text-display">
        {text.split('').map((char, index) => (
          <span key={index} className={getCharClass(char, index)}>
            {char}
          </span>
        ))}
      </div>
      <textarea
        className="typing-input"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        disabled={endTime !== null}
      />
      <div className="stats">
        <p>Time: {startTime && !endTime ? Math.floor((new Date() - startTime) / 1000) : (endTime ? Math.floor((endTime - startTime) / 1000) : 0)}s</p>
        <p>Speed: {wpm} WPM</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Mistakes: {mistakes}</p>
      </div>
      <div className="button-container">
        <button onClick={generateNewText}>New Text</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TypingTutor;