import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NumberToIndianWords = () => {
  const [number, setNumber] = useState('');
  const [words, setWords] = useState('');
  const navigate = useNavigate();


  const units = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];
  const teens = [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const tens = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty',
    'sixty', 'seventy', 'eighty', 'ninety'
  ];

  const getTwoDigitWord = (n) => {
    n = parseInt(n);
    if (n === 0) return '';
    if (n < 10) return units[n];
    else if (n < 20) return teens[n - 10];
    else return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
  };

  const numToWords = (num) => {
    if (!num || isNaN(num)) return 'Invalid number';
    if (num === '0') return 'zero';

    let n = parseInt(num, 10);
    let crore = Math.floor(n / 10000000);
    n = n % 10000000;
    let lakh = Math.floor(n / 100000);
    n = n % 100000;
    let thousand = Math.floor(n / 1000);
    n = n % 1000;
    let hundred = Math.floor(n / 100);
    n = n % 100;
    let rest = getTwoDigitWord(n);

    let result = '';
    if (crore) result += getTwoDigitWord(crore) + ' crore ';
    if (lakh) result += getTwoDigitWord(lakh) + ' lakh ';
    if (thousand) result += getTwoDigitWord(thousand) + ' thousand ';
    if (hundred) result += units[hundred] + ' hundred ';
    if (n && result !== '') result += 'and ';
    result += rest;

    return result.trim().replace(/\s+/g, ' ');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumber(value);
      setWords(value ? numToWords(value) : '');
    } else {
      setWords('Please enter valid digits only');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg space-y-4">
      <button onClick={() => navigate("/")}>Go to Default Page</button>
      <h1 className="text-2xl font-bold text-center text-indigo-600">Indian Number to Words Converter</h1>
      <input
        type="text"
        value={number}
        onChange={handleChange}
        placeholder="Enter a number (e.g., 1234567)" 
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="text-gray-700 text-lg">
        {number && <p><strong>In Words:</strong> {words}</p>}
      </div>
    </div>
  );
};

export default NumberToIndianWords;
