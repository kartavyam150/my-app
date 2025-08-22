import  { useEffect, useState } from 'react';
import styles from './ProgressTracker.module.css';

const ProgressTracker = ({ currentXP = 0 }) => {
  const maxXP = 100;
  const [level, setLevel] = useState(1);
  const [xpPercentage, setXpPercentage] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const lvl = Math.floor(currentXP / maxXP) + 1;
    const xpInLevel = currentXP % maxXP;
    setLevel(lvl);
    setXpPercentage((xpInLevel / maxXP) * 100);
    updateBadges(lvl);
  }, [currentXP]);

  const updateBadges = (lvl) => {
    const newBadges = [];
    if (lvl >= 2) newBadges.push('Rising Star');
    if (lvl >= 5) newBadges.push('Champion');
    // Add more logic as needed
    setBadges(newBadges);
  };

  return (
    <div className={styles.progressContainer}>
      <h3>Level {level}</h3>
      <div className={styles.xpBar}>
        <div
          className={styles.xpFill}
          style={{ width: `${xpPercentage}%` }}
        />
      </div>
      <p>{currentXP % maxXP} / {maxXP} XP</p>

      <div className={styles.badges}>
        <h4>Badges:</h4>
        {badges.map((badge, idx) => (
          <div key={idx} className={styles.badge}>
            🏅 {badge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
