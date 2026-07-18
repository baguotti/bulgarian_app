import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const GoalReminder = ({ usage }) => {
  const [dismissed, setDismissed] = useState(false);
  const { goalReached, dailySeconds, goalMinutes } = usage;
  
  // Don't show if goal reached or explicitly dismissed
  if (goalReached || dismissed) return null;

  const minutesLeft = goalMinutes - Math.floor(dailySeconds / 60);

  return (
    <AnimatePresence>
      <motion.div 
        className="goal-reminder-banner"
        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
        animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      >
        <div className="goal-reminder-content">
          <Bell className="reminder-icon" size={18} />
          <span>Don't forget your daily {goalMinutes} mins! ({minutesLeft}m left)</span>
          <button className="dismiss-btn" onClick={() => setDismissed(true)} aria-label="Dismiss reminder">
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GoalReminder;
