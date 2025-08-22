import ProgressTracker from "./progressTracker";

const ProgressTrackerPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gamification Tracker</h2>
      <ProgressTracker currentXP={450} />
    </div>
  );
};

export default ProgressTrackerPage;
