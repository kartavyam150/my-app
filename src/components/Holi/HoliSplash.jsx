import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HoliSplash.module.css";
import {  FaTint} from "react-icons/fa";

const HoliSplash = () => {
  const containerRef = useRef(null);
  const [showWave, setShowWave] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (event.target.classList.contains(styles.clearButton)) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    throwBalloon(x, y);
  };

  const throwBalloon = (x, y) => {
    const balloon = document.createElement("div");
    balloon.className = styles.balloon;
    balloon.style.left = `${x - 25}px`;
    balloon.style.top = `${y - 25}px`;
    balloon.style.background = `radial-gradient(circle at center, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8), rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5))`;
    containerRef.current.appendChild(balloon);

    setTimeout(() => {
      createCenterSplash(x, y);
      createSprinkles(x, y);
      balloon.remove();
    }, 800);
  };

  const createCenterSplash = (x, y) => {
    const splash = document.createElement("div");
    splash.className = styles.centerSplash;
    splash.style.left = `${x}px`;
    splash.style.top = `${y}px`;
    containerRef.current.appendChild(splash);
  };

  const createSprinkles = (x, y) => {
    const colors = ["red", "blue", "green", "yellow", "pink", "purple", "orange"];
    for (let i = 0; i < 150; i++) {
      const sprinkle = document.createElement("div");
      sprinkle.className = styles.sprinkle;
      sprinkle.style.left = `${x}px`;
      sprinkle.style.top = `${y}px`;
      sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];

      let angle = Math.random() * 2 * Math.PI;
      let distance = Math.random() * 150 + 50;
      let offsetX = Math.cos(angle) * distance;
      let offsetY = Math.sin(angle) * distance;

      let size = Math.random() < 0.7 ? Math.random() * 3 + 1 : Math.random() * 6 + 4;
      sprinkle.style.width = `${size}px`;
      sprinkle.style.height = `${size}px`;

      sprinkle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      containerRef.current.appendChild(sprinkle);
    }
  };

  const createWaterSplash = () => {
    setShowWave(true);
    setTimeout(() => {
      setShowWave(false);
    }, 2000); // Duration matches the CSS animation
  };

  const clearSplashes = () => {
    containerRef.current.querySelectorAll(`.${styles.sprinkle}, .${styles.centerSplash}`).forEach(el => el.remove());
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className={styles.backButton}
        aria-label="Back to Home"
      >
        🏠
      </button>
      <h1 className={styles.title}>Holi Splash!</h1>
      <p className={styles.description}>
        Click anywhere to throw a balloon and create a splash!
      </p>
      <div
      ref={containerRef}
      className={styles.container}
      onClick={handleClick}
    >
      {showWave && (
        <div className={styles.waveOverlay}>
          <div className={styles.wave}></div>
          <div className={styles.wave} style={{ animationDelay: "0.5s" }}></div>
        </div>
      )}
      <button
        className={styles.clearButton}
        onClick={e => {
          e.stopPropagation();
          clearSplashes();
          createWaterSplash();
        }}
      >
        {/* 💧  */}
        {<FaTint/>}
      </button>
    </div>
    </div>
    
  );
};

export default HoliSplash;