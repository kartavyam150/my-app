import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './curtains.css';
import { useNavigate } from 'react-router-dom';

const CurtainShow = () => {
  const [opened, setOpened] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = () => {
    setOpened(true);
    setTimeout(() => {
      setShowWelcome(true);
    }, 2000);
  };

  useEffect(() => {
    if (showWelcome) {
      confetti({
        particleCount: 250,
        spread: 180,
        origin: { y: 0.6 },
      });
    }
  }, [showWelcome]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Go to Default Page</button>
      <div className="curtain-wrapper">
        <div className={`curtain left ${opened ? 'open' : ''}`}></div>
        <div className={`curtain right ${opened ? 'open' : ''}`}></div>

        {!opened && (
          <div className="launch-btn-wrapper">
            <button onClick={handleLaunch}>Launch 🚀</button>
          </div>
        )}

        <div className={`revealed-content ${showWelcome ? 'show' : ''}`}>
          🎉Welcome to the Grand Inauguration!🎉
        </div>

        {/* Ropes and tiebacks */}
        {!opened && (
          <div className="tieback left-tie"></div>
        )}
        {!opened && (
          <div className="tieback right-tie"></div> 
        )}
        {!opened && (
          <div className="curtain-rope left-rope"></div>
        )}
        {!opened && (
          <div className="curtain-rope right-rope"></div>
        )}
      </div>
    </div>
      
  );
};

export default CurtainShow;
