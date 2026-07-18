import { motion } from 'framer-motion';
import { Timer, Flame } from 'lucide-react';

const StatsSection = ({ usage }) => {
  const { dailySeconds, totalSeconds, progressPercent, goalReached, goalMinutes } = usage;

  const formatTime = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const dailyMinutes = Math.floor(dailySeconds / 60);
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <motion.div 
      className="stats-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="stats-card goal-card">
        <h2>Daily Goal</h2>
        <div className="progress-circle-container">
          <svg className="progress-circle" viewBox="0 0 100 100">
            <circle className="progress-bg" cx="50" cy="50" r="45" />
            <motion.circle 
              className="progress-bar" 
              cx="50" 
              cy="50" 
              r="45"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ stroke: goalReached ? 'var(--accent-color)' : 'var(--text-primary)' }}
            />
          </svg>
          <div className="progress-text">
            <span className="current">{dailyMinutes}</span>
            <span className="divider">/</span>
            <span className="total">{goalMinutes} m</span>
          </div>
        </div>
        <p className="goal-status">
          {goalReached ? "Goal Reached! 🎉" : `${goalMinutes - dailyMinutes} minutes left to reach your goal.`}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stats-card small-card">
          <Timer className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Total Time</span>
            <span className="stat-value">{formatTime(totalSeconds)}</span>
          </div>
        </div>
        <div className="stats-card small-card">
          <Flame className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Streak</span>
            <span className="stat-value">1 Day</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;
