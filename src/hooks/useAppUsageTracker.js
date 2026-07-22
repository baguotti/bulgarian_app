import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'bg_app_usage_stats';
const DAILY_GOAL_MINUTES = 10;
const DAILY_GOAL_SECONDS = DAILY_GOAL_MINUTES * 60;

const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getYesterdayDateString = (todayStr) => {
  const [year, month, day] = todayStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
};

export function useAppUsageTracker() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = getLocalDateString();
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const savedStreak = parsed.streak || 1;

        if (parsed.date === today) {
          return {
            streak: 1,
            ...parsed
          };
        } else {
          const yesterday = getYesterdayDateString(today);
          let streak = 1;
          if (parsed.date === yesterday && (parsed.dailySeconds > 0 || parsed.totalSeconds > 0)) {
            streak = savedStreak + 1;
          }
          return { 
            date: today, 
            dailySeconds: 0, 
            totalSeconds: parsed.totalSeconds || 0,
            streak 
          };
        }
      } catch (e) {
        console.error('Failed to parse usage stats', e);
      }
    }
    return { date: today, dailySeconds: 0, totalSeconds: 0, streak: 1 };
  });

  const lastUpdateRef = useRef(Date.now());
  const intervalRef = useRef(null);

  // Save to local storage whenever stats change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const updateStats = () => {
      const now = Date.now();
      const deltaSeconds = Math.floor((now - lastUpdateRef.current) / 1000);
      
      if (deltaSeconds > 0) {
        setStats(prev => {
          const today = getLocalDateString();
          
          // Handle day rollover while app is open
          if (prev.date !== today) {
            const yesterday = getYesterdayDateString(today);
            const streak = (prev.date === yesterday && prev.dailySeconds > 0) ? (prev.streak || 1) + 1 : 1;
            return {
              date: today,
              dailySeconds: deltaSeconds,
              totalSeconds: prev.totalSeconds + deltaSeconds,
              streak
            };
          }
          
          return {
            ...prev,
            dailySeconds: prev.dailySeconds + deltaSeconds,
            totalSeconds: prev.totalSeconds + deltaSeconds
          };
        });
        lastUpdateRef.current = now;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastUpdateRef.current = Date.now();
        intervalRef.current = setInterval(updateStats, 1000);
      } else {
        updateStats(); // Final update before pausing
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    // Initial setup
    if (document.visibilityState === 'visible') {
      lastUpdateRef.current = Date.now();
      intervalRef.current = setInterval(updateStats, 1000);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progressPercent = Math.min((stats.dailySeconds / DAILY_GOAL_SECONDS) * 100, 100);
  const goalReached = stats.dailySeconds >= DAILY_GOAL_SECONDS;

  return {
    ...stats,
    progressPercent,
    goalReached,
    goalSeconds: DAILY_GOAL_SECONDS,
    goalMinutes: DAILY_GOAL_MINUTES
  };
}
