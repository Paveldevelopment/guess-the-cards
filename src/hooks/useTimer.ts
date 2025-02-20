import { useState, useEffect, useRef, useCallback } from 'react';

function useTimer(initialTime: number, autoStart: boolean = true) {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer if not already running
  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return; // timer is already running
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  // Stop the timer and clear the interval
  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Reset the timer to the initial time or a new provided time
  const resetTimer = useCallback((newTime?: number) => {
    stopTimer();
    setTime(newTime !== undefined ? newTime : initialTime);
    if (autoStart) {
      startTimer();
    }
  }, [initialTime, autoStart, startTimer, stopTimer]);

  // Add bonus time to the current timer
  const addTime = useCallback((bonus: number) => {
    setTime(prevTime => prevTime + bonus);
  }, []);

  // Optionally auto-start the timer on mount
  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    return () => {
      stopTimer();
    };
  }, [autoStart, startTimer, stopTimer]);

  return { time, startTimer, stopTimer, resetTimer, addTime };
}

export default useTimer;
