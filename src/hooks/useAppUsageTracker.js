import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'bg_app_usage_stats';
const DAILY_GOAL_MINUTES = 10;
const DAILY_GOAL_SECONDS = DAILY_GOAL_MINUTES * 60;

export function useAppUsageTracker() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toISOString().split('T')[0];
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          return parsed;
        } else {
          // New day, reset daily but keep total
          return { date: today, dailySeconds: 0, totalSeconds: parsed.totalSeconds || 0 };
        }
      } catch (e) {
        console.error('Failed to parse usage stats', e);
      }
    }
    return { date: today, dailySeconds: 0, totalSeconds: 0 };
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
          const today = new Date().toISOString().split('T')[0];
          
          // Handle day rollover while app is open
          if (prev.date !== today) {
            return {
              date: today,
              dailySeconds: deltaSeconds,
              totalSeconds: prev.totalSeconds + deltaSeconds
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
