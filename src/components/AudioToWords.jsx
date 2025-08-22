import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AudioToWords = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Use 'hi-IN' for Hindi or other BCP-47 codes

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg space-y-4">
      <button onClick={() => navigate("/")}>Go to Default Page</button>
      <h2 className="text-2xl font-bold text-center text-indigo-600">Audio to Words</h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
        >
          Stop
        </button>
      </div>

      <textarea
        rows="6"
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
        value={transcript}
        readOnly
        placeholder="Your speech will appear here..."
      ></textarea>
    </div>
  );
};

export default AudioToWords;
